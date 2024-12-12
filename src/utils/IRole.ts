import { Document } from 'mongoose';


export interface IRole extends Document {
    type: string;
    isActive: boolean;
    created: Date;
    updated: Date;
}
