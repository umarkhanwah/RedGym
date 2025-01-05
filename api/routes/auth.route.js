import express from 'express'
import { createGym, handleLogin, showGyms } from '../controller/authController.js'
import {  body } from 'express-validator';


const router = express.Router();

router.post('/Gym' ,[
    body('email' , 'Enter a valid Email..!').isEmail(),
    body('password' , 'Password Must be Atleast 8 Characters').isLength({min : 8}),
    body('phone' , "Enter a valid Phone Number").isMobilePhone('en-PK'),
    body('trainerName' , "Please Enter Trainer Name").notEmpty(),
    body('gymName' , "Please Enter Gym Name").notEmpty(),
] , createGym)

router.post('/newUser' , handleLogin)
router.post('/Trainee' , handleLogin)

router.get('/showGyms' , showGyms)
router.post('/login' , handleLogin)


export default router;