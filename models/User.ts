import mongoose from "mongoose";

interface IUser {
  firstName: string
  lastName: string
  username: string
  password: string
}

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: { type: String, required: true, default: "" },
    lastName: { type: String, required: true, default: "" },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
