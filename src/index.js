// main.jsx or index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import "./index.css";
import ScrollToTop from "./components/ScrollToTop";
import store from "./redux/store";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <ScrollToTop />
      <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
