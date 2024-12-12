import mongoose, { Document } from 'mongoose';
import { IRole } from './IRole';


export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  role: mongoose.Types.ObjectId | IRole;
  isActive: boolean;
  version: number;
  created: Date;
  updated: Date;
}
