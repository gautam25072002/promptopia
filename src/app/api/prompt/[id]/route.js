import { connectToDB } from "@/app/utils/db"
import Post from "@/models/post"

export const DELETE = async (req,{params}) => {
    const {id} = await params
    await connectToDB()
    try{
        const delPost = await Post.findByIdAndDelete({_id:id})
        console.log(delPost)
        return new Response("Deleted successfully")
    } catch(error){
        console.log(error)
    }
}


export const PATCH = async (req,{params}) => {
    const data = await req.json()
    const {id} = await params
    await connectToDB()
    try{
        const updatedPost = await Post.findByIdAndUpdate(id,{
            prompt:data.prompt,
            tag:data.tag
        })
        console.log(updatedPost)
        return new Response("Updated successfully")
    } catch(error){
        console.log(error)
    }
}