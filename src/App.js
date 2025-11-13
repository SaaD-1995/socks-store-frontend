import {  Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./Pages/HomePage";
import Footer from "./components/Footer";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import CollectionPage from "./Pages/CollectionPage";
import Error404Page  from "./Pages/Error404Page";
import OfferHeader from "./components/OfferHeader";
// import ProductDetailPage from "./Pages/CollectionPage";

function App() {
  return (
    <>
      <OfferHeader />
      <Header/>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/collections" element={<CollectionPage />} />
          {/* <Route path="/products/:id" element={<ProductDetailPage />} /> */}
          <Route
            path="*"
            element={
             <Error404Page />
            }
          />
        </Routes>
      </div>
      <Footer />
      </>
  );
}

export default App;
