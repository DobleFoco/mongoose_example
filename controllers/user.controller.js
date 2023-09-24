import { User } from '../models/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(404).json({error: 'No se encontraron datos de usuarios'});
    }
}

export const getUserByDocument = async (req, res) => {
    try {
        const {document} = req.params;
        const getUser = await User.findOne({document: document});
        if (!getUser){
            return res.status(501).send('Usuario no existe');
        };
        res.status(200).json(getUser);
    } catch (error) {
        res.status(404).json({message: 'Error', error: error});
    }
}

// export const signUp = async (req , res) => {
//     try {
//         const newUser = req.body;
//         const user = new User(newUser);
//         const saveUser = await user.save();
//         res.status(201).json({message: `El usuario ${saveUser.name} ${saveUser.surname} ha sido creado con éxito.`})
//     } catch (error) {
//         res.status(500).json({message: 'No se pudo agregar el usuario', error: error});
//     }
// }

export const signUp = async (req , res) => {
    try {
        const { name, surname, document, age, email, password } = req.body;
        if (!name || !surname || !document || !age || !email || !password) {
            return res.status(400).json({ message: "Please, fill up all data"})
        }
        const verifyUser = await User.findOne({document: document});
        if (verifyUser) {
            return res.status(500).json({message: "That user has an account"})
        }
        const passwordEncrypt = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            surname,
            document,
            age,
            email,
            password: passwordEncrypt
        });
        const saveUser = await user.save();
        res.status(201).json({message: `El usuario ${saveUser.name} ${saveUser.surname} ha sido creado con éxito.`})
    } catch (error) {
        res.status(500).json({message: 'No se pudo agregar el usuario', error: error});
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const verifyUserByEmail = await User.findOne({email: email});
        if (!verifyUserByEmail){
            return res.status(404).send("The user doesn't exist")
        }
        const verifyPassword = await bcrypt.compare(password, verifyUserByEmail.password);
        if(!verifyPassword ){
            return res.status(403).send('Invalid credentials')
        }
        const expireTime = Math.floor(new Date()/1000) + 3600 // 1 hora
        const token = jwt.sign({
            exp: expireTime,
            data: {
                id: verifyUserByEmail._id,
                email: verifyUserByEmail.email,
                name: verifyUserByEmail.name,
                surname: verifyUserByEmail.surname,
                age: verifyUserByEmail.age
            }},
            process.env.SECRET_KEY
        )
        res.json(token)
    } catch (error) {
        res.status(500).json({message:'Error in the server', error: error})
    }
}

export const updateUser = async (req, res) => {
    try {
        const userRUT = req.params.document;
        const updateData = req.body;
        const updateUser = await User.findOneAndUpdate(
            {rut: userRUT},
            updateData,
            {new: true} //reemplazar datos anteriores
        )
        if (!updateUser) {
            return res.status(404).json({message: 'User not found'})
        }
        res.status(202).json({message: `El usuario ${updateData.name} ha sido actualizado con éxito`})
    } catch (error) {
        res.status(500).json({message: 'Error', error: error})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userRUT = req.params.document;
        const removeUser = await User.findOneAndDelete(
            {rut: userRUT}
        )
        if (!removeUser) {
            return res.status(404).json({message: 'User not found'})
        }
        res.status(202).json({message: `El usuario ${removeUser.name} ha sido eliminado con éxito`})
    } catch (error) {
        res.status(500).json({message: 'Error', error: error})
    }
}