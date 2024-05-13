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
  images: File[];
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
