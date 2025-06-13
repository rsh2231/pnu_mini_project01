"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface User {
  username: string;
  nickname: string;
}

const EditPostPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState({ title: "", content: "" });
  const springurl = process.env.NEXT_PUBLIC_SPRING_URL;

  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // 로그인된 유저 정보 불러오기
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${springurl}/loged-in/user`, {
          credentials: "include",
          headers: {
            Authorization: sessionStorage.getItem("JwtToken") || "",
          },
        });
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
  }, []);

  // 게시글 불러오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${springurl}/api/post/${id}`);
        const data = await res.json();
        const ds = data.content.dsboard;
        setPost({ title: ds.title, content: ds.content });
      } catch (error) {
        alert("게시글을 불러오지 못했습니다.");
        console.error(error);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    if (loadingUser) {
      alert("사용자 정보를 불러오는 중입니다.");
      return;
    }
    if (!user) {
      alert("로그인이 필요합니다.");
      router.push("/src/components/UI/Login/LoginModal.tsx")
    }

    const payload = {
      caller: "next",
      receiver: "spring",
      status: 200,
      method: "PUT",
      URL: `/api/posts/${id}`,
      message: "게시글 수정 요청",
      content: {
        dashboard: {
          dash_id: Number(id),
          title: post.title,
          content: post.content,
          username: user.username,
          nickname: user.nickname,
        },
      },
    };

    try {
      const res = await fetch(`${springurl}/api/post/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("수정되었습니다.");
        router.push(`/dashboard/${id}`);
      } else {
        alert("수정 실패");
      }
    } catch (err) {
      alert("오류 발생");
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-4">
      <h2 className="text-2xl font-bold">게시글 수정</h2>
      <input
        type="text"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        placeholder="제목"
        className="w-full p-2 border rounded"
      />
      <textarea
        value={post.content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
        placeholder="내용"
        rows={10}
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        수정 완료
      </button>
    </div>
  );
};

export default EditPostPage;
