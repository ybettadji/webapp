import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type: String},
    password: {type: String},
    status: {type: String},
    role: {type: String}
})

export default mongoose.model("User", userSchema);
