import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title:String,
    message:String,
    selectedFile: String,
    comments: {
        type: [String],
        default: []
    },
    createdAt:{
        type: Date,
        default:new Date()
    }
});

let PostMessage = mongoose.model("PostMessage",postSchema);

export default PostMessage;