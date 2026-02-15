import type {Request, Response} from "express"
import User from "../model/user.js";
import Account from "../model/account.js"
import mongoose from "mongoose";

export const accountBalance = async (req:Request,res:Response)=>{

    const userId = req.body.userId;

    const account =await Account.findOne({userId});

    return res.json({
        balance: account?.balance
    })
}

export const transferMoney = async (req:Request, res:Response)=>{
    const session = await mongoose.startSession();

    session.startTransaction();

    const {to , amount} = req.body;
    const userId = req.body.userId

    const account = await Account.findOne({
        userId
    }).session(session)

    if(!account || account.balance < amount ){
        await session.abortTransaction();
        return res.status(400).json({
            message:" Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({
        userId:to
    }).session(session)


    if(!toAccount ){
        await session.abortTransaction();
        return res.status(400).json({
            message:" Invalid account"
        });
    }


    await Account.updateOne({userId:req.body.userId},
        {$inc:
            {balance:-amount}}).session(session)

    await Account.updateOne({userId:req.body.to},
        {$inc:
            {balance:amount}}).session(session)

    await session.commitTransaction();

    return res.status(200).json({
        message:"Transfer successful"
    });

};