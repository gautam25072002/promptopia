import { connectToDB } from "@/app/utils/db"
import Post from "@/models/post"
import User from '@/models/user'

export async function GET(){
    try{
        await connectToDB()
        const posts = await Post.find({}).populate({path:'creator',model:'user'})
        return new Response(JSON.stringify(posts),{status:200})
    }catch(error){
        return new Response({success:false,msg:"Failed to fetch prompts"},{status:500})
    }
}