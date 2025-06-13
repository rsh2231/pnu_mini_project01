"use client";

import React, { useState, useEffect, FormEvent } from "react";

interface User {
  username: string;
  nickname: string;
}

interface CommentFormProps {
  dashId: number; // 게시글 ID
  parentId?: number | null; // 대댓글이면 부모 댓글 ID, 없으면 null
  onCommentPosted?: () => void; // 댓글 등록 후 콜백
}

const CommentForm: React.FC<CommentFormProps> = ({
  dashId,
  parentId = null,
  onCommentPosted,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [content, setContent] = useState("");
  const springurl = process.env.NEXT_PUBLIC_SPRING_URL;

  // 로그인된 유저 정보 가져오기
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${springurl}/loged-in/user`, {
          credentials: "include",
          headers: {
            Authorization: sessionStorage.getItem("JwtToken") || "",
          },
        });
        if (!res.ok) throw new Error("유저 정보 가져오기 실패");
        const data = await res.json();
        const member = data.content?.member;
        if (!member) throw new Error("유저 정보 없음");
        setUser(member);
      } catch {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    }
    fetchUser();
  }, [springurl]);

  // 댓글 작성 제출
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (loadingUser) {
      alert("사용자 정보를 불러오는 중입니다.");
      return;
    }
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (content.trim() === "") {
      alert("댓글 내용을 입력하세요.");
      return;
    }

    // 백엔드에 맞는 payload 구조
    const payload = {
      caller: "next",
      receiver: "spring",
      status: 200,
      method: "POST",
      URL: "/api/comment/write",
      message: "댓글 등록 요청",
      content: {
        comment: {
          dash_id: dashId,
          parent_id: parentId,
          content: content.trim(),
          username: user.username,
          nickname: user.nickname,
        },
      },
    };

    try {
      const res = await fetch(`${springurl}/api/comment/write`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.getItem("JwtToken") || "",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("댓글 등록 실패");
      alert("댓글이 등록되었습니다!");
      setContent("");
      if (onCommentPosted) onCommentPosted(); // 부모 컴포넌트에 알려주기
    } catch (error) {
      alert("댓글 등록 실패");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mt-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요"
        className="w-full p-3 border rounded resize-y dark:bg-gray-800 dark:text-white"
        rows={4}
        disabled={loadingUser || !user}
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        disabled={loadingUser || !user}
      >
        댓글 등록
      </button>
    </form>
  );
};

export default CommentForm;
