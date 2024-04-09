import { Router } from "express";
import { signUpUser, loginUser, logoutUser, getAllUser, verifyUser, getReceiver } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/signup').post(signUpUser);
router.route('/signin').post(loginUser);
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/verify').post(verifyJWT, verifyUser);
router.route('/sync').get(getAllUser);
router.route('/receiver/:receiverId').get(getReceiver);


export default router;