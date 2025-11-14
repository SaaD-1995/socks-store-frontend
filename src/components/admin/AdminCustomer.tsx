import { useState } from "react";
import { motion } from "motion/react";
import { Search, Mail, Phone, MapPin, ShoppingBag } from "lucide-react";
// import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback } from "../../ui/avatar";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalOrders: number;
  totalSpent: number;
  status: "Active" | "Inactive";
  joinDate: string;
}

export function AdminCustomers() {
  const [customers] = useState<Customer[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      totalOrders: 15,
      totalSpent: 450.25,
      status: "Active",
      joinDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 (555) 234-5678",
      location: "Los Angeles, CA",
      totalOrders: 8,
      totalSpent: 290.50,
      status: "Active",
      joinDate: "2024-02-20"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 (555) 345-6789",
      location: "Chicago, IL",
      totalOrders: 22,
      totalSpent: 780.90,
      status: "Active",
      joinDate: "2023-11-10"
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@example.com",
      phone: "+1 (555) 456-7890",
      location: "Houston, TX",
      totalOrders: 5,
      totalSpent: 150.75,
      status: "Active",
      joinDate: "2024-03-05"
    },
    {
      id: 5,
      name: "Tom Brown",
      email: "tom@example.com",
      phone: "+1 (555) 567-8901",
      location: "Phoenix, AZ",
      totalOrders: 3,
      totalSpent: 95.40,
      status: "Inactive",
      joinDate: "2024-01-28"
    },
    {
      id: 6,
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "+1 (555) 678-9012",
      location: "Philadelphia, PA",
      totalOrders: 12,
      totalSpent: 520.30,
      status: "Active",
      joinDate: "2024-02-14"
    },
    {
      id: 7,
      name: "David Wilson",
      email: "david@example.com",
      phone: "+1 (555) 789-0123",
      location: "San Antonio, TX",
      totalOrders: 18,
      totalSpent: 640.80,
      status: "Active",
      joinDate: "2023-12-20"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { 
      label: "Total Customers", 
      value: customers.length, 
      color: "from-purple-500 to-pink-500" 
    },
    { 
      label: "Active Customers", 
      value: customers.filter(c => c.status === "Active").length, 
      color: "from-green-500 to-emerald-500" 
    },
    { 
      label: "Total Revenue", 
      value: `$${customers.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(2)}`, 
      color: "from-blue-500 to-cyan-500" 
    },
    { 
      label: "Avg Order Value", 
      value: `$${(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.reduce((sum, c) => sum + c.totalOrders, 0)).toFixed(2)}`, 
      color: "from-orange-500 to-red-500" 
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Customers Management</h1>
        <p className="text-gray-600">View and manage your customer database</p>
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
                <h2 className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </h2>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <Card className="border-0 shadow">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              placeholder="Search by name, email, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 rounded border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>All Customers ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer, index) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                            {getInitials(customer.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-gray-900">{customer.name}</p>
                          <p className="text-gray-500">ID: #{customer.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="h-3 w-3" />
                          <span>{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="h-3 w-3" />
                          <span>{customer.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{customer.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4 text-purple-600" />
                        <span>{customer.totalOrders}</span>
                      </div>
                    </TableCell>
                    <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={customer.status === "Active" ? "default" : "secondary"}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(customer.joinDate).toLocaleDateString()}</TableCell>
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
export default AdminCustomers;