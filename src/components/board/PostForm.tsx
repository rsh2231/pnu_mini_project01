"use client";

import React, { useState, useRef, FormEvent, useEffect } from "react";
import { useImageUpload } from "@/app/api/useImageUpload";
import Button01 from "@/components/etc/Button01";
import { useRouter } from "next/navigation";

const PostForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { uploadAndInsertImage } = useImageUpload(content, setContent, contentRef);

  const springurl = process.env.SPRING_API;

  // 로그인 상태 확인
  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("not logged in");
      })
      .catch(() => {
        alert("로그인 후 이용해주세요.");
        router.push("/login");
      });
  }, []);

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          e.preventDefault();
          uploadAndInsertImage(file);
        }
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      uploadAndInsertImage(file);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.innerHTML);
  };

  const handleSubmit = async (e?: FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();

    if (title.trim() === "" || content.trim() === "" || content === "<br>") {
      alert("제목과 본문을 모두 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`${springurl}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // JWT 쿠키 포함
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (!response.ok) throw new Error("게시글 등록 실패");

      alert("게시글이 등록되었습니다!");
      setTitle("");
      setContent("");
      if (contentRef.current) contentRef.current.innerHTML = "";
      router.push("/board"); // 게시글 목록 등으로 이동
    } catch (error) {
      alert("게시글 등록 실패");
      console.error(error);
    }
  };

  return (
    <form className="w-[800px] mx-auto mt-16 p-10 bg-white dark:bg-gray-900 rounded-2xl shadow-lg space-y-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
        게시글 작성
      </h1>

      <div>
        <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          제목
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="제목을 입력하세요"
          className="w-full px-4 py-3 border rounded-lg text-base dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          본문
          <span className="text-sm text-gray-500 ml-2">
            (이미지: Ctrl+V 또는 드래그&드롭)
          </span>
        </label>
        <div
          ref={contentRef}
          contentEditable
          onInput={handleInput}
          onPaste={handlePaste}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="w-full min-h-[300px] px-4 py-3 border rounded-lg resize-y text-base leading-relaxed dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 overflow-auto"
          suppressContentEditableWarning={true}
          spellCheck={false}
          role="textbox"
          aria-multiline="true"
        />
      </div>

      <div className="pt-2">
        <Button01 caption="등록하기" bg_color="blue" onClick={handleSubmit} />
      </div>
    </form>
  );
};

export default PostForm;