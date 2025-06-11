export interface DashBoard {
  dash_id: number;
}

export interface CommentDto {
  dashBoard: DashBoard;
  username: string;
  nickname: string;
  content: string;
  parent_id?: number | null;
  depth?: number;
}

export interface Comment {
  comment_id: number;
  dashBoard: DashBoard;
  username: string;
  nickname: string;
  content: string;
  parent_id: number | null;
  created_at: string;
  depth: number;
}
