import mongoose from 'mongoose'

const Payments = mongoose.Schema({
    trainee : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },    
    name : {
        type : String,
        required : true
    },
    paid : {
        type : Boolean
    },
        
    date : {
        type : Date,
        required : true
    },
});

const FeeSModel = mongoose.model('OtherPayments' , Payments)
FeeSModel.createIndexes();
export default FeeSModel;