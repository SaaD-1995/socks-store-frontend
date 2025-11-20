import { useEffect, useState} from "react";
import { motion } from "motion/react";
import { Plus, Pencil, Trash2, Search, Filter } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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
type SocksType = "male" | "female" | "kids";
interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  stock: number;
  images: string[];
  status: boolean;
  socksType: SocksType;
  description?: string;
}

export function AdminProducts() {
  const {getAllProducts, createProduct} = productApi;
  const [products, setProducts] = useState<Product[]>([
    // {
    //   id: 1,
    //   name: "Classic Striped Crew Socks",
    //   category: "Casual",
    //   price: 12.99,
    //   stock: 150,
    //   image: "https://images.unsplash.com/photo-1615486364462-ef6363adbc18?w=100",
    //   status: "Active",
    //   socksType: "male"
    // },
    // {
    //   id: 2,
    //   name: "Premium Wool Winter Socks",
    //   category: "Cozy",
    //   price: 24.99,
    //   stock: 89,
    //   image: "https://images.unsplash.com/photo-1647549897410-3583914a7961?w=100",
    //   status: "Active",
    //   socksType: "female"
    // },
    // {
    //   id: 3,
    //   name: "Athletic Performance Socks",
    //   category: "Athletic",
    //   price: 16.99,
    //   stock: 200,
    //   image: "https://images.unsplash.com/photo-1608357746078-342b38f738c1?w=100",
    //   status: "Active",
    //   socksType: "kids"
    // },
    // {
    //   id: 4,
    //   name: "Business Dress Socks",
    //   category: "Dress",
    //   price: 19.99,
    //   stock: 120,
    //   image: "https://images.unsplash.com/photo-1641482847237-e64ca2769a8c?w=100",
    //   status: "Draft",
    //   socksType: "male"
    // }
  ]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data);
      console.log("Fetched products:", response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
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
  const normalized = value.toLowerCase() as SocksType; // "male", "female", "kids"
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { 
              ...p, 
              ...formData, 
              price: parseFloat(formData.price), 
              stock: parseInt(formData.stock),
              socksType: (formData.socksType as string).toLowerCase() as SocksType,
              status: formData.status === "Active" ? true : false
            }
          : p
      ));
      toast.success("Product updated successfully!");
    } else {
      // Add new product
      const newProduct: Omit<Product, "id"> = {
        title: formData.title,
        category: formData.category,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        images: formData.image ? [formData.image] : [""],
        status: formData.status === "Active" ? true : false,
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
      description: "",
      status: product.status === true ? "Active" : "Draft", 
      socksType: product.socksType.charAt(0).toUpperCase() + product.socksType.slice(1) as "Male" | "Female" | "Kids"
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
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

                <div>
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

                <div>
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

                <div>
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

                <div>
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

                <div className="md:col-span-2">
                  <label htmlFor="image">Image URL</label>
                  <input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1.5 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-600 focus:ring-purple-600"
                  />
                </div>

                <div className="md:col-span-2">
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
                onChange={(e) => setSearchQuery(e.target.value)}
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
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <span>{product.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={product.stock < 50 ? "text-red-600" : "text-gray-900"}>
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.status === true ? "default" : "secondary"}>
                        {product.status === true ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
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
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default AdminProducts;