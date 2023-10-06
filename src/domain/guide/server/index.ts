export interface Guide {
  content: JSON;
  id: number;
  source_video: null;
  title: string;
  user_id: number;
}

export type Attachment = {
  name: string;
  path: string;
  size: number;
  type: string;
};
