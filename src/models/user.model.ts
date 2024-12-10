import mongoose from 'mongoose';
import { IUser } from '../utils/IUser';

const userModel = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: mongoose.Types.ObjectId,
        ref: 'Role',
        require: true
    },
    event_list: [{
        type: mongoose.Types.ObjectId,
        ref: 'Event'
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    version: {
        type: Number,
        default: 0
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

export const User = mongoose.model<IUser>('User', userModel);