export interface Service {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
  phone: string;
  imageUrl: string;
  price: number;
  distanceMiles: number;
  tags: string[];
}

export interface Category {
  id: number;
  value: string;
  label: string;
}

export const ALL_CATEGORIES = "ALL" as const;

export type CategoryFilterValue = string | typeof ALL_CATEGORIES;   //ki string huna payo or all 


export const ANY_RATING = "ANY" as const;
export type RatingFilterValue = number | typeof ANY_RATING;

export interface RatingOption {
    value: RatingFilterValue;
    label : string;
}

export const RATING_OPTIONS: RatingOption[] = [
    { value : ANY_RATING, label: "ANY"},
    {value: 4.5, label: "4.5+"},
    {value: 4.0, label: "4.0+"},
    {value: 3.5, label: "3.5+"},
];