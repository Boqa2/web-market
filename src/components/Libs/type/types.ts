export type CardSliderData = {
    id: number;
    handleHeart?: () => void;
    hearts?: boolean;
    card: string;
    urls?:string,
    title: string;
    gender?:string,
    handleFavorite?: () => void;
    price: number,
    about: {
      text: string;
      sostav: string;
      mesto: string;
    };
    size?: string;
    trash: boolean;
  };