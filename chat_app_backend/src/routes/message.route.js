import { Router } from "express";
// import { signUpUser, loginUser, logoutUser } from "../controllers/todos.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { newMessage, deleteMessage, allMessage } from "../controllers/message.controller.js";
const router = Router();


router.route('/sync/:receiverId').get(verifyJWT, allMessage)
router.route('/new').post(verifyJWT, newMessage)
router.route('/message/delete/:messageId').delete(verifyJWT, deleteMessage)


export default router