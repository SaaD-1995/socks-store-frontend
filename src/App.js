import {  Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./Pages/HomePage";
import Footer from "./components/Footer";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import CollectionPage from "./Pages/CollectionPage";

function App() {
  return (
    <>
      <Header/>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/collections" element={<CollectionPage />} />
          <Route
            path="*"
            element={
              <div className="text-center mt-20 text-3xl">
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </div>
      <Footer />
      </>
  );
}

export default App;
