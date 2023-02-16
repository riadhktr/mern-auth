const express = require('express');
const { register, getUser, login } = require('../controllers/user');
const { isAuth } = require('../middelware/isAuth');
const { registerValidation, validation } = require('../middelware/RegisterValidation');

const userRoutes = express.Router();

userRoutes.post('/register',registerValidation,validation,register);

userRoutes.get('/user',getUser) // tjibli tous les utilisateurs dispo fel database

userRoutes.post('/signIn',login) // partie login 

userRoutes.get('/profile',isAuth,(req,res)=>{
    const currentUser = req.user
    res.status(200).json({msg:"user logged in",currentUser })
})

module.exports = userRoutes;