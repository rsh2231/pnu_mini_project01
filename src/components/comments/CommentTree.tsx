import { CommentDto } from "@/type/commentDto";
import buildCommentTree from "@/utils/buildCommentTree";
import CommentItem from "./CommentItem";

interface Props {
  comments: CommentDto[];
  onRefresh: () => void;
}

export default function CommentTree({ comments, onRefresh }: Props) {
  const tree = buildCommentTree(comments);

  return (
    <div className="space-y-4">
      {tree.map((comment) => (
        <div
          key={comment.comment_id}
          className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md border 
                     border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
        >
          <CommentItem comment={comment} onRefresh={onRefresh} />
        </div>
      ))}
    </div>
  );
}
