export type Product = {
  id: number;
  name: string;
  price: number;

  colors: string[];
  logos: string[];
  sizes: string[];
};

export type SelectedVariant = {
  color: string;
  logo: string;
  size: string;
};

export type CartItem = {
  product: Product;
  variant: SelectedVariant;
  quantity: number;
};

export type CartState = CartItem[];
