import User from "../models/user.js";
import PendingUser from "../models/pendingUser.js";
import jwt  from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import smtTransport from "nodemailer-smtp-transport";

let transport = nodemailer.createTransport(smtTransport({
    service: "Gmail",
    port: 465,
    secure: true,
    host: "smtp.gmail.com",
    // port: 587,
    // secure: false, 
    auth: {
        user: "kediaarts@gmail.com",
        pass: process.env.EMAIL_PASS
    },
    tls: { rejectUnauthorized: false }

}));

export const signIn= async(req,res)=>{
    const {email, password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message:"User not found."});

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid credentials."});

        const token = jwt.sign({email:existingUser.email, id:existingUser._id}, "test", {expiresIn:"1h"});
        res.status(200).json({result:existingUser, token});
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }
}

export const signUp= async(req,res)=>{
    const {email,password,confirmPassword,fullName} = req.body;
    const code = Math.floor(Math.random()*90000) + 10000;

    try {
        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(404).json({message:"User already exists."});
        if(password!==confirmPassword) return res.status(404).json({message:"Passwords don't match."});

        const hashedPassword = await bcrypt.hash(password,12);
        const result = await User.create({email,password:hashedPassword,name:fullName,status:"pending"});

        await PendingUser.create({email:email,code:code.toString()});

    let mailOptions,link;

    link = "https://warm-brushlands-22534.herokuapp.com/user/api/auth/verification/verify-account/"+email+"/"+code.toString() ;
    mailOptions={
        from:'"Horizons" <no-reply@gmail.com>',
        to : email,
        subject: "Please verify your Email",
        html : "<h1>Horizons</h1><br><h2>Hi,<br> Please click on the link to verify your email.</h2><br><a href="+link+">Click here to verify</a>",
    }
    transport.sendMail(mailOptions);
        
        const token = jwt.sign({email:result.email, id:result._id}, "test", {expiresIn:"1h"});

        res.status(201).json({ result, token });

    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }
}

export const verifyUser =async(req,res)=>{
   const {email} = req.body ;
   const code = Math.floor(Math.random()*90000) + 10000;
   console.log(email);
   try{
    await PendingUser.create({email:email,code:code.toString()});
    let mailOptions,link;

    link = "https://warm-brushlands-22534.herokuapp.com/user/api/auth/verification/verify-account/"+email+"/"+code.toString() ;
    mailOptions={
        from:'"Horizons" <no-reply@gmail.com>',
        to : email,
        subject: "Please verify your Email",
        html : "<h2>Horizons</h1><br><h4>Hi,<br> Please click on the link to verify your email.</h4><br><a href="+link+">Click here to verify</a>",
    }
    transport.sendMail(mailOptions);
} catch(error){
       res.json({message:"Something went wrong"}); 
   }
}

export const verifying =async(req,res)=>{

   const {userId,secretCode}=req.params;
   const redirect ="http://localhost:3000/";
 try{  
   const id =await PendingUser.findOne({email:userId});
   const code = await PendingUser.findOne({code:secretCode});

     if(id!==null && code!==null)
{
  const result=  await User.updateOne({email:userId},{$set:{status:"Verified"}},{new: true},(err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        };
    });
    await PendingUser.deleteOne({email:userId},(err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        };
    });

    res.end("<h1>Email "+userId+" has been Successfully verified. Go back and Sign In</h1><br><a href="+redirect+">Horizons</a>");
    
}else
{
    res.end("<h1>Link has expired</h1>");
}}catch{
    res.end("<h1>User don't exist</h1>");
}
}