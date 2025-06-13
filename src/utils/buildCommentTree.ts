import { CommentDto } from "@/type/commentDto";

export default function buildCommentTree(comments: CommentDto[]): CommentDto[] {
  const map: Record<number, CommentDto & { children: CommentDto[] }> = {};
  const roots: (CommentDto & { children: CommentDto[] })[] = [];

  comments.forEach((c) => {
    map[c.comment_id] = { ...c, children: [] };
  });

  Object.values(map).forEach((comment) => {
    if (comment.parent_id === null) {
      roots.push(comment);
    } else {
      const parent = map[comment.parent_id];
      if (parent) {
        parent.children.push(comment);
      }
    }
  });

  return roots;
}
