import { Document } from 'mongoose';

export interface IEvent extends Document {
    name: string;
    description: string;
    isApprove: boolean;
    isActive: boolean;
    created: Date;
    updated: Date;
}