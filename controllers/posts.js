import mongoose from "mongoose";
import PostMessage from "../models/postContent.js";
import cloudinary from "../utils/cloudinary.js";

export const getPosts = async (req,res)=>{
    const {page} = req.query;
    try{
        const LIMIT = 15;
        const startIndex = (Number(page)-1)*LIMIT;

        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        
        res.status(200).json({data:posts,currentPage:Number(page), numberOfPages:Math.ceil(total/LIMIT)});
    }catch(error){
        res.status(404).json({message:error.message});
    }
}

export const getPost = async(req,res)=>{
    const {id} = req.params;
    try {
        const post = await PostMessage.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const updatePost = async(req,res)=>{

}

export const createPost = async(req,res)=>{
    const post = req.body;
    
    const newPostContent = new PostMessage({...post,createdAt:new Date().toISOString()});
    
    try {
        const uploadResponse = await cloudinary.v2.uploader.upload(post.selectedFile,{
            upload_preset:"horizons_blog"
        });
        console.log(uploadResponse);
        await newPostContent.save();
        res.status(201).json(newPostContent);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}

export const deletePost = async(req,res)=>{
    
}

export const commentPost = async(req,res)=>{

}

export const deleteComment = async(req,res)=>{
    
}
