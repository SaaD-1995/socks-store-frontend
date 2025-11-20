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
import ProtectedAdminRoute from "./Pages/Admin/ProtectedAdminRoute";
import AdminLayout from "./Pages/Admin/AdminLayout";
import { useState } from "react";
import ProductDetailPage from "./Pages/ProductDetailPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignUpPage";
import { Product } from './components/Home/ProductCard';
import ProtectedRoute from './components/ProtectedRoute';
type AdminPage = "dashboard" | "products" | "sliders" | "orders" | "customers" | "settings";
function App() {
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
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/profile" 
          element=
          {<ProtectedRoute>
                <div className="p-4">
                  <h1 className="text-2xl font-bold mb-4">User Profile</h1>
                  <p>This is a protected profile page. Only logged-in users can see this.</p>
                </div>
            </ProtectedRoute>} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="*"
            element={
             <Error404Page />
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
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
