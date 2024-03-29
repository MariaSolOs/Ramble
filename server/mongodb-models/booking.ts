import { Schema, model, Types } from 'mongoose';
import mongooseLeanDefaults from 'mongoose-lean-defaults';
import type { Occurrence } from './occurrence';
import type { User } from './user';
import type { Reservation } from '../server-types';

export interface Booking {
    _id: Types.ObjectId;
    occurrence: Types.ObjectId | Occurrence;
    bookingType: Reservation;
    numGuests: number;
    client: Types.ObjectId | User;
    stripe: {
        paymentIntentId: string;
        paymentCaptured: boolean; // True after the creator approves it
        creatorProfit: number; // Note that this will be in cents
    };
    createdAt: Date;
    updatedAt: Date;
}

const bookingSchemaFields: Record<keyof Omit<Booking, '_id' | 'createdAt' | 'updatedAt'>, any> = {
    occurrence: {
        type: Schema.Types.ObjectId,
        ref: 'Occurrence',
        required: true
    },

    bookingType: {
        type: String,
        required: true,
        enum: ['public', 'private']
    },

    numGuests: {
        type: Number,
        required: true,
        min: 1
    },

    client: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    stripe: {
        paymentIntentId: {
            type: String,
            required: true
        },
        paymentCaptured: {
            type: Boolean,
            required: true
        },
        creatorProfit: {
            type: Number,
            required: true,
            min: 0
        }
    }
}

const bookingSchema = new Schema<Booking>(bookingSchemaFields, {
    timestamps: true
});
bookingSchema.plugin(mongooseLeanDefaults);

export default model<Booking>('Booking', bookingSchema);