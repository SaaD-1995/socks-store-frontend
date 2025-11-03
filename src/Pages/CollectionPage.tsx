"use client";

import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { Slider } from "../ui/silder";
import { Checkbox } from "../ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Heart, ShoppingCart, Star, SlidersHorizontal, X, ChevronDown, Home } from "lucide-react";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  colors: string[];
  sizes: string[];
  category: string;
  material: string;
}

const allProducts: Product[] = [
  {
    id: 1,
    name: "Classic Striped Crew Socks",
    price: 12.99,
    originalPrice: 18.99,
    image: "https://images.unsplash.com/photo-1615486364462-ef6363adbc18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJpcGVkJTIwc29ja3MlMjBmYXNoaW9ufGVufDF8fHx8MTc2MjE5MTE2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviews: 156,
    badge: "Sale",
    colors: ["Blue", "Red", "Green"],
    sizes: ["S", "M", "L"],
    category: "Casual",
    material: "Cotton"
  },
  {
    id: 2,
    name: "Premium Wool Winter Socks",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1647549897410-3583914a7961?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29sJTIwa25pdCUyMHNvY2tzfGVufDF8fHx8MTc2MjE5MTE2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviews: 203,
    badge: "New",
    colors: ["Gray", "Navy", "Black"],
    sizes: ["M", "L", "XL"],
    category: "Cozy",
    material: "Wool"
  },
  {
    id: 3,
    name: "Athletic Performance Socks",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1608357746078-342b38f738c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmtsZSUyMHNwb3J0cyUyMHNvY2tzfGVufDF8fHx8MTc2MjE5MTE2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    reviews: 89,
    colors: ["White", "Black"],
    sizes: ["S", "M", "L"],
    category: "Athletic",
    material: "Polyester Blend"
  },
  {
    id: 4,
    name: "Business Dress Socks",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1641482847237-e64ca2769a8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmVzcyUyMHNvY2tzJTIwZWxlZ2FudHxlbnwxfHx8fDE3NjE4ODcyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    reviews: 124,
    colors: ["Black", "Navy", "Brown"],
    sizes: ["M", "L"],
    category: "Dress",
    material: "Cotton Blend"
  },
  {
    id: 5,
    name: "Cozy Home Comfort Socks",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1739640081476-fd55589f8838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwZnV6enklMjBzb2Nrc3xlbnwxfHx8fDE3NjIxOTExNzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviews: 178,
    badge: "Popular",
    colors: ["Pink", "Gray", "Cream"],
    sizes: ["S", "M", "L"],
    category: "Cozy",
    material: "Fleece"
  },
  {
    id: 6,
    name: "Colorful Pattern Mix Pack",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1759782178780-6b6c54dd42a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXR0ZXJuZWQlMjBjb2xvcmZ1bCUyMHNvY2tzfGVufDF8fHx8MTc2MjE5MTE2OXww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviews: 267,
    badge: "Bundle",
    colors: ["Multi", "Rainbow"],
    sizes: ["M", "L"],
    category: "Casual",
    material: "Cotton"
  },
  {
    id: 7,
    name: "Compression Athletic Socks",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1640025867572-f6b3a8410c81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wcmVzc2lvbiUyMGF0aGxldGljJTIwc29ja3N8ZW58MXx8fHwxNzYyMTkxMTY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    reviews: 145,
    colors: ["Black", "Blue"],
    sizes: ["S", "M", "L", "XL"],
    category: "Athletic",
    material: "Compression Fabric"
  },
  {
    id: 8,
    name: "Merino Wool Hiking Socks",
    price: 26.99,
    image: "https://images.unsplash.com/photo-1730449989570-23aef9239e07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwd29vbCUyMHNvY2tzfGVufDF8fHx8MTc2MTg4NzI3NXww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviews: 187,
    badge: "New",
    colors: ["Brown", "Green", "Gray"],
    sizes: ["M", "L", "XL"],
    category: "Athletic",
    material: "Merino Wool"
  },
  {
    id: 9,
    name: "Formal Executive Socks",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1641482847237-e64ca2769a8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmVzcyUyMHNvY2tzJTIwZWxlZ2FudHxlbnwxfHx8fDE3NjE4ODcyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5,
    reviews: 98,
    colors: ["Black", "Charcoal"],
    sizes: ["M", "L"],
    category: "Dress",
    material: "Bamboo"
  },
  {
    id: 10,
    name: "Striped Fashion Crew",
    price: 15.99,
    originalPrice: 21.99,
    image: "https://images.unsplash.com/photo-1615486364462-ef6363adbc18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJpcGVkJTIwc29ja3MlMjBmYXNoaW9ufGVufDF8fHx8MTc2MjE5MTE2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    reviews: 112,
    badge: "Sale",
    colors: ["Navy", "Red", "Green"],
    sizes: ["S", "M", "L"],
    category: "Casual",
    material: "Cotton"
  },
  {
    id: 11,
    name: "Ankle Sports Pack",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1760177379331-a8b4311db4a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHNwb3J0cyUyMHNvY2tzfGVufDF8fHx8MTc2MTg4NzI3NXww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviews: 223,
    badge: "Popular",
    colors: ["White", "Black", "Gray"],
    sizes: ["S", "M", "L"],
    category: "Athletic",
    material: "Polyester Blend"
  },
  {
    id: 12,
    name: "Fuzzy Bedroom Socks",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1739640081476-fd55589f8838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwZnV6enklMjBzb2Nrc3xlbnwxfHx8fDE3NjIxOTExNzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviews: 291,
    colors: ["Cream", "Pink", "Lavender"],
    sizes: ["One Size"],
    category: "Cozy",
    material: "Fleece"
  }
];

interface CollectionPageProps {
  collectionName: string;
  onAddToCart: (product: Product) => void;
}

const CollectionPage = ({ collectionName, onAddToCart }: CollectionPageProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 50]);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Get unique values for filters
  const categories = Array.from(new Set(allProducts.map(p => p.category)));
  const allColors = Array.from(new Set(allProducts.flatMap(p => p.colors)));
  const allSizes = Array.from(new Set(allProducts.flatMap(p => p.sizes)));
  const materials = Array.from(new Set(allProducts.map(p => p.material)));

  // Filter products
  let filteredProducts = allProducts.filter(product => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const colorMatch = selectedColors.length === 0 || product.colors.some(c => selectedColors.includes(c));
    const sizeMatch = selectedSizes.length === 0 || product.sizes.some(s => selectedSizes.includes(s));
    const materialMatch = selectedMaterials.length === 0 || selectedMaterials.includes(product.material);
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];

    return categoryMatch && colorMatch && sizeMatch && materialMatch && priceMatch;
  });

  // Sort products
  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "newest") {
    filteredProducts = [...filteredProducts].filter(p => p.badge === "New");
  }

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleFilter = (value: string, filterArray: string[], setFilter: (arr: string[]) => void) => {
    if (filterArray.includes(value)) {
      setFilter(filterArray.filter(item => item !== value));
    } else {
      setFilter([...filterArray, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedMaterials([]);
    setPriceRange([0, 50]);
  };

  const activeFiltersCount = selectedCategories.length + selectedColors.length + selectedSizes.length + selectedMaterials.length;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-gray-900 mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map(category => (
            <div key={category} className="flex items-center">
              <Checkbox
                id={`cat-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleFilter(category, selectedCategories, setSelectedCategories)}
              />
              <label htmlFor={`cat-${category}`} className="ml-2 text-gray-700 cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="text-gray-900 mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={50}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Sizes */}
      <div>
        <h3 className="text-gray-900 mb-4">Size</h3>
        <div className="flex flex-wrap gap-2">
          {allSizes.map(size => (
            <Button
              key={size}
              variant={selectedSizes.includes(size) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFilter(size, selectedSizes, setSelectedSizes)}
              className={selectedSizes.includes(size) ? "bg-purple-600 hover:bg-purple-700" : ""}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Colors */}
      <div>
        <h3 className="text-gray-900 mb-4">Colors</h3>
        <div className="space-y-3">
          {allColors.slice(0, 8).map(color => (
            <div key={color} className="flex items-center">
              <Checkbox
                id={`color-${color}`}
                checked={selectedColors.includes(color)}
                onCheckedChange={() => toggleFilter(color, selectedColors, setSelectedColors)}
              />
              <label htmlFor={`color-${color}`} className="ml-2 text-gray-700 cursor-pointer">
                {color}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Materials */}
      <div>
        <h3 className="text-gray-900 mb-4">Material</h3>
        <div className="space-y-3">
          {materials.map(material => (
            <div key={material} className="flex items-center">
              <Checkbox
                id={`mat-${material}`}
                checked={selectedMaterials.includes(material)}
                onCheckedChange={() => toggleFilter(material, selectedMaterials, setSelectedMaterials)}
              />
              <label htmlFor={`mat-${material}`} className="ml-2 text-gray-700 cursor-pointer">
                {material}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Collection Banner */}
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-b">
        <div className="container mx-auto px-4 py-12">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <a href="/" className="flex items-center text-gray-600 hover:text-purple-600">
                  <Home className="h-4 w-4" />
                </a>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-900">{collectionName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <h1 className="text-gray-900 mb-4">{collectionName} Collection</h1>
          <p className="text-gray-600 max-w-2xl">
            Explore our curated selection of premium socks designed for comfort, style, and durability.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-900">Filters</h2>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                    Clear All
                  </Button>
                )}
              </div>
              <ScrollArea className="h-[calc(100vh-200px)]">
                <FilterContent />
              </ScrollArea>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge className="ml-2 bg-purple-600">{activeFiltersCount}</Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="h-[calc(100vh-100px)] mt-6">
                      <FilterContent />
                    </ScrollArea>
                    {activeFiltersCount > 0 && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <Button className="w-full" variant="outline" onClick={clearAllFilters}>
                          Clear All Filters
                        </Button>
                      </div>
                    )}
                  </SheetContent>
                </Sheet>

                <p className="text-gray-600">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </p>
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map(cat => (
                  <Badge key={cat} variant="secondary" className="gap-1">
                    {cat}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                    />
                  </Badge>
                ))}
                {selectedColors.map(color => (
                  <Badge key={color} variant="secondary" className="gap-1">
                    {color}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => toggleFilter(color, selectedColors, setSelectedColors)}
                    />
                  </Badge>
                ))}
                {selectedSizes.map(size => (
                  <Badge key={size} variant="secondary" className="gap-1">
                    {size}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => toggleFilter(size, selectedSizes, setSelectedSizes)}
                    />
                  </Badge>
                ))}
                {selectedMaterials.map(mat => (
                  <Badge key={mat} variant="secondary" className="gap-1">
                    {mat}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => toggleFilter(mat, selectedMaterials, setSelectedMaterials)}
                    />
                  </Badge>
                ))}
              </div>
            )}

            {/* Products Grid */}
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                <Button onClick={clearAllFilters} variant="outline" className="mt-4">
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => (
                    <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all">
                      <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <img
                          src={product.image}
                          alt={product.name}
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
                          onClick={() => onAddToCart(product)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>

                      <CardContent className="p-4 space-y-3">
                        <h3 className="text-gray-900 line-clamp-2">{product.name}</h3>

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
                            <span className="text-gray-900">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-gray-500 line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-12">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "bg-purple-600 hover:bg-purple-700" : ""}
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionPage;
