import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRouter from "./routes/auth.route.js";
import gymRouter from "./routes/gym.route.js";
import cors from 'cors';


dotenv.config();

const app = express()

const PORT  = 4000;



mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("Database Connected"))
    .catch((e)=>console.log(e));
    



app.use(express.json())

app.use(cors())

// app.use(cors({
    //     origin : "http://localhost:4000/" ,
    //     methods : ['GET' , 'POST'  , 'PUT' , 'DELETE'  , 'PATCH'],
    //     allowedHeaders : ['Content-Type' , ' Authorization']
    // }))
    
    
    // Auth ROutes
    
    app.use('/auth/' , authRouter)
    app.use('/admin/' , gymRouter)
    
    
    app.get('/' , (req , res)=>{
        res.json({ msg : "hello"});
    })
    
    
    
    
app.listen(PORT , ()=>{

    
    console.log(`App is running on http://localhost:${PORT}`);
})
    