"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  Check,
  Minus,
  Plus
} from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  colors?: string[];
  sizes?: string[];
  category: string;
  material?: string;
}
const product: Product = {
    id: 1,
    name: "Classic Crew Socks",
    price: 12.99,
    originalPrice: 19.99,
    image: "https://images.unsplash.com/photo-1600185366316-7f2c5f3f1b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwY3JldyUyMHNvY2t8ZW58MXx8fHwxNzYyMjM3Nzc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5,
    reviews: 128,
    badge: "Best Seller",
    colors: ["Black", "White", "Gray", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    category: "Casual Wear",
    material: "Cotton Blend"
};
const relatedProducts: Product[] = [
    {
        id: 2,
        name: "Athletic Performance Socks",
        price: 14.99,
        image: "https://images.unsplash.com/photo-1590080877777-6f3b3f4b8e2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHNvY2t8ZW58MXx8fHwxNzYyMjM3Nzc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        rating: 4.7,
        reviews: 85,
        category: "Sportswear",
    },
];

function onAddToCart(product: any) {
  toast.success(`${product.name} added to cart!`);
}
function onBack() {
    window.history.back();
}
function onProductClick(productId: number) {
    window.location.href = `/products/${productId}`;
}
function ProductDetailPage() {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "M");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "Black");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock images for gallery
  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1673168871230-cdc1a52c5d7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NrJTIwY2xvc2UlMjB1cCUyMGRldGFpbHxlbnwxfHx8fDE3NjIyMzc3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1629892679977-4a60230d1aab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB3ZWFyaW5nJTIwc29ja3N8ZW58MXx8fHwxNzYyMjM3NzcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1759782178780-6b6c54dd42a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHNvY2tzJTIwZGlzcGxheXxlbnwxfHx8fDE3NjIyMzc3NzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
  ];

  // Mock reviews
  const reviews = [
    {
      id: 1,
      author: "Sarah M.",
      rating: 5,
      date: "2 weeks ago",
      comment: "These socks are incredibly comfortable! The material is soft and they fit perfectly. Highly recommend!",
      verified: true
    },
    {
      id: 2,
      author: "John D.",
      rating: 4,
      date: "1 month ago",
      comment: "Great quality socks. They wash well and maintain their shape. Would buy again.",
      verified: true
    },
    {
      id: 3,
      author: "Emily R.",
      rating: 5,
      date: "1 month ago",
      comment: "Best socks I've ever owned! Worth every penny. The colors are vibrant and they're super durable.",
      verified: true
    }
  ];

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity
    });
  };

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button & Breadcrumb */}
      <div className="border-b bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 -ml-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <a href="#" className="text-gray-600 hover:text-purple-600">Home</a>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <a href="#" className="text-gray-600 hover:text-purple-600">{product.category}</a>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-900">{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-purple-600">
                  {product.badge}
                </Badge>
              )}
              {discount > 0 && (
                <Badge className="absolute top-4 right-4 bg-red-600">
                  -{discount}%
                </Badge>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? "border-purple-600 ring-2 ring-purple-200" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-gray-900 mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-700">{product.rating}</span>
                <span className="text-gray-500">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-gray-900 text-3xl">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-gray-500 line-through text-xl">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed">
                Experience ultimate comfort with our premium {product.name.toLowerCase()}. 
                Crafted from high-quality {product.material || "materials"}, these socks provide 
                exceptional softness and durability. Perfect for {product.category.toLowerCase()} wear, 
                they feature a comfortable fit that stays in place all day long.
              </p>
            </div>

            <Separator />

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-gray-900">Color</label>
                  <span className="text-gray-600">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedColor === color
                          ? "border-purple-600 bg-purple-50 text-purple-700"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-gray-900">Size</label>
                  <button className="text-purple-600 hover:underline">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-16 h-12 rounded-lg border-2 transition-all ${
                        selectedSize === size
                          ? "border-purple-600 bg-purple-50 text-purple-700"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="text-gray-900 mb-3 block">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                  <button
                    onClick={decrementQuantity}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 text-gray-900">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="p-3 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-gray-600">
                  {quantity * product.price > 50 && (
                    <span className="text-green-600 flex items-center gap-1">
                      <Check className="h-4 w-4" />
                      Free shipping eligible
                    </span>
                  )}
                </span>
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 bg-purple-600 hover:bg-purple-700 h-14"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 w-14"
                onClick={() => {
                  setIsWishlisted(!isWishlisted);
                  toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
                }}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                <Truck className="h-6 w-6 text-purple-600 mb-2" />
                <p className="text-gray-600">Free Shipping</p>
                <p className="text-gray-500">On orders $50+</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                <RotateCcw className="h-6 w-6 text-purple-600 mb-2" />
                <p className="text-gray-600">Easy Returns</p>
                <p className="text-gray-500">30-day policy</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                <Shield className="h-6 w-6 text-purple-600 mb-2" />
                <p className="text-gray-600">Quality</p>
                <p className="text-gray-500">Guaranteed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="description" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-transparent"
              >
                Description
              </TabsTrigger>
              <TabsTrigger 
                value="specifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-transparent"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger 
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-transparent"
              >
                Reviews ({product.reviews})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-8 space-y-4">
              <div className="prose max-w-none">
                <h3 className="text-gray-900">Product Description</h3>
                <p className="text-gray-600">
                  Our {product.name} are designed with both comfort and style in mind. Made from premium 
                  {product.material || " materials"}, these socks offer exceptional breathability and 
                  moisture-wicking properties to keep your feet dry and comfortable throughout the day.
                </p>
                <h4 className="text-gray-900">Key Features:</h4>
                <ul className="text-gray-600 space-y-2">
                  <li>Premium quality {product.material || "fabric"} construction</li>
                  <li>Reinforced heel and toe for enhanced durability</li>
                  <li>Arch support for all-day comfort</li>
                  <li>Machine washable for easy care</li>
                  <li>Available in multiple colors and sizes</li>
                  <li>Perfect fit that won't slip or bunch</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-gray-900">Product Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Category</span>
                      <span className="text-gray-900">{product.category}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Material</span>
                      <span className="text-gray-900">{product.material || "Premium Blend"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Available Sizes</span>
                      <span className="text-gray-900">{product.sizes?.join(", ") || "S, M, L, XL"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Available Colors</span>
                      <span className="text-gray-900">{product.colors?.length || 0} options</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-gray-900">Care Instructions</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Machine wash cold with like colors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Tumble dry low heat</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Do not bleach</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Do not iron</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8 space-y-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Rating Summary */}
                <div className="md:w-64 space-y-4">
                  <div className="text-center p-6 border rounded-lg">
                    <div className="text-5xl text-gray-900 mb-2">{product.rating}</div>
                    <div className="flex justify-center mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">Based on {product.reviews} reviews</p>
                  </div>
                  <Button className="w-full" variant="outline">
                    Write a Review
                  </Button>
                </div>

                {/* Reviews List */}
                <div className="flex-1 space-y-6">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-gray-900">{review.author}</span>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  <Check className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "fill-gray-200 text-gray-200"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-gray-500">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <Card 
                  key={relatedProduct.id} 
                  className="group overflow-hidden hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => onProductClick?.(relatedProduct.id)}
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {relatedProduct.badge && (
                      <Badge className="absolute top-4 left-4 bg-purple-600">
                        {relatedProduct.badge}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <h3 className="text-gray-900 line-clamp-2">{relatedProduct.name}</h3>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-gray-700">{relatedProduct.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900">${relatedProduct.price}</span>
                      {relatedProduct.originalPrice && (
                        <span className="text-gray-500 line-through">
                          ${relatedProduct.originalPrice}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default ProductDetailPage;