import express from "express";
import userController from "../controllers/userController.js";
import {verifyRegisterConfirmationToken} from '../middleware/verifyRegisterConfirmationToken.js'
import {verifyResetPasswordToken} from '../middleware/verifyResetPasswordToken.js'
import {verifyAccess} from '../middleware/verifyAccess.js'

const router = express.Router();

router.post("/registration", userController.userRegistration);
router.put("/registration/confirmation/:token", verifyRegisterConfirmationToken ,userController.userRegistrationConfirmation);

router.post('/forgot-password', userController.forgotPassword)
router.put('/reset-password/:token', verifyResetPasswordToken , userController.resetPassword)

router.post('/login', userController.login)
router.post('/verify-access', verifyAccess, userController.allowAccess)
export default router;
