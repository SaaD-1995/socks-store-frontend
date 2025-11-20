import { motion } from "motion/react";
import { 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import productApi from '../../api/productApi';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

import React, { useEffect, useState } from "react";

function AdminDashboard() {
  const { totalProducts } = productApi;
  const [productCount, setProductCount] = useState<number>(0);

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const response = await totalProducts();
        setProductCount(
         response.data
        );
      } catch {
        setProductCount(0);
      }
    };
    fetchTotalProducts();
  }, [totalProducts]);

  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+12.5%",
      trend: "up",
      icon: ShoppingCart,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Total Products",
      value: productCount,
      change: "+5.2%",
      trend: "up",
      icon: Package,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Total Customers",
      value: "2,345",
      change: "+8.3%",
      trend: "up",
      icon: Users,
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const salesData = [
    { month: "Jan", sales: 4000, orders: 240 },
    { month: "Feb", sales: 3000, orders: 220 },
    { month: "Mar", sales: 5000, orders: 290 },
    { month: "Apr", sales: 4500, orders: 270 },
    { month: "May", sales: 6000, orders: 310 },
    { month: "Jun", sales: 5500, orders: 300 },
    { month: "Jul", sales: 7000, orders: 350 }
  ];

  const categoryData = [
    { name: "Athletic", value: 35, color: "#8b5cf6" },
    { name: "Casual", value: 30, color: "#ec4899" },
    { name: "Dress", value: 20, color: "#3b82f6" },
    { name: "Cozy", value: 15, color: "#f59e0b" }
  ];

  const recentOrders = [
    { id: "#12345", customer: "John Doe", product: "Athletic Socks", amount: "$24.99", status: "Delivered" },
    { id: "#12346", customer: "Jane Smith", product: "Dress Socks", amount: "$19.99", status: "Processing" },
    { id: "#12347", customer: "Mike Johnson", product: "Cozy Socks", amount: "$14.99", status: "Shipped" },
    { id: "#12348", customer: "Sarah Williams", product: "Casual Socks", amount: "$12.99", status: "Delivered" },
    { id: "#12349", customer: "Tom Brown", product: "Wool Socks", amount: "$24.99", status: "Processing" }
  ];

  return (
    <>
        <div className="space-y-8">
        {/* Header */}
        <div>
            <h1 className="mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
            
            return (
                <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                        <div>
                        <p className="text-gray-600 mb-1">{stat.title}</p>
                        <h2 className="mb-2">{stat.value}</h2>
                        <div className="flex items-center gap-1 text-green-600">
                            <TrendIcon className="h-4 w-4" />
                            <span>{stat.change}</span>
                        </div>
                        </div>
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                        <Icon className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    </CardContent>
                </Card>
                </motion.div>
            );
            })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Chart */}
            <Card className="border-0 shadow-lg">
            <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip />
                    <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ fill: "#8b5cf6", r: 4 }}
                    />
                </LineChart>
                </ResponsiveContainer>
            </CardContent>
            </Card>

            {/* Orders Chart */}
            <Card className="border-0 shadow-lg">
            <CardHeader>
                <CardTitle>Orders by Month</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip />
                    <Bar dataKey="orders" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                    </defs>
                </BarChart>
                </ResponsiveContainer>
            </CardContent>
            </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Category Distribution */}
            <Card className="border-0 shadow-lg">
            <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${percent !== undefined ? (percent * 100).toFixed(0) : "0"}%`}
                    >
                    {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
                </ResponsiveContainer>
            </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card className="border-0 shadow-lg lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="ghost" size="sm">
                View All
                <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between pb-4 border-b last:border-0">
                    <div>
                        <p className="text-gray-900">{order.id}</p>
                        <p className="text-gray-500">{order.customer} • {order.product}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-900">{order.amount}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "Delivered" ? "bg-green-100 text-green-700" :
                        order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                        "bg-yellow-100 text-yellow-700"
                        }`}>
                        {order.status}
                        </span>
                    </div>
                    </div>
                ))}
                </div>
            </CardContent>
            </Card>
        </div>
        </div>
    </>
  );
}

export default AdminDashboard;
