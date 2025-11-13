import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the product type
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  colors: number;
}

// 🔹 Your static products
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Classic Striped Crew Socks",
    price: 12.99,
    originalPrice: 18.99,
    image: "https://images.unsplash.com/photo-1615486364462-ef6363adbc18?...",
    rating: 4.8,
    reviews: 156,
    badge: "Sale",
    colors: 8,
  },
  {
    id: 2,
    name: "Premium Wool Winter Socks",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1730449989570-23aef9239e07?...",
    rating: 4.9,
    reviews: 203,
    badge: "New",
    colors: 5,
  },
  {
    id: 3,
    name: "Athletic Performance Socks",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1760177379331-a8b4311db4a6?...",
    rating: 4.7,
    reviews: 89,
    colors: 6,
  },
  {
    id: 4,
    name: "Business Dress Socks",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1641482847237-e64ca2769a8c?...",
    rating: 4.6,
    reviews: 124,
    colors: 4,
  },
  {
    id: 5,
    name: "Cozy Home Comfort Socks",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1580765187102-ff820adf90be?...",
    rating: 4.9,
    reviews: 178,
    badge: "Popular",
    colors: 7,
  },
  {
    id: 6,
    name: "Colorful Pattern Mix Pack",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1651223658914-efd50e3da48e?...",
    rating: 4.8,
    reviews: 267,
    badge: "Bundle",
    colors: 12,
  },
];

// 🔹 Slice state
interface ProductState {
  items: Product[];
}

const initialState: ProductState = {
  items: initialProducts,
};

// 🔹 Create slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;
