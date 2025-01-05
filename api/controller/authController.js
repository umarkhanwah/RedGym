import { validationResult } from "express-validator";
import GymModel from "../models/Users/Gym.model.js";
import  bcryptjs  from "bcryptjs";
import jwt from "jsonwebtoken";



export const handleLogin  = async(req ,res )=>{
    const {phone , password} = req.body;
    
    try {
        
        const validUser =   await  GymModel.findOne({phone});
        if(!validUser){
            return res.status(404).json({message : "User Not Found"})
        }
        const checkPassword = bcryptjs.compareSync(password  , validUser.password)
        
        if(!checkPassword) return res.status(400).json({message : "Invalid Credentials"});

        const token = jwt.sign({id : validUser._id} , process.env.Gym_SecretCode)
        console.log(token)
        res.status(200).json({message : "Login Succesful" , token});

    } catch (error) {
        console.dir(error);
        res.status(500).json({message : error.message})
    }
}




export const createGym = async(req , res)=>{
    const errors = validationResult(req);
    
    const  {trainerName , email , gymName ,  phone , password }= req.body; 
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array() })
    }
    

    // if(!trainerName || !email || !gymName ||  !phone || !password){
    //     res.status(400).json({
    //         message : "Please Fill All Fields"
    //     })
    // }else{

    // We Are Using Express-Validator Instead of this 👆
        
        try {
            const hashedPassword =  bcryptjs.hashSync(password , 10);
            // console.log(hashedPassword);
            const newGym = new GymModel({trainerName , email , gymName , phone , password : hashedPassword});
            await newGym.save();
            res.status(200).json({
            message : "Succesfully Registered",
            newGym
            })
            console.log('Registered');
            
        } catch (error) {
          console.log(error);
          res.status(500).json({
            message : error.message
          })
            
        }
    // }



}



export const showGyms = async (req, res) => {
    try {
        // Fetch all gyms
        const allGyms = await GymModel.find({}).lean(); // Use .lean() for plain JS objects

        // Exclude the password field
        const GymsData = allGyms.map(({ password, ...rest }) => rest);

        // Respond with the modified data
        res.status(200).json({ message : "Gyms Fetched Succesful" , AllGyms :GymsData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching gyms." });
        
    }
};
