import { Router } from "express";
import { registerUser,loginUser,logoutUser,getProfile,updateUserProfile } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(isAuthenticated,logoutUser);
router.route('/profile').get(isAuthenticated,getProfile);
router.route('/profile/update').put(isAuthenticated,updateUserProfile);

export default router;
