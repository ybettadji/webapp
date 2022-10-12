import express from "express";
import userController from "../controllers/userController.js";
import {middlewareRegisterConfirmation} from '../middleware/registerConfirmation.js'

const router = express.Router();

router.post("/registration", userController.userRegistration);
router.put("/registration/confirmation/:token", middlewareRegisterConfirmation ,userController.userRegistrationConfirmation);

export default router;
