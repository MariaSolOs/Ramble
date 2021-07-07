import { Schema, model, Types } from 'mongoose';
import mongooseLeanDefaults from 'mongoose-lean-defaults';

export interface Booking {
    _id: Types.ObjectId;
    occurrence: Types.ObjectId;
}

const bookingSchemaFields: Record<keyof Omit<Booking, '_id'>, any> = {
    occurrence: {
        type: Schema.Types.ObjectId,
        ref: 'Occurrence',
        required: true
    }
}

const bookingSchema = new Schema<Booking>(bookingSchemaFields);
bookingSchema.plugin(mongooseLeanDefaults);

export default model<Booking>('Booking', bookingSchema);