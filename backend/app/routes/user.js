import express from "express";
import userController from "../controllers/userController.js";
import {checkIfTheRegisterConfirmationTokenIsValid} from '../middleware/registerConfirmation.js'
import {middlewareResetPassword} from '../middleware/resetPassword.js'

const router = express.Router();

router.post("/registration", userController.userRegistration);
router.put("/registration/confirmation/:token", checkIfTheRegisterConfirmationTokenIsValid ,userController.userRegistrationConfirmation);

router.post('/forgot-password', userController.forgotPassword)
router.put('/reset-password/:token', middlewareResetPassword , userController.resetPassword)

export default router;
