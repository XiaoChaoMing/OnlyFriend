export interface listItem {
  id: number | null | undefined;
  icon: React.JSX.Element;
  route?: String;
  label?: any;
}
export interface Image {
  image: File;
}
export interface ListImages {
  images: File;
}
export interface Message {
  msgText: string;
  image: string;
  icon: string;
}
export interface PostItem {
  id: number;
  avatar: string;
  username: string;
  status: string;
  image: string[];
}
export interface CreateUserData {
  first_name: string;
  last_name: string;
  username: string;
  birthday?: string;
  avatar?: string;
  password: string;
}
export interface User {
  Users_Followers_followingIdToUsers?: any;
  Avatar: string;
  firstName: string;
  id: number;
  lastName: string;
}

export interface PostMedia {
  id: number;
  mediaFile: string;
  mediaType?: string;
}

export interface Posts {
  id: number;
  pageId: number | null;
  groupId: number | null;
  Status: string;
  Users: User;
  createdAt: string;
  updatedAt: string;
  userId: number;
  Reactions?: any;
  postTypeId: number;
  _count: {
    Reactions: number;
    Comments: number;
  };
  PostMedia: PostMedia[];
}

export interface PostList {
  Posts: Posts[] | null;
}
