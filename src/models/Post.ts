export interface Post {
  _id: number
  title: string;
  description: string;
  content: string;
  author: Object;
  imageUrl: string;
  position: number;
  isPublished: boolean;
  created_at: Date;
  updated_at: Date;
}



