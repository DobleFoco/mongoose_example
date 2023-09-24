import express from 'express';
const router = express.Router();
import { deleteUser, getAllUsers, getUserByDocument, login, signUp, updateUser } from '../controllers/user.controller.js';
import { authRequire } from '../middlewares/auth.middleware.js';



router.get('/users', getAllUsers ); // req y res ya esta en el metodo  getAllUsers
router.get('/users/:document', authRequire, getUserByDocument)
router.post('/users', signUp );
router.post('/login', login);
router.put('/users/:rut',authRequire, updateUser)
router.delete('/users/:rut',authRequire, deleteUser)

export default router