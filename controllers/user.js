import User from "../models/user.js";
import PendingUser from "../models/pendingUser.js";
import jwt  from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import smtTransport from "nodemailer-smtp-transport";
import {google} from "googleapis";

const oAuth2Client =new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN});
google.options({ auth: oAuth2Client });

const sendMail =async(email,code)=>{
    try
    {
        const accessToken = new Promise((resolve, reject) => {
            oAuth2Client.getAccessToken((err, token) => {
              if (err) console.log(err); // Handling the errors
              else resolve(token);
            });
          });
    let transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type:"OAuth2",
            user: "kediaarts@gmail.com",
            pass: process.env.EMAIL_PASS,
            clientId:process.env.CLIENT_ID,
            clientSecret:process.env.CLIENT_SECRET,
            refreshToken:process.env.REFRESH_TOKEN,
            accessToken:accessToken
        }
    });

    let mailOptions,link;

   link = "https://warm-brushlands-22534.herokuapp.com/user/api/auth/verification/verify-account/"+email+"/"+code.toString() ;
   console.log(link);
    mailOptions={
        from:'"Horizons" <no-reply@gmail.com>',
        to : email,
        subject: "Please verify your Email",
        html : "<h1>Horizons</h1><br><h2>Hi,<br> Please click on the link to verify your email.</h2><br><a href="+link+">Click here to verify</a>",
    }
    const result =await transport.sendMail(mailOptions);
    return result;

} catch(error){
    console.log(error);
}
    
}

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

        sendMail(email,code).then((result) => console.log('Email sent...', result))
        .catch((error) => console.log(error.message));
        
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
    sendMail(email,code).then((result) => console.log('Email sent...', result))
    .catch((error) => console.log(error.message));
} catch(error){
       res.json({message:"Something went wrong"}); 
   }
}

export const verifying =async(req,res)=>{

   const {userId,secretCode}=req.params;
   const redirect ="https://warm-brushlands-22534.herokuapp.com/";
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