import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

 
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);  // get request - because we are not sending any data
// only isAuthenticated can update his profile !
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);

export default router;   // have to send this 'router' in index.js
