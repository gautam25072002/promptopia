import { connectToDB } from '@/app/utils/db'
import {auth} from '@/auth'
import Post from '@/models/post'
import { redirect } from 'next/navigation'


export async function POST(req){
    // console.log('API called')
    const session = await auth()
    if(!session) return new Response(JSON.stringify({msg:"Unauthorized"},{status:401}))
    try{
        await connectToDB()
        const {prompt,tag} = await req.json()
        if(!prompt || !tag) return new Response(JSON.stringify({success:false,msg:"All fields are required"}))
        const newPrompt = await Post.create({creator:session.user.id,prompt,tag})
        console.log(newPrompt)
        redirect('/')
    } catch(error){
        console.log(error)
        return new Response(JSON.stringify({success:false,msg:"Server error"},{status:500}))
    }
}


