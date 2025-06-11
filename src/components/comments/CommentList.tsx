"use client";
import { useEffect, useState } from "react";
import { Comment } from "./commentType";
import CommentForm from "./CommentForm";
import { readComments } from "./commnetApi";

interface Props {
  dash_id: number;
}

export default function CommentsList({ dash_id }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const fetchComments = async () => {
    try {
      const data = await readComments(dash_id);
      setComments(data);
    } catch (error) {
      console.error("댓글 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [dash_id, refreshFlag]);

  const handleRefresh = () => {
    setRefreshFlag((prev) => !prev);
    setReplyingTo(null); // 댓글 작성 후 폼 닫기
  };

  const toggleReplyForm = (commentId: number) => {
    setReplyingTo((prev) => (prev === commentId ? null : commentId));
  };

  const renderReplies = (parentId: number, depth: number) => {
    return comments
      .filter((c) => c.parent_id === parentId)
      .map((reply) => (
        <div key={reply.comment_id} className="ml-6 border-l-2 pl-4 mt-2">
          <div className="text-sm text-gray-800 dark:text-gray-100">
            <strong>{reply.nickname}</strong>: {reply.content}
          </div>

          <button
            onClick={() => toggleReplyForm(reply.comment_id)}
            className="text-blue-500 text-xs hover:underline mt-1"
          >
            {replyingTo === reply.comment_id ? "답글 취소" : "답글 쓰기"}
          </button>

          {replyingTo === reply.comment_id && (
            <CommentForm
              dashBoard={{ dash_id }}
              parent_id={reply.comment_id}
              depth={depth + 1}
              onCommentWritten={handleRefresh}
            />
          )}

          {renderReplies(reply.comment_id, depth + 1)}
        </div>
      ));
  };

  return (
    <div className="space-y-4">
      <CommentForm dashBoard={{ dash_id }} onCommentWritten={handleRefresh} />
      {comments
        .filter((c) => c.depth === 0)
        .map((comment) => (
          <div key={comment.comment_id} className="border p-3 rounded-md">
            <div className="text-sm text-gray-800 dark:text-gray-100">
              <strong>{comment.nickname}</strong>: {comment.content}
            </div>

            <button
              onClick={() => toggleReplyForm(comment.comment_id)}
              className="text-blue-500 text-xs hover:underline mt-1"
            >
              {replyingTo === comment.comment_id ? "답글 취소" : "답글 쓰기"}
            </button>

            {replyingTo === comment.comment_id && (
              <CommentForm
                dashBoard={{ dash_id }}
                parent_id={comment.comment_id}
                depth={1}
                onCommentWritten={handleRefresh}
              />
            )}

            {renderReplies(comment.comment_id, 1)}
          </div>
        ))}
    </div>
  );
}
