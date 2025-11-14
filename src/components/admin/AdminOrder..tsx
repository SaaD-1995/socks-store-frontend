import { useState } from "react";
import { motion } from "motion/react";
import { Search, Filter, Eye, Download } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TablePagination
} from "../../ui/table";
import { Badge } from "../../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface Order {
  id: string;
  customer: string;
  email: string;
  products: string;
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
  paymentMethod: string;
}
function AdminOrders() {
  const [orders] = useState<Order[]>([
    {
      id: "#ORD-12345",
      customer: "John Doe",
      email: "john@example.com",
      products: "Athletic Socks (x2), Dress Socks (x1)",
      total: 54.97,
      status: "Delivered",
      date: "2024-11-10",
      paymentMethod: "Credit Card"
    },
    {
      id: "#ORD-12346",
      customer: "Jane Smith",
      email: "jane@example.com",
      products: "Cozy Socks (x3)",
      total: 44.97,
      status: "Shipped",
      date: "2024-11-12",
      paymentMethod: "PayPal"
    },
    {
      id: "#ORD-12347",
      customer: "Mike Johnson",
      email: "mike@example.com",
      products: "Premium Wool Socks (x1)",
      total: 24.99,
      status: "Processing",
      date: "2024-11-13",
      paymentMethod: "Credit Card"
    },
    {
      id: "#ORD-12348",
      customer: "Sarah Williams",
      email: "sarah@example.com",
      products: "Casual Socks (x4), Athletic Socks (x2)",
      total: 85.94,
      status: "Pending",
      date: "2024-11-14",
      paymentMethod: "Apple Pay"
    },
    {
      id: "#ORD-12349",
      customer: "Tom Brown",
      email: "tom@example.com",
      products: "Dress Socks (x2)",
      total: 39.98,
      status: "Cancelled",
      date: "2024-11-11",
      paymentMethod: "Credit Card"
    },
    {
      id: "#ORD-12350",
      customer: "Emily Davis",
      email: "emily@example.com",
      products: "Athletic Performance Socks (x3)",
      total: 50.97,
      status: "Delivered",
      date: "2024-11-09",
      paymentMethod: "Debit Card"
    },
    {
      id: "#ORD-12351",
      customer: "David Wilson",
      email: "david@example.com",
      products: "Cozy Home Socks (x2), Wool Socks (x1)",
      total: 54.97,
      status: "Shipped",
      date: "2024-11-13",
      paymentMethod: "PayPal"
    },
        {
      id: "#ORD-12351",
      customer: "David Wilson",
      email: "david@example.com",
      products: "Cozy Home Socks (x2), Wool Socks (x1)",
      total: 54.97,
      status: "Shipped",
      date: "2024-11-13",
      paymentMethod: "PayPal"
    },
        {
      id: "#ORD-12351",
      customer: "David Wilson",
      email: "david@example.com",
      products: "Cozy Home Socks (x2), Wool Socks (x1)",
      total: 54.97,
      status: "Shipped",
      date: "2024-11-13",
      paymentMethod: "PayPal"
    },
        {
      id: "#ORD-12351",
      customer: "David Wilson",
      email: "david@example.com",
      products: "Cozy Home Socks (x2), Wool Socks (x1)",
      total: 54.97,
      status: "Shipped",
      date: "2024-11-13",
      paymentMethod: "PayPal"
    },
        {
      id: "#ORD-12351",
      customer: "David Wilson",
      email: "david@example.com",
      products: "Cozy Home Socks (x2), Wool Socks (x1)",
      total: 54.97,
      status: "Shipped",
      date: "2024-11-13",
      paymentMethod: "PayPal"
    },
        {
      id: "#ORD-12351",
      customer: "David Wilson",
      email: "david@example.com",
      products: "Cozy Home Socks (x2), Wool Socks (x1)",
      total: 54.97,
      status: "Shipped",
      date: "2024-11-13",
      paymentMethod: "PayPal"
    },
    
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      case "Pending":
        return "bg-orange-100 text-orange-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: "Total Orders", value: orders.length, color: "from-purple-500 to-pink-500" },
    { label: "Pending", value: orders.filter(o => o.status === "Pending").length, color: "from-orange-500 to-red-500" },
    { label: "Processing", value: orders.filter(o => o.status === "Processing").length, color: "from-yellow-500 to-orange-500" },
    { label: "Delivered", value: orders.filter(o => o.status === "Delivered").length, color: "from-green-500 to-emerald-500" }
  ];
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="mb-2">Orders Management</h1>
          <p className="text-gray-600">Track and manage customer orders</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Orders
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-0 shadow">
              <CardContent className="p-6">
                <p className="text-gray-600 mb-1">{stat.label}</p>
                <div className="flex items-center gap-3">
                  <h2 className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </h2>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                placeholder="Search by order ID, customer name, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-600 focus:ring-purple-600"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>All Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b"
                  >
                    <TableCell>{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-gray-900">{order.customer}</p>
                        <p className="text-gray-500">{order.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{order.products}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Order Details</DialogTitle>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-gray-600">Order ID</p>
                                  <p className="text-gray-900">{selectedOrder.id}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Status</p>
                                  <Badge className={getStatusColor(selectedOrder.status)}>
                                    {selectedOrder.status}
                                  </Badge>
                                </div>
                                <div>
                                  <p className="text-gray-600">Customer Name</p>
                                  <p className="text-gray-900">{selectedOrder.customer}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Email</p>
                                  <p className="text-gray-900">{selectedOrder.email}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Order Date</p>
                                  <p className="text-gray-900">{new Date(selectedOrder.date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Payment Method</p>
                                  <p className="text-gray-900">{selectedOrder.paymentMethod}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-gray-600 mb-2">Products</p>
                                <p className="text-gray-900">{selectedOrder.products}</p>
                              </div>
                              <div className="pt-4 border-t">
                                <div className="flex justify-between">
                                  <span>Total Amount</span>
                                  <span className="text-gray-900">${selectedOrder.total.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </motion.tr>
                ))}
            
              </TableBody>
                  <TablePagination 
                    totalItems={filteredOrders.length}
                    page={page}
                    pageSize={pageSize}
                    onPageChange={setPage}
                    onPageSizeChange={setPageSize}
                    className="mt-4 w-full"
                />
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default AdminOrders;