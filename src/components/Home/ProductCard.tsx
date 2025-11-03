import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardFooter } from '../../ui/card';
import { Badge } from '../../ui/badge';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount > 0 && (
            <Badge className="absolute top-3 left-3" variant="destructive">
              -{discount}%
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-gray-100 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
          {!product.inStock && (
            <div className="absolute inset-0 bg-black-50 flex items-center justify-center">
              <Badge variant="secondary">Out of Stock</Badge>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col items-start gap-3 p-4">
        <div className="w-full">
          <p className="text-sm text-gray-600">{product.category}</p>
          <h3 className="mt-1">{product.name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.rating})</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <p className="text-md">Rs{product.price}</p>
            {product.originalPrice && (
              <p className="text-sm text-gray-400 line-through">Rs{product.originalPrice}</p>
            )}
          </div>
          
          <Button 
            size="sm" 
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
export default ProductCard;