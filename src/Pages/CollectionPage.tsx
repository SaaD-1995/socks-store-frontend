"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { Slider } from "../ui/silder";
import { Checkbox } from "../ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SlidersHorizontal, X, Home } from "lucide-react";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import productApi from '../api/productApi';
import Spinner from "../ui/Spinner";
import { toast } from "react-toastify";
import ProductCard from "../components/products/ProductCard";

interface Product {
  _id: string;
  title: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating?: number;
  // reviews: number;
  badge: string;
  colors: string[];
  sizes: string[];
  category: string;
  material: string;
}


const CollectionPage = () => {
  const {getAllProducts} = productApi;
  // const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  // const [cart, setCart] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 50]);
  const [sortBy, setSortBy] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  // Fetch products (in real app, fetch from API)
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllProducts(page, pageSize);
      setAllProducts(response.data.products);
      setPage(response.data.currentPage);
      setTotalItems(response.data.totalItems);
      console.log(response.data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
    finally {      
      setLoading(false);
    }
  }, [getAllProducts, page, pageSize]);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
  console.log("Filtered Products:", filteredProducts);
  // Sort products
  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  } else if (sortBy === "newest") {
    filteredProducts = [...filteredProducts].filter(p => p.badge === "New");
  }else if (sortBy === "featured") {
    filteredProducts = [...filteredProducts].filter(p => p.badge === "Featured");
  }
  else {
    // "all" or default
    filteredProducts = [...filteredProducts];
    console.log("All products shown");
  }

  // Pagination
  const totalPages = Math.ceil(allProducts.length / pageSize);

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
          {materials.map((material, index) => (
            <div key={`${material}-${index}`} className="flex items-center">
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
const addToCart = (product: any) => {
  // Show toast when product is added to cart — accept any shape to match ProductCard's product type
  toast.success(`${product.name ?? product.title} added to cart!`);
};


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
                <BreadcrumbPage className="text-gray-900"></BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <h1 className="text-gray-900 mb-4">Collection</h1>
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
                  <SelectItem value="all">All</SelectItem>
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
            {loading ? (
              <div className="flex justify-center items-center py-16">
              <Spinner size={48} color="blue" />
              </div>
            ) : 
            (allProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                <Button onClick={clearAllFilters} variant="outline" className="mt-4">
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {allProducts.map((product, index) => (
                   <ProductCard 
                    key={product._id}
                    product={{
                        _id: product._id,
                        title: product.title,
                        images: product.images,
                        price: product.price,
                        rating: product.rating ?? 0,
                        // ProductCard expects `reviews` and `materials` (plural),
                        // map from our product payload to those fields:
                        reviews: (product as any).reviews ?? 0,
                        originalPrice: product.originalPrice,
                        badge: product.badge ?? undefined,
                        colors: product.colors ?? undefined,
                        materials: product.material ? [product.material] : undefined,
                    }}
                    index={index}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {/* {totalPages > 1 && ( */}
                  <div className="flex justify-center gap-2 mt-12">
                    <Button
                      variant="outline"
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      disabled={page === 1}
                    >
                      Previous
                    </Button>
                   <div className="flex items-center space-x-1 [&>.active]:bg-gray-100 dark:[&>.active]:bg-neutral-700">
                        {Array.from({ length: Math.ceil(totalItems / pageSize) }, (_, i) => i + 1).map((pageNumber) => (
                          <Button 
                            variant={pageNumber === page ? "outline" : "ghost"}
                            key={pageNumber}
                            onClick={() => setPage(pageNumber)}
                            >
                            <span
                              className={`flex justify-center items-center  ${pageNumber === page ? 'active' : ''}`}
                            >
                              {pageNumber}
                            </span>
                          </Button>
                        ))}
                      </div>
                    <Button
                      variant="outline"
                      onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={page >= Math.ceil(totalItems / pageSize)}
                    >
                      Next
                    </Button>
                  </div>
                {/* )} */}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionPage;
