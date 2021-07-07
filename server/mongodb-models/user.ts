import { Schema, Model, model, Types } from 'mongoose';
import mongooseLeanDefaults from 'mongoose-lean-defaults';
import bcrypt from 'bcrypt';

export interface User {
    _id: Types.ObjectId;
    fstName: string;
    lstName: string;
    birthday?: Date;
    email: {
        address: string;
    }
    phoneNumber?: string;
    passwordHash: string;
    photo?: string;
    city?: string;
    savedExperiences?: Types.ObjectId[];
    bookedExperiences?: Types.ObjectId[];
    creator?: Types.ObjectId;
    lastLogin: Date;
}

// Static methods
interface UserModel extends Model<User> {
    isValidPassword(password: string, passwordHash: string): boolean;
    generatePasswordHash(password: string): string;
}

const userSchemaFields: Record<keyof Omit<User, '_id'>, any> = {
    fstName: {
        type: String,
        required: true,
        default: ''
    },

    lstName: {
        type: String,
        required: true,
        default: ''
    },

    birthday: Date,

    email: {
        address: {
            type: String,
            default: ''
        }
    },

    phoneNumber: {
        type: String,
        validate: /\(([0-9]{3})\) ([0-9]{3})-([0-9]{4})/
    },

    passwordHash: String,

    photo: String,

    city: String,

    savedExperiences: [{
        type: Schema.Types.ObjectId,
        ref: 'Experience'
    }],

    bookedExperiences: [{
        type: Schema.Types.ObjectId,
        ref: 'Experience'
    }],

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'Creator'
    },

    lastLogin: {
        type: Date,
        default: new Date()
    }
}

const userSchema = new Schema<User, UserModel>(userSchemaFields);
userSchema.plugin(mongooseLeanDefaults);

/**
 * Verifies if the input password matches the hashed one.
 */
userSchema.static('isValidPassword', function isValidPassword(password: string, passwordHash: string) {
    return bcrypt.compareSync(password, passwordHash);
});

/**
 * Generates the password hash from the given password.
 */
userSchema.static('generatePasswordHash', function generatePasswordHash(password: string) {
    return bcrypt.hashSync(password, 10);
});

export default model<User, UserModel>('User', userSchema);

// TODO: Remove unused fields and rename fields      

//TODO: Write script to delete idle users