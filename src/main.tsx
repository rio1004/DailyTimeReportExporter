import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import "./App.css";
import { store } from "./store/store.ts";
import { FunctionProvider } from "./context/getDTRContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <FunctionProvider>
        <div className="template">
          <App />
        </div>
      </FunctionProvider>
    </Provider>
  </React.StrictMode>
);
