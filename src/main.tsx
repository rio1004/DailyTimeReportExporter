import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Login from "./pages/Login/Login.tsx";
import { Provider } from "react-redux";
import "./App.css";
import { store } from "./store/store.ts";
import { FunctionProvider } from "./context/getDTRContext.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <FunctionProvider>
        <Router>
          <div className="template">
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </Router>
      </FunctionProvider>
    </Provider>
  </React.StrictMode>
);
