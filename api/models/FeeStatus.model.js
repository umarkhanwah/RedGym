import mongoose from 'mongoose'

const FeeStatus = mongoose.Schema({
    trainee : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },    
    date : {
        type : Date,
        required : true
    },
});

const FeeSModel = mongoose.model('FeeStatus' , FeeStatus)
FeeSModel.createIndexes();
export default FeeSModel;