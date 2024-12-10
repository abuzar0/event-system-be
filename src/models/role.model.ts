import mongoose  from 'mongoose';
import { IRole } from '../utils/IRole';

const roleModel = new mongoose.Schema({
    type: {
        type: String,
        require: true
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

export const Role =mongoose.model<IRole>('Role', roleModel)