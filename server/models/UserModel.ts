import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ShopSchema = new Schema({
    id: {
        type: String
    },
    username: {
        type: String,
        required: 'Enter username'
    },
    password: {
        type: String,
        required: 'Enter password'
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
