import mongoose from 'mongoose';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: '1783674',
  key: '615276f32877e0dd5e82',
  secret: '8ac1e311a89b1c9457bd',
  cluster: 'sa1',
  useTLS: true,
});

const DB_NAME = 'chat_app';

const ConnectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.BACKEND_URI}${DB_NAME}`
    );
    console.log(
      `\n MONGODB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
    const db = mongoose.connection;
    const msgCollection = db.collection('messages');
    const changeStream = msgCollection.watch();
    changeStream.on('change', (change) => {
      console.log('A change occurred ');

      if (change.operationType === 'insert') {
        const messageDetails = change.fullDocument;
        pusher.trigger('messages', 'inserted', {
          sender: messageDetails.sender,
          receiver: messageDetails.receiver,
          content: messageDetails.content,
          timestamp: messageDetails.createdAt,
          _id: messageDetails._id
        });
      } else {
        console.log('Error triggering Pusher');
      }
    });
  } catch (error) {
    console.log('MONGODB CONNECTION FAILED ', error);
    process.exit(1);
  }
};

// db.once('open', () => {
//   console.log('DB Connected');

//   });
// });

export default ConnectDB;
