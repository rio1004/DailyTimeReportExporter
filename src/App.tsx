import React, { useEffect } from "react";
import Login from "./pages/Login/Login";
import { Provider } from "react-redux";
import "./App.css";
import { store } from "./store/store";
import { FunctionProvider } from "./context/getDTRContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "../src/pages/Home/Home";
import Register from "./pages/Register/Register";
const AppRouter = () => {

  return (
    <React.StrictMode>
      <Provider store={store}>
        <FunctionProvider>
          <Router>
            <div className="template">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </Router>
        </FunctionProvider>
      </Provider>
    </React.StrictMode>
  );
};

export default AppRouter;
