import AttendanceModel from "../models/attendance.model.js";
import FeeSModel from "../models/FeeStatus.model.js";
import TraineeModel from "../models/Users/Trainee.model.js";

export const addTrainee = async(req , res)=>{
        const {rollNumber  , name , joinDate} = req.body;
        const { gymId } = req;
        try {
                const newTrainee = new TraineeModel({
                        gym : gymId,
                        rollNumber,
                        name,
                        joinDate,
                        accountCreated : false,
                });
                await newTrainee.save();
                res.status(200).json({message : "Trainee Added Succesfully" , newTrainee});


        } catch (error) {
                console.log(error.message);
                res.status(500).json({message : error.message})
        }
}
                

export const fetchAbsentTrainees = async (req, res) => {
        const { gymId } = req;
    
        try {
            // Get today's date range
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0); // Start of today's date
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999); // End of today's date
    
            // Fetch all trainees for the gym
            const allTrainees = await TraineeModel.find({ gym: gymId });
    
            // Fetch attendance records for today
            const attendanceRecords = await AttendanceModel.find({
                date: { $gte: startOfDay, $lte: endOfDay },
            }).select('trainee');
    
            // Extract the IDs of present trainees
            const presentTrainees = new Set(attendanceRecords.map(record => record.trainee.toString()));
    
            // Filter trainees who are not present
            const absentTrainees = allTrainees.filter(trainee => !presentTrainees.has(trainee._id.toString()));
    
            res.status(200).json({
                message: "Absent trainees fetched successfully",
                absentTrainees,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message });
        }
    };
    

export const markAttendance = async(req ,res)=>{
        const {trainee , date} = req.body;

        try {
                const newAttendance = new AttendanceModel({
                        trainee  , date
                });
                await newAttendance.save();
                res.status(200).json({message : "Attendance Marked" , newAttendance});


        } catch (error) {
                console.log(error.message);
                res.status(500).json({message : error.message})
        }

}
export const fetchTrainees = async(req ,res)=>{
        
        try {
                const trainees = await TraineeModel.find({gym : req.gymId}).populate('gym');
                res.status(200).json({message : "Trainees Fetch Succesfully" , trainees});
        } catch (error) {
                
                console.log(error);
                res.status(500).json({message : error.message});
        }

}


export const payFees = async (req, res) => {
        const { trainee, date } = req.body;
    
        try {
            // Check if fees already paid for this month
            const startOfMonth = new Date(date);
            startOfMonth.setDate(1);
            startOfMonth.setHours(0, 0, 0, 0);
            
            const endOfMonth = new Date(startOfMonth);
            endOfMonth.setMonth(endOfMonth.getMonth() + 1);
            endOfMonth.setMilliseconds(-1);
    
            const existingPayment = await FeeSModel.findOne({
                trainee,
                date: { $gte: startOfMonth, $lte: endOfMonth },
            });
    
            if (existingPayment) {
                return res.status(400).json({ message: "Fees already paid for this month" });
            }
    
            // Add new fee payment record
            const newFeeStatus = new FeeSModel({ trainee, date });
            await newFeeStatus.save();
    
            res.status(200).json({ message: "Fee payment recorded successfully", newFeeStatus });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ message: error.message });
        }
    };


    export const fetchUnpaidFeesTrainees = async (req, res) => {
        try {
            const startOfMonth = new Date();
            startOfMonth.setDate(1);
            startOfMonth.setHours(0, 0, 0, 0);
    
            const endOfMonth = new Date(startOfMonth);
            endOfMonth.setMonth(endOfMonth.getMonth() + 1);
            endOfMonth.setMilliseconds(-1);
    
            // Fetch all trainees
            const allTrainees = await TraineeModel.find()
                
                .lean(); // Use lean for faster queries since we don't modify documents.
    
            // Fetch trainees who have paid fees this month
            const paidFees = await FeeSModel.find({
                date: { $gte: startOfMonth, $lte: endOfMonth },
            }).select('trainee');
    
            if (!paidFees.length) {
                // If no fees are paid, all trainees are unpaid
                return res.status(200).json({
                    message: "No fees paid this month. All trainees are unpaid.",
                    unpaidTrainees: allTrainees,
                });
            }
    
            // Convert to a set for fast lookups
            const paidTraineeIds = new Set(paidFees.map(record => record.trainee.toString()));
    
            // Filter trainees who haven’t paid fees
            const unpaidTrainees = allTrainees.filter(trainee => !paidTraineeIds.has(trainee._id.toString()));
            
            res.status(200).json({
                message: "Unpaid trainees fetched successfully",
                unpaidTrainees,
            });
        } catch (error) {
            console.error("Error fetching unpaid trainees:", error);
            res.status(500).json({ message: "Server Error" });
        }
    };
  
  

export const fetchMonthFeesPaidTrainees = async (req, res) => {
    try {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date(startOfMonth);
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);

        const fees = await FeeSModel.find({
            date: { $gte: startOfMonth, $lt: endOfMonth },
        }); 
        //Dont need to populate
        
        
        const trainees = fees.map((fee) => fee.trainee);
        // Trainee's id is stored in the field trainee

        res.status(200).json(trainees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching trainees', error });
    }
};



export const fetchTodayPresentTrainees = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(startOfDay);
        endOfDay.setDate(endOfDay.getDate() + 1);

        const attendanceRecords = await AttendanceModel.find({
            date: { $gte: startOfDay, $lt: endOfDay },
        });

        const trainees = attendanceRecords.map((record) => record.trainee);

        res.status(200).json( trainees);
    } catch (error) {
        res.status(500).json(error.message );
    }
};


