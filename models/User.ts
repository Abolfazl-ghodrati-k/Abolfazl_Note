import mongoose, { Types } from "mongoose"

// interface DocumentResult<T> {
//   _doc: T;
// }

// export interface IUser extends DocumentResult<IUser> {
//   _id: Types.ObjectId
//   firstName: string
//   lastName: string
//   username: string
//   password: string
// }

// export interface IUser {
//   _id: Types.ObjectId
//   firstName: string
//   lastName: string
//   username: string
//   password: string
// }

// export interface DummyUser extends IUser, mongoose.Document {
//   createdAt: Date;
//   updatedAt: Date;
//   _doc?: any
// }

export interface IUser  {
  _id: Types.ObjectId
  firstName?: string
  lastName?: string
  username: string
  password: string
  _doc: any;
  token?: string
}

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model("User", userSchema);
export default User;
