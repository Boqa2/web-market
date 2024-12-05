export type CardSliderData = {
    id: number;
    handleHeart?: () => void;
    hearts?: boolean;
    card: string;
    title: string;
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