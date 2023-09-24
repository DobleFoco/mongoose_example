import { Book } from '../models/Books.model.js'

export const getAllBooks = async (req, res) => {
    try {
        const allBooks = await Book.find();
        console.log('libros solicitados')
        res.status(200).json(allBooks);
    } catch (error) {
        res.status(404).json({ message: "Couldn't get the books data" });
    }
}

export const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const getBook = await Book.findById(id);
        res.status(200).json(getBook);
    } catch (error) {
        res.status(404).json({ message: `Couldn't get the ${id} book's data` });
    }
}