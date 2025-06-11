import { Comment, CommentDto } from "./commentType";

const springurl = process.env.NEXT_PUBLIC_SPRING_URL;

export async function writeComment(dto: CommentDto) {
  const res = await fetch(`${springurl}/api/comment/write`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error("댓글 작성 실패");
}

export async function readComments(dash_id: number): Promise<Comment[]> {
  const res = await fetch(`${springurl}/api/comment/read`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dash_id }),
  });
  if (!res.ok) throw new Error("댓글 조회 실패");
  return res.json();
}
