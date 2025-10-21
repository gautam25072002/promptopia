'use server'
import { connectToDB } from "@/app/utils/db"
import User from "@/models/user"
import bcrypt from 'bcrypt'
import { redirect } from "next/navigation"

export default async function Register(formData){
    await connectToDB()
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    if(!name || !email || !password){
        // console.log("Validation failed☠️")
        return {success:false,msg:"All fields are required"}
    }
    const findUser = await User.findOne({email})
    if(findUser){
        console.log("User already exist")
        return {success:false,msg:"User already exist"}
    }

    const hashedPassword = await bcrypt.hash(password,10)
    const user = new User({
        name,
        email,
        password:hashedPassword
    })
    await user.save()
    console.log("Signed up successfully")
    redirect('/sign-in')
}