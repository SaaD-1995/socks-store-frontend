import { Link, Route, Routes,useLocation  } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Image as ImageIcon, 
  ShoppingCart, 
  Users, 
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "../../ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import AdminDashboard from "../../components/admin/AdminDashboard";
import { AdminProducts } from "../../components/admin/AdminProduct";
import AdminSliders from "../../components/admin/AdminSilder";
import AdminOrders from "../../components/admin/AdminOrder.";
import { AdminCustomers } from "../../components/admin/AdminCustomer";
import AdminSettings from "../../components/admin/AdminSetting";
import AdminLoginPage  from "./AdminLoginPage";
import AdminSignUpPage  from "./AdminSignUpPage";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === "/admin/login"; 
  const isRegisterPage = location.pathname === "/admin/register";

  // If on login or register page, return ONLY login or register screen
  if (isLoginPage || isRegisterPage) {
    return (
      <main className="min-h-screen">
        <Routes>
          <Route path="/login" element={<AdminLoginPage />} />
          <Route path="/register" element={<AdminSignUpPage />} />
        </Routes>
      </main>
    );
  }
  const menuItems = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/products", label: "Products", icon: Package },
    { to: "/admin/sliders", label: "Sliders", icon: ImageIcon },
    { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { to: "/admin/customers", label: "Customers", icon: Users },
    { to: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        {/* <h2 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          SockShop Admin
        </h2> */}
        <Link to="/admin">
          <img src="logo2.png" alt="capri Logo" className="w-[75px] md:w-28" />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Sidebar */}
      
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed left-0 top-0 h-full w-64 bg-white border-r z-50 lg:z-30"
          >
            <div className="p-6">
              {/* <h2 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                SockShop Admin
              </h2> */}
              <Link to="/">
                <img src="logo2.png" alt="capri Logo" className="w-[75px] md:w-28" />
              </Link>
            </div>

            <nav className="px-3 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => {
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => {
                  // Handle logout logic here

                }}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-64">
        <main className="p-4 lg:p-8">
          <Routes>
            <Route path="" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="sliders" element={<AdminSliders />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
export default AdminLayout;