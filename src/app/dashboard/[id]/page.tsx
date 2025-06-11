"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Button01 from "@/components/etc/Button01";
import DOMPurify from "dompurify";

import CommentForm from "@/components/comments/CommentForm";
import CommentsList from "@/components/comments/CommentList";

interface Board {
  id: number;
  title: string;
  content: string;
  writer: string;
  createDate: string;
}

export default function PostDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const springurl = process.env.NEXT_PUBLIC_SPRING_URL;

  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [refresh, setRefresh] = useState(false); // 댓글 새로고침용

  useEffect(() => {
    if (!id) return;

    const fetchBoard = async () => {
      try {
        const res = await fetch(`${springurl}/api/posts/${id}`);
        if (!res.ok) throw new Error(`게시글을 불러오지 못했습니다. (status: ${res.status})`);

        const data = await res.json();
        const mappedData: Board = {
          id: data.dash_id,
          title: data.title,
          content: data.content,
          writer: data.nickname,
          createDate: data.created_at,
        };

        setBoard(mappedData);
      } catch (error) {
        console.error("에러:", error);
        setBoard(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBoard();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("정말 이 게시글을 삭제하시겠습니까?")) return;
    setDeleting(true);

    try {
      const res = await fetch(`${springurl}/api/posts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`삭제 실패 (status: ${res.status})`);
      }

      alert("게시글이 삭제되었습니다.");
      router.push("/dashboard");
    } catch (error) {
      alert("삭제 중 오류가 발생했습니다.");
      console.error(error);
      setDeleting(false);
    }
  };

  const cleanContent = DOMPurify.sanitize(board?.content || "");

  if (loading) {
    return <p className="text-center mt-20 text-gray-500 dark:text-gray-400 text-lg">로딩 중...</p>;
  }

  if (!board) {
    return <p className="text-center mt-20 text-red-500 dark:text-red-400 text-lg">게시글을 찾을 수 없습니다.</p>;
  }

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-gray-900 rounded-lg shadow-md">
      {/* 상단 제목 및 버튼 */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">게시글 상세</h1>
        <div className="flex gap-2">
          <Button01 caption="목록으로" bg_color="blue" onClick={() => router.push("/dashboard")} />
          <Button01 caption="수정" bg_color="blue" onClick={() => router.push(`/dashboard/edit/${id}`)} />
          <Button01 caption={deleting ? "삭제 중..." : "삭제"} bg_color="blue" onClick={handleDelete} />
        </div>
      </div>

      {/* 게시글 제목 */}
      <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-3">{board.title}</h2>

      {/* 작성자 & 날짜 */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-6 space-x-4">
        <span>작성자: {board.writer}</span>
        <span>작성일: {new Date(board.createDate).toLocaleString()}</span>
      </div>

      {/* 본문 내용 */}
      <div
        className="bg-gray-50 dark:bg-gray-800 p-6 rounded-md text-gray-900 dark:text-gray-100 leading-7 whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: cleanContent }}
      />

      {/* 댓글 섹션 */}
      <section className="mt-10">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">💬 댓글</h3>

        {/* 댓글 작성 */}
        <div className="mb-6">
          <CommentForm
            dashId={board.id}
            parentId={null}
            depth={0}
            onCommentWritten={() => setRefresh(!refresh)}
          />
        </div>

        {/* 댓글 목록 */}
        <CommentsList dashId={board.id} refresh={refresh} />
      </section>
    </div>
  );
}
