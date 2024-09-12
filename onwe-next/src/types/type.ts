export interface User {
  username: string;
  avatar: string | null;
  bio?: string;
  email?: string;
  fullname?: string;
  links: string[];
}
export interface Comment {
  content: string;
  createdAt: string; // You can change this to Date if you will be converting it
  id: number;
  parentId: number | null;
  postId: number;
  updatedAt: string; // You can change this to Date if you will be converting it
  user: User;
  userId: string;
}

export interface PostsProps {
  id: number;
  title: string;
  description: string;
  userid: string;
  username: string | null;
  likes: number;
  tags: string;
  media: string[];
  category: string;
  liked: boolean;
  avatar?: string;
  createdAt: string;
  createdBy: string;
}

export interface UserProfile {
  user: User;
  posts: PostsProps[];
  followersCount: number;
  followingCount: number;
}

export interface ClubCardProps {
  id: string;
  clubName: string;
  coverImage: string;
}

export interface ClubCardHome {
  id:string;
  name: string;
  coverimage: string;
  slogan: string
}

export interface EventCardHome{
  id: string;
  title: string;
  subtitle: string;
  dateOfEvent: string;
  time: string;
  description: string;
  photo: string;
}
