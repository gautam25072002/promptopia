import { connectToDB } from "@/app/utils/db";
import Prompt from "@/models/post";
import { auth } from "@/auth";

export async function POST(req, { params }) {
  try {
    await connectToDB();

    const session = await auth();
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const prompt = await Prompt.findById(params.id);
    if (!prompt) {
      return Response.json({ error: "Prompt not found" }, { status: 404 });
    }

    const userId = session.user.id;
    const alreadyLiked = prompt.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike
      prompt.likes = prompt.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      // Like
      prompt.likes.push(userId);
    }

    await prompt.save();

    return Response.json({
      likes: prompt.likes.length,
      isLiked: !alreadyLiked,
    });
  } catch (error) {
    console.error("Like error:", error);
    return Response.json({ error: "Failed to update like" }, { status: 500 });
  }
}