import mongoose, { Document } from 'mongoose';

export interface IEvent extends Document {
    name: string;
    description: string;
    participants:string[];
    isApprove: boolean;
    isActive: boolean;
    created: Date;
    updated: Date;
}