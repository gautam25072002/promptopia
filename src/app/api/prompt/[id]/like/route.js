import { connectToDB } from "@/app/utils/db";
import Prompt from "@/models/post";
import { auth } from "@/auth";

export async function POST(req, {params}) {
  try {
    const { id } = await params;

    await connectToDB();

    const session = await auth();

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const prompt = await Prompt.findById(id);
    if (!prompt) {
      return Response.json({ error: "Prompt not found" }, { status: 404 });
    }

    const userId = session.user.id;
    const alreadyLiked = prompt.likes.map(i => i.toString()).includes(userId);

    if (alreadyLiked) {
      prompt.likes = prompt.likes.filter(
        (i) => i.toString() !== userId
      );
    } else {
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