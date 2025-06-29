export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  uploadDate: string;
  channel: Channel;
  likes: number;
  dislikes: number;
  tags: string[];
}

export interface Channel {
  id: string;
  name: string;
  avatar: string;
  subscribers: number;
  verified: boolean;
  description?: string;
  bannerImage?: string;
  videoCount?: number;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  subscriptions: string[];
}