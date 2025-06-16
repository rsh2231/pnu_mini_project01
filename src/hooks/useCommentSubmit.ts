import { User } from "@/type/user";

interface SubmitCommentParams {
  dashId: number;
  parentId?: number | null;
  content: string;
  user: User;
}

export function useCommentSubmit() {
  const springurl = process.env.NEXT_PUBLIC_SPRING_URL;

  const submitComment = async ({
    dashId,
    parentId = null,
    content,
    user,
  }: SubmitCommentParams): Promise<boolean> => {
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
      return true;
    } catch (error) {
      alert("댓글 등록 실패");
      console.error(error);
      return false;
    }
  };

  return { submitComment };
}
