"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import DOMPurify from "dompurify";

import Button01 from "@/components/etc/Button01";
import CommentTree from "@/components/comments/CommentTree";
import CommentForm from "@/components/comments/CommentForm";
import { CommentDto } from "@/type/commentDto";
import { dashBoard } from "@/type/dashborad";

export default function PostDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const springurl = process.env.NEXT_PUBLIC_SPRING_URL;

  const [board, setBoard] = useState<dashBoard | null>(null);
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [refresh, setRefresh] = useState<number>(Date.now());

  useEffect(() => {
    if (!id) return;

    const fetchBoard = async () => {
      try {
        const res = await fetch(`${springurl}/api/post/${id}`);
        const data = await res.json();
        console.log("게시글 응답:", data);

        const ds = data.content.dashboard;
        const mappedData: dashBoard = {
          id: ds.dash_id,
          title: ds.title,
          content: ds.content,
          writer: ds.nickname,
          createDate: ds.createdAt,
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

  // 댓글 불러오기
  const fetchComments = async () => {
    try {
      const res = await fetch(`${springurl}/api/comment/read`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: {
            comment: {
              dash_id: Number(id),
            },
          },
        }),
      });
      const data = await res.json();
      console.log("댓글 서버 응답:", data.content.comments);
      setComments(data.content.comments || []);
    } catch (error) {
      console.error("댓글 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchComments();
    }
  }, [id, refresh]);

  const handleDelete = async () => {
    if (!confirm("정말 이 게시글을 삭제하시겠습니까?")) return;

    setDeleting(true);
    try {
      const res = await fetch(`${springurl}/api/post/delete?dashId=${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: { dashboard: { dashId: Number(id) } },
        }),
      });
      if (!res.ok) throw new Error("삭제 실패");

      alert("게시글이 삭제되었습니다.");
      router.push("/dashboard");
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setDeleting(false);
    }
  };

  const cleanContent = DOMPurify.sanitize(board?.content || "");

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500 dark:text-gray-400 text-lg">
        로딩 중... ⏳
      </p>
    );
  }

  if (!board) {
    return (
      <p className="text-center mt-20 text-red-500 dark:text-red-400 text-lg">
        게시글을 찾을 수 없습니다.
      </p>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-white dark:bg-gray-900 rounded-lg shadow-md">
      {/* 상단 제목 및 버튼 */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-4 mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
          게시글 상세
        </h1>
        <div className="flex flex-wrap gap-2">
          <Button01
            caption="목록으로"
            bg_color="blue"
            onClick={() => router.push("/dashboard")}
          />
          <Button01
            caption="수정"
            bg_color="blue"
            onClick={() => router.push(`/dashboard/edit/${id}`)}
          />
          <Button01
            caption={deleting ? "삭제 중..." : "삭제"}
            bg_color="blue"
            onClick={handleDelete}
          />
        </div>
      </div>

      {/* 게시글 제목 */}
      <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-3">
        {board.title}
      </h2>

      {/* 작성자 & 날짜 */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex flex-col sm:flex-row sm:space-x-4">
        <span>작성자: {board.writer}</span>
        <span>작성일: {new Date(board.createDate).toLocaleString()}</span>
      </div>

      {/* 본문 내용 */}
      <div
        className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-md text-gray-900 dark:text-gray-100 leading-7 whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: cleanContent }}
      />

      {/* 댓글 영역 */}
      <div className="mt-10">
        <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800 dark:text-white">
          댓글
        </h3>

        <div className="bg-gray-100 dark:bg-gray-800 p-3 sm:p-4 rounded-md shadow-inner">
          <CommentForm
            dashId={board.id}
            parentId={null}
            onCommentPosted={() => setRefresh(Date.now())}
          />

          <div className="mt-6 border-t pt-4 border-gray-300 dark:border-gray-600">
            <CommentTree
              comments={comments}
              onRefresh={() => setRefresh(Date.now())}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
