import { useEffect, useState } from "react";
import { CommentDto } from "@/type/commentDto";

export function useComments(dashId: string | number, springurl: string, refresh: number) {
  const [comments, setComments] = useState<CommentDto[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${springurl}/api/comment/read`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: { comment: { dash_id: Number(dashId) } } }),
        });
        const data = await res.json();
        setComments(data.content.comments || []);
      } catch (error) {
        console.error("댓글 불러오기 실패:", error);
      }
    };

    fetchComments();
  }, [dashId, refresh]);

  return { comments };
}
