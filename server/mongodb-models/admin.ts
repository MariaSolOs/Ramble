import { Schema, Model, model, Types } from 'mongoose';
import mongooseLeanDefaults from 'mongoose-lean-defaults';
import bcrypt from 'bcrypt';

export interface Admin {
    _id: Types.ObjectId;
    userName: string;
    passwordHash: string;
}

// Static methods
interface AdminModel extends Model<Admin> {
    isValidPassword(password: string, passwordHash: string): boolean;
}

const adminSchemaFields: Record<keyof Omit<Admin, '_id'>, any> = {
    userName: String,
    passwordHash: String
}

const adminSchema = new Schema<Admin, AdminModel>(adminSchemaFields);
adminSchema.plugin(mongooseLeanDefaults);

/**
 * Verifies if the input password matches the hashed one.
 */
adminSchema.static('isValidPassword', function isValidPassword(password: string, passwordHash: string) {
    return bcrypt.compareSync(password, passwordHash);
});

export default model<Admin, AdminModel>('Admin', adminSchema);
