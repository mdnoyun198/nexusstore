export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: 'Apparel' | 'Objects & Home' | 'Everyday Carry' | 'Tech & Audio' | 'Footwear';
  tags: string[];
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  images: string[];
  colors: ProductColor[];
  sizes?: string[];
  description: string;
  details: string[];
  materials: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  id: string; // unique item id (productId + color + size)
  productId: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize?: string;
  quantity: number;
  addedAt: number;
}

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';

export interface FilterState {
  category: string;
  sortBy: SortOption;
  searchQuery: string;
  inStockOnly: boolean;
  maxPrice: number;
}

export type ViewMode = 'home' | 'catalog' | 'wishlist';
