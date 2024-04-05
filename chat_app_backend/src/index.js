import ConnectDB from "./db/index.js";
import app from "./app.js";
import dotenv from "dotenv"

const result = dotenv.config({path: './.env'});
if(result.error) {
    console.error(result.error);
    process.exit(1);
}

ConnectDB()
    .then(() => {
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`⚙️  Server is running on ${PORT}`);
        })     
    })
    .catch((err) => {
        console.log("Error Occurs: ", err);
    })