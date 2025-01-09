import express from 'express';
import {  body } from 'express-validator';
import { fetchUser } from '../middlewares/authMiddleware.js';
import { addTrainee, fetchAbsentTrainees, fetchTrainees, markAttendance , payFees, fetchUnpaidFeesTrainees, fetchMonthFeesPaidTrainees, fetchTodayPresentTrainees, getTraineeDetails, getBodyMeasurements, addBodyMeasurement, DeleteBodyMeasurement} from '../controller/gymController.js';




const router = express.Router();


router.get('/PresentTrainees', fetchUser,fetchTodayPresentTrainees);
router.get('/PaidFeesTrainees',fetchUser, fetchMonthFeesPaidTrainees);
router.post('/payFees',fetchUser, payFees);
router.get('/fetchUnpaidFeesTrainees',fetchUser, fetchUnpaidFeesTrainees);


router.get('/fetchAbsentTrainees'  , fetchUser , fetchAbsentTrainees)
router.get('/fetchTrainees'  , fetchUser , fetchTrainees)
router.post('/markAttendance'  , fetchUser , markAttendance)
router.post('/AddTrainee'  , fetchUser , addTrainee)


// Get Trainee Details
router.get('/trainee/:traineeId', getTraineeDetails);

// Get Body Measurements
router.get('/delete-measurement/:M_id', DeleteBodyMeasurement);
router.get('/body-measurements/:traineeId', getBodyMeasurements);

// Add New Body Measurement
router.post('/body-measurements/:traineeId', addBodyMeasurement);


export default router;