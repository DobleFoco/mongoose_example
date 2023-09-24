import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {type: String, required: true},
    authorId:{ type: String , required: true},
    precio: {type: String, required: true},
}, {versionKey: false})

export const Book = mongoose.model('books', bookSchema);