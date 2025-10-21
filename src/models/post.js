import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    prompt:{
        type: String,
        required:[true,"Prompt is required"]
    },
    tag:{
        type: String,
        required:[true,"Tag is required"]
    }
})

const Post = mongoose.models.post || mongoose.model('post',postSchema)
export default Post