import express from 'express';
import {  body } from 'express-validator';
import { fetchUser } from '../middlewares/authMiddleware.js';
import { addTrainee, fetchAbsentTrainees, fetchTrainees, markAttendance , payFees, fetchUnpaidFeesTrainees} from '../controller/gymController.js';




const router = express.Router();


router.post('/payFees', payFees);
router.get('/fetchUnpaidFeesTrainees', fetchUnpaidFeesTrainees);


router.get('/fetchAbsentTrainees'  , fetchUser , fetchAbsentTrainees)
router.get('/fetchTrainees'  , fetchUser , fetchTrainees)
router.post('/markAttendance'  , fetchUser , markAttendance)
router.post('/AddTrainee'  , fetchUser , addTrainee)



export default router;