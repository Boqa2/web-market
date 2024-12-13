export type CardSliderData = {
  id: number;
  handleHeart?: () => void;
  hearts?: boolean;
  card: string;
  urls?: string,
  title: string;
  gender?: string,
  handleDelete?: ()=>void;
  handleFavorite?: () => void;
  price: number,
  about: {
    text: string;
    sostav: string;
    mesto: string;
  };
  size?: string;
  trash: boolean;
  user_id?:  number
};

export type integer = {
  email: string,
  name:string,
  password: string
}

export type types = {
  bol: boolean,
  id: number
}
export interface User {
  email: string;
  password: string;
}