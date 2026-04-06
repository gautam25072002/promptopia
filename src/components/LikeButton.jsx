"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LikeButton({ promptId, initialLikes, initialIsLiked, session }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLike = async () => {
    if (!session?.user) {
      router.push("/sign-in");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`api/prompt/${promptId}/like`, {
        method: "POST",
      });

      if (res.status === 401) {
        router.push("/sign-in");
        return;
      }

      const data = await res.json();
      if (data.likes !== undefined) {
        setLikes(data.likes);
        setIsLiked(data.isLiked);
      }
    } catch (err) {
      console.error("Failed to like:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`flex items-center gap-1.5 text-sm transition-colors ${
        isLiked ? "text-red-500" : "text-gray-400 hover:text-red-400"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={isLiked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      <span>{likes}</span>
    </button>
  );
}