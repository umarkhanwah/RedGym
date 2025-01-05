import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    trainerName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    gymName : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
});

const GymModel = mongoose.model('Gym' , userSchema)
GymModel.createIndexes();
export default GymModel;