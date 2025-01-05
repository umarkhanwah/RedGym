import jwt from "jsonwebtoken";
import GymModel from "../models/Users/Gym.model.js";

export const fetchUser = async(req ,res ,next)=>{
    const token = req.header('authToken');

    if(!token){
        return res.status(401).json({message : "Please Login First"});
    }

    try {
        const data = jwt.verify(token , process.env.Gym_SecretCode);
        if(!data){
            return res.status(401).json({message : "Invalid Token"});
        }
        const validGym = await GymModel.findOne({_id : data.id}).lean();
        if(!validGym){
            return res.status(400).json({message  : "Please Login as GYm"});
            
        }
        req.gymId = data.id;
        next();



    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message : error.message});
    }


}