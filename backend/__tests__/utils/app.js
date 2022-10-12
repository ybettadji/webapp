import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import userRoutes from "../../app/routes/user.js";
import cors from "cors";

dotenv.config();

const mongoConnection = mongoose
  .connect(process.env.MONGO_DB_URI_TEST)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();
const allowedOrigins = [process.env.FRONTEND_URL];

const options = {
  origin: allowedOrigins,
};
app.use(cors(options));
app.use(express.json());
app.use("/user", userRoutes);

app.listen(process.env.SERVER_PORT, () => {
  console.log("Listening on port " + process.env.SERVER_PORT);
});

export default app