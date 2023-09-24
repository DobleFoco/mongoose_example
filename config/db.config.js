import mongoose from 'mongoose';

export const db = async () => {
    const DB_NAME = process.env.DB_NAME;
    try {
        await mongoose.connect(DB_NAME,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to DB");
    } catch (error) {
        console.error(`Error connecting to db: ${error}`)
    }
}