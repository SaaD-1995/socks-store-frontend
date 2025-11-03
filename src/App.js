
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './Pages/HomePage';
import Footer from './components/Footer';
import About from './Pages/About';
import ContactUs from './Pages/ContactUs';

function App() {
  return (
    <>
    <Header />
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<ContactUs/>}></Route>
      </Routes>
    </div>
    <Footer />
    </>
  );
}

export default App;
