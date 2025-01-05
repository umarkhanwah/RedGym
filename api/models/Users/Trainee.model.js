import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    gym : {
        type : mongoose.Schema.ObjectId,
        ref: 'Gym'
    },
    rollNumber : {
        type : Number,
        required : true,
        
    },
    name : {
        type : String,
        required : true
    },
    joinDate : {
        type : Date,
        required : true
    },
    accountCreated: {
        type : Boolean,
        required : true
    },
    phone : {
        type : String,
        
    },
    password : {
        type : String,
        
    },
});

const TraineeModel = mongoose.model('Trainee' , userSchema)
TraineeModel.createIndexes();
export default TraineeModel;