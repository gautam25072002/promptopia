import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
    },
    image:{
        type:String,
    }
},{timestamps:true})

const User = mongoose.models.user || mongoose.model('user',userSchema)

export default User