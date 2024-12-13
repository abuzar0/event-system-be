import { Document } from 'mongoose';


export interface IRole extends Document {
    type: string;
    permissions:string[]
    isActive: boolean;
    created: Date;
    updated: Date;
}
