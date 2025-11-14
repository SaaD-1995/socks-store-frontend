import {  Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./Pages/HomePage";
import Footer from "./components/Footer";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import CollectionPage from "./Pages/CollectionPage";
import Error404Page  from "./Pages/Error404Page";
import OfferHeader from "./components/OfferHeader";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProtectedAdminRoute from "./Pages/Admin/ProtectedAdminRoute";
import AdminLayout from "./Pages/Admin/AdminLayout";
import { useState } from "react";
import AdminProducts from "./components/admin/AdminProduct";
// import ProductDetailPage from "./Pages/CollectionPage";
import AdminOrders from './components/admin/AdminOrder.';
import AdminSliders from "./components/admin/AdminSilder";
import AdminCustomers from "./components/admin/AdminCustomer";
import AdminSettings from "./components/admin/AdminSetting";
import LoginPage from "./Pages/LoginPage";
type AdminPage = "dashboard" | "products" | "sliders" | "orders" | "customers" | "settings";
function App() {
  const [adminPage, setAdminPage] = useState<AdminPage>("dashboard");
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    
    <>
    
      {!isAdminRoute && <OfferHeader />}
      {!isAdminRoute && <Header />}
      
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/collections" element={<CollectionPage  />} />
          {/* <Route path="/products/:id" element={<ProductDetailPage />} /> */}
          <Route path="/login" element={<LoginPage
  onLogin={() => {}} onNavigateToSignup={() => {}} onNavigateHome={() => {}}
  
           />} />
          <Route
            path="*"
            element={
             <Error404Page />
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout  
                  currentPage={adminPage}
                   onNavigate={(page) => setAdminPage(page as AdminPage)}
                  onLogout={() => {}}
      
                >
                  {adminPage === "dashboard" && <AdminDashboard />}
                  {adminPage === "products" && <AdminProducts />}
                  {adminPage === "orders" && <AdminOrders />}
                  {adminPage === "sliders" && <AdminSliders />}
                  {adminPage === "customers" && <AdminCustomers />}
                  {adminPage === "settings" && <AdminSettings />}
                </AdminLayout>
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
      </>
  );
}

export default App;
