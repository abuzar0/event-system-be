import mongoose, { Document } from 'mongoose';
import { IRole } from './IRole';


export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  role: mongoose.Types.ObjectId | IRole;
  event_list: mongoose.Types.ObjectId[];
  isActive: boolean;
  version: number;
  created: Date;
  updated: Date;
}
