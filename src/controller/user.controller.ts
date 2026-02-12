import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { loginSchema, signUpSchema, updatBodySchema } from "../validator/auth.user.js";
import User from "../model/user.js";
import jwt from "jsonwebtoken";

const JWT_PASSWORD = process.env.JWT_PASSWORD as string;

export const signUpController = async (req: Request, res: Response) => {
    const parsedDataSuccess = signUpSchema.safeParse(req.body);
    if (!parsedDataSuccess.success) {
        return res.status(400).json({
            success: false,
            error: "Invalid request schema"
        });

    }
    const { FirstName, LastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
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
            LastName: createdUser.LastName,
            email: createdUser.email

        }
    })

}

export const loginInController = async (req: Request, res: Response) => {

    const email = req.body.email;
    const password = req.body.password;

    const parsedData = loginSchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
            success: false,
            error: "Invalid request schema"
        });
    };

    try {
        const existingUser = await User.findOne({
            email
        }).select("+password")

        if (existingUser && existingUser.password) {
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);

            if (isPasswordValid) {
                const token = jwt.sign({
                    userId: existingUser._id,
                    FirstName: existingUser.FirstName
                }, JWT_PASSWORD)
                return res.status(200).json({
                    success: true,
                    data: {
                        token
                    }
                });
            };
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Invalis email or password"

            });
        };
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: "error while fetching details "
        })
    }
}

export const updateController = async (req: Request, res: Response) => {
    const parsedData = updatBodySchema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(411).json({
            message: "error while updating information"
        })
    }
    const { FirstName, LastName, password } = parsedData.data;

    const updatedData: any = {};

    updatedData.FirstName = FirstName;
    updatedData.LastName = LastName;

    if (password) {
        updatedData.password = await bcrypt.hash(password, 10);
    }

    const userId = (req as any).user.userId;

    const result = await User.updateOne(
        { _id: userId },
        { $set: updatedData }
    );

    return res.status(200).json({
        message: "User updated successfully "
    });

};