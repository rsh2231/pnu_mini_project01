export interface CommentDto {
  comment_id: number;
  content: string;
  nickname: string;
  dash_id: number;
  parent_id: number | null;
  depth: number;
  created_at: string;
  children?: CommentDto[];
}
