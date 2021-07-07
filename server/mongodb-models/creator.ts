import { Schema, model, Types } from 'mongoose';
import mongooseLeanDefaults from 'mongoose-lean-defaults';

export interface Creator {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    verified: boolean; // True if we verified their government ID
    governmentIds: string[];
    bio: string;
    stripe: {
        onboarded: boolean; // True if they completed Stripe's onboarding
        accountId?: string;
    }
    bookingRequests?: Types.ObjectId[];
}

const creatorSchemaFields: Record<keyof Omit<Creator, '_id'>, any> = {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    verified: {
        type: Boolean,
        required: true
    },

    governmentIds: {
        type: [String],
        required: true
    },

    bio: {
        type: String,
        required: true
    },

    stripe: {
        accountId: String,
        onboarded: Boolean
    },

    bookingRequests: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }]
}

const creatorSchema = new Schema<Creator>(creatorSchemaFields);
creatorSchema.plugin(mongooseLeanDefaults);

export default model<Creator>('Creator', creatorSchema);
  