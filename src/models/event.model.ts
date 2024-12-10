import mongoose from 'mongoose';
import { IEvent } from '../utils/IEvent';

const eventModel = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        default: 'desc'
    },
    isApprove: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    }
})

export const Event = mongoose.model<IEvent>('Event', eventModel);
