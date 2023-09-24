import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    document: { type: String, required: true, unique: true },
    age: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

}, {versionKey: false})

export const User = mongoose.model('users', userSchema);