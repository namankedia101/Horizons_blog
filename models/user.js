import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String , required:true},
    password:{type:String , required:true},
    status:{type:String, default:"pending"},
    id:{type:String}
});

export default mongoose.model("User",userSchema);