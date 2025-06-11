"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const EditPostPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState({ title: "", content: "" });

  useEffect(() => {
    // 기존 게시글 불러오기
    const fetchPost = async () => {
      const res = await fetch(`http://10.125.121.186:8080/api/posts/${id}`);
      const data = await res.json();
      setPost({ title: data.title, content: data.content });
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    const res = await fetch(`http://10.125.121.186:8080/api/posts/${id}`, {
      method: "PUT", // 또는 PATCH
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (res.ok) {
      router.push(`/dashboard/${id}`);
    } else {
      alert("수정에 실패했습니다.");
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
