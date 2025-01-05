import mongoose from 'mongoose'

const Attendance = mongoose.Schema({
    trainee : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },    
    date : {
        type : Date,
        required : true
    },
});

const AttendanceModel = mongoose.model('Attendance' , Attendance)
AttendanceModel.createIndexes();
export default AttendanceModel;