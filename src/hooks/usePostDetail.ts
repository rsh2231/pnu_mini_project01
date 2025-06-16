import { dashBoard } from "@/type/dashborad";
import { useEffect, useState } from "react";

export function usePostDetail(id: string, springurl: string) {
  const [board, setBoard] = useState<dashBoard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBoard = async () => {
      try {
        const res = await fetch(`${springurl}/api/post/${id}`);
        const data = await res.json();
        const ds = data.content.dashboard;
        setBoard({
          id: ds.dash_id,
          title: ds.title,
          content: ds.content,
          writer: ds.nickname,
          createDate: ds.createdAt,
        });
      } catch (err) {
        console.error("게시글 불러오기 실패", err);
        setBoard(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBoard();
  }, [id]);

  return { board, loading };
}
