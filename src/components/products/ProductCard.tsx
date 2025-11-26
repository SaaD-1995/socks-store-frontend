import React  from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { ShoppingCart, Heart, Eye, Star } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";


interface ProductCardProps {
    product: {
    _id: string;
    title: string;
    price: number;
    rating: number;
    reviews: number;
    images: string[];
    colors: string[];
    badge?: string;
    originalPrice?: number;
    materials?: string[];
  };
    index: number;
//   addToCart: (product: {
//     _id: string;
//     title: string;
//     price: number;
//     rating: number;
//     reviews: number;
//     images: string[];
//     colors: string[];
//     badge?: string;
//   }) => void;
}
const ProductCard = (
    { product, index,  }: ProductCardProps
) => {
    const [cart, setCart] = React.useState<any[]>([]);
    const addToCart = (product: any) => {
        setCart((prevCart) => [...prevCart, product]);
    };
    return (
        <>
            <Card key={`${product._id}-${index}`} className="group overflow-hidden hover:shadow-xl transition-all" >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {product.badge && (
                    <Badge className="absolute top-4 left-4 bg-purple-600">
                    {product.badge}
                    </Badge>
                )}

                <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Heart className="h-4 w-4" />
                </Button>

                <Button
                className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-purple-600 hover:bg-purple-700"
                onClick={() => addToCart(product)}
                >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
                </Button>

                </div>

                <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                <h3 className="text-gray-900 font-medium">{product.title}</h3>
                <Link to={`/products/${product._id}`}>
                    <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <span className="text-gray-600 hover:text-gray-800 text-sm transition-all duration-300">
                            <Eye className="h-4 w-4 inline-block mr-1" />
                        </span>
                        </TooltipTrigger>
                        <TooltipContent>
                        View Details
                        </TooltipContent>
                    </Tooltip>
                    </TooltipProvider>
                </Link>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-gray-700">{product.rating}</span>
                    </div>
                    <span className="text-gray-500">({product.reviews})</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-gray-600">{product.colors.length} colors</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                    <span className="text-gray-900">PKR{product.price}</span>
                    {product.originalPrice && (
                        <span className="text-gray-500 line-through">
                        ${product.originalPrice}
                        </span>
                    )}
                    </div>
                </div>
                </CardContent>
            </Card>
        </>
    );
}
export default ProductCard;