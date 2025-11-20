import { useEffect, useState} from "react";
import debounce from "lodash.debounce";
import { motion } from "motion/react";
import { Plus, Pencil, Trash2, Search, Filter, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  // TableFooterPagination,
  TableFooter,
} from "../../ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Badge } from "../../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { toast } from "sonner";
import productApi from "../../api/productApi";
import Spinner from "../../ui/Spinner";

type SocksType = "male" | "female" | "kids";
interface Product {
 _id: string;
  title: string;
  category: string;
  price: number;
  stock: number;
  images: string[];
  status: boolean;
  socksType: SocksType;
  description: string;
}

export function AdminProducts() {
  const {getAllProducts, createProduct, updateProduct, deleteProduct} = productApi;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    fetchProducts();
  }, [page, pageSize]);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getAllProducts(page, pageSize);
      setTimeout(() => {
      setProducts(response.data.products);
      setTotalItems(response.data.totalProducts);
      }, 1000);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
    finally {
      setLoading(false);
    }
  };
   const [formData, setFormData] = useState({
    title: "",
    category: "Casual",
    price: "",  
    stock: "",
    image: "",
    description: "",
    status: true ? "Active" : "Draft",
    socksType: "Male" as "Male" | "Female" | "Kids"
  });
  // const socksType = ["Male", "Female", "Kids"];
  const categories =  [
    { name: "Casual", type: ["male", "female", "kids"] },
    { name: "Athletic", type: ["male", "female", "kids"] },
    { name: "Dress", type: ["male", "female"] },
    { name: "Cozy", type: ["kids"] },
    { name: "Formal", type: ["male", "female"] },
    { name: "Outdoor", type: ["male", "female", "kids"] },
    { name: "sports", type: ["male", "female", "kids"] }
  ];
  const handleSocksTypeChange = (value: string) => {
  setFormData({
    ...formData,
    socksType: value as "Male" | "Female" | "Kids", // store original casing for Select
    category: "" // reset category when type changes
  });
};

// Filter categories based on normalized socksType
const getCategoriesByUser = (socksType: "Male" | "Female" | "Kids") => {
  const normalized = socksType.toLowerCase() as SocksType;
  return categories
    .filter(cat => cat.type.includes(normalized))
    .map(cat => cat.name);
};
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const searchProducts = async (query: string) => {
    try {
      const response = await productApi.searchProducts(query);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Failed to search products:", error);
    }
  };
  debounce(searchProducts, 500);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      setProducts(products.map(p => 
        p._id === editingProduct._id 
          ? { 
              ...p, 
              ...formData, 
              price: formData.price ? parseFloat(formData.price) : p.price, 
              stock: formData.stock ? parseInt(formData.stock) : p.stock,
              socksType: formData.socksType === "Male" ? "male" : formData.socksType === "Female" ? "female" : "kids",
              status: formData.status === "Active" ? true : false
            }
          : p
      ));
      // Update existing product
      const updatedProduct: Product = {
        _id: editingProduct._id,
        title: formData.title,
        category: formData.category,
        price: formData.price ? parseFloat(formData.price) : 0,
        stock: formData.stock ? parseInt(formData.stock) : 0,
        description: formData.description,
        status: formData.status === "Active" ? true : false,
        socksType: formData.socksType === "Male" ? "male" : formData.socksType === "Female" ? "female" : "kids",
        images: formData.image ? [formData.image] : [""]
      };
      const response = await updateProduct(editingProduct._id, updatedProduct);
      if (response && response.data) {
        setProducts(products.map(p => p._id === editingProduct._id ? response.data : p));
      }
      alert('Product updated successfully!');
      toast.success("Product updated successfully!");
    } else {
      // Add new product
      const newProduct: Omit<Product, "_id"> = {
        title: formData.title,
        category: formData.category,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        images: formData.image ? [formData.image] : [""],
        status: formData.status === "Active" ? true : false,
        description: formData.description,
        socksType: (formData.socksType as string).toLowerCase() as SocksType 
      };
      const response = await createProduct(newProduct);
      if (response && response.data) {
       try {
        setProducts([...products, response.data]);
       } catch (error) {
        console.error("Failed to add product:", error);
       }
      }
      toast.success("Product added successfully!");
      alert('Product created successfully!');
      fetchProducts();
    }
    
    resetForm();
    setDialogOpen(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      image: product.images[0] || "",
      description: product.description,
      status: product.status === true ? "Active" : "Draft", 
      socksType: product.socksType === "male" ? "Male" : product.socksType === "female" ? "Female" : "Kids"
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    setProducts(products.filter(p => p._id !== id));
    toast.success("Product deleted successfully!");
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "Casual",
      price: "",
      stock: "",
      image: "",
      description: "",
      status: "Active",
      socksType: "Male"
    });
    setEditingProduct(null);
  };
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const onNextPage = () => {
    setPage((prev) => prev + 1);
    fetchProducts();
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="mb-2">Products Management</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label htmlFor="name">Product Name</label>
                  <input
                    id="name"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter product name"
                    required
                    className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-600 focus:ring-purple-600"
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="socksType">Type</label>
                  <Select value={formData.socksType} onValueChange={handleSocksTypeChange}>
                    <SelectTrigger className="mt-1.5 w-full">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Kids">Kids</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-1 col-span-2">
                  <label htmlFor="category">Category</label>
                  <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCategoriesByUser(formData.socksType).map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                </div>

                <div className="md:col-span-1 col-span-2">
                  <label htmlFor="status">Status</label>
                  <Select value={formData.status} onValueChange={(value: "Active" | "Draft") => setFormData({ ...formData, status: value })}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-1 col-span-2">
                  <label htmlFor="price">Price (Rs)</label>
                  <input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    required
                    className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-600 focus:ring-purple-600"
                  />
                </div>

                <div className="md:col-span-1 col-span-2">
                  <label htmlFor="stock">Stock Quantity</label>
                  <input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="0"
                    required
                    className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-600 focus:ring-purple-600"
                  />
                </div>

                <div className="md:col-span-2 col-span-2">
                  <label htmlFor="image">Image URL</label>
                  <input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-600 focus:ring-purple-600"
                  />
                </div>

                <div className="md:col-span-2 col-span-2">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter product description"
                    rows={3}
                    className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-600 focus:ring-purple-600"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  {editingProduct ? "Update Product" : "Add Product"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  searchProducts(e.target.value);
                }}
                className="pl-9 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-600 focus:ring-purple-600"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>All Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col" data-hs-datatable='{
                "pageLength": 10,
                "pagingOptions": {
                  "pageBtnClasses": "min-w-10 flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:focus:bg-neutral-700 dark:hover:bg-neutral-700"
                }
              }'>
                  <div className="min-h-130 overflow-x-auto">
                    <div className="min-w-full inline-block align-middle">
                      <div className="overflow-hidden">
                        <table className="min-w-full">
                          <thead className="border-b border-gray-200 dark:border-neutral-700">
                            <tr>
                              <th scope="col" className="py-1 text-start font-normal">Product</th>
                              <th scope="col" className="py-1 text-start font-normal">Description</th>
                              <th scope="col" className="py-1 text-start font-normal">Category</th>
                              <th scope="col" className="py-1 text-start font-normal">Price</th>
                              <th scope="col" className="py-1 text-start font-normal">Stock</th>
                              <th scope="col" className="py-1 text-start font-normal">Status</th>
                              <th scope="col" className="text-right font-normal">Actions</th>
                            </tr>
                          </thead>

                          <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                            {
                              loading && (
                              <tr>
                                <td colSpan={7} className="text-center py-4">
                                  <Spinner />
                                </td>
                              </tr>
                              )
                            }
                            {filteredProducts.map((product, index) => (
                              <motion.tr
                                key={product._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="border-b"
                              >
                                <td className="p-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                    <div className="flex items-center gap-3">
                                        <img
                                          src={product.images[0]}
                                          alt={product.title}
                                          className="w-12 h-12 rounded-lg object-cover"
                                        />
                                        <span>{product.title}</span>
                                      </div>
                                </td>
                                <td className="p-3 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{product.description}</td>
                                <td className="p-3 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{product.category}</td>
                                <td className="p-3 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">${product.price.toFixed(2)}</td>
                                <td className="p-3 whitespace-nowrap text-sm font-medium">
                                    <span className={product.stock < 50 ? "text-red-600" : "text-gray-900"}>
                                      {product.stock}
                                    </span>
                                </td>
                                <td className="p-3 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                    <Badge variant={product.status === true ? "default" : "secondary"}>
                                      {product.status === true ? "Active" : "Inactive"}
                                    </Badge>
                                </td>
                                <td className="p-3 whitespace-nowrap text-end text-sm font-medium">
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleEdit(product)}
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleDelete(product._id)}
                                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                            {
                              filteredProducts.length === 0 && (
                                <tr>
                                  <td colSpan={7} className="text-center py-4">No products found.</td>
                                </tr>
                              )
                            }
                            </tbody>
                          </table>
                        </div>
                      </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 border-t pt-4">
                    <div className="w-full">
                      <span className="text-sm text-gray-600 dark:text-neutral-400">
                        Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, totalItems)} of {totalItems} results
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        className="rounded-full p-2.5 w-9 h-9"
                        disabled={page === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center space-x-1 [&>.active]:bg-gray-100 dark:[&>.active]:bg-neutral-700">
                        {Array.from({ length: Math.ceil(totalItems / pageSize) }, (_, i) => i + 1).map((pageNumber) => (
                          <Button 
                            variant={pageNumber === page ? "outline" : "ghost"}
                            key={pageNumber}>
                            <span
                              onClick={() => setPage(pageNumber)}
                              className={`flex justify-center items-center  ${pageNumber === page ? 'active' : ''}`}
                            >
                              {pageNumber}
                            </span>
                          </Button>
                        ))}
                      </div>
                      <Button 
                          variant="outline"
                          onClick={onNextPage}
                          className="rounded-full p-2.5 w-9 h-9"
                          disabled={page >= Math.ceil(totalItems / pageSize)}
                        >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
              </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default AdminProducts;