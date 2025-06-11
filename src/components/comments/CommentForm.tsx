"use client";
import React, { useState } from "react";
import { writeComment } from "./commnetApi";
import { CommentDto, DashBoard } from "./commentType";

interface CommentFormProps {
  dashBoard: DashBoard;
  parent_id?: number | null;
  depth?: number;
  onCommentWritten: () => void;
}

export default function CommentForm({
  dashBoard,
  parent_id = null,
  depth = 0,
  onCommentWritten,
}: CommentFormProps) {
  const [form, setForm] = useState({
    username: "",
    nickname: "",
    content: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { username, nickname, content } = form;
    if (!username.trim() || !nickname.trim() || !content.trim()) return;

    const dto: CommentDto = {
      dashBoard,
      username,
      nickname,
      content,
      parent_id,
      depth,
    };

    setSubmitting(true);
    try {
      await writeComment(dto);
      setForm({ username: "", nickname: "", content: "" });
      onCommentWritten();
    } catch (err: any) {
      alert("댓글 작성 실패: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-2 bg-gray-50 dark:bg-gray-800 p-4 rounded shadow-sm">
      <div className="flex gap-2">
        <input
          type="text"
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={handleChange}
          className="w-1/2 p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          name="nickname"
          placeholder="닉네임"
          value={form.nickname}
          onChange={handleChange}
          className="w-1/2 p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
      </div>
      <textarea
        name="content"
        placeholder={depth === 0 ? "댓글을 입력하세요" : "대댓글을 입력하세요"}
        value={form.content}
        onChange={handleChange}
        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        rows={3}
      />
      <button
        type="submit"
        disabled={submitting}
        className={`px-4 py-2 rounded text-white ${submitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
      >
        {submitting ? "작성 중..." : depth === 0 ? "댓글 작성" : "답글 작성"}
      </button>
    </form>
  );
}
