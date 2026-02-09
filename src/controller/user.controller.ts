import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { signUpSchema } from "../validator/auth.user.js";
import User from "../model/user.js";

export const signUpController  = async (req:Request, res: Response)=>{
    const parsedDataSuccess = signUpSchema.safeParse(req.body);
    if(!parsedDataSuccess.success){
        return res.status(400).json({
            success: false, 
            error: "Invalid request schema"
        });

    }
    const {FirstName, LastName, email, password} = req.body;
    
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success: false, 
            error: "User already exists"
        });
    };
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
        FirstName, 
        LastName, 
        email, 
        password: hashedPassword
    });
    return res.status(201).json({
        success: true, 
        data: {
            _id: createdUser._id, 
            FirstName: createdUser.FirstName,
            LastName:  createdUser.LastName,
            email: createdUser.email
            
        }
    })

}