import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SubcatContext } from "./context/SubcatContext";
import { SubModuleContext } from "./context/CourseContext";

import App from "./App";
import { AuthProvider } from "./context/auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <SubModuleContext>
      <SubcatContext>
        {/* <RouterProvider router={router} /> */}
        <BrowserRouter>
          <App />
          <ToastContainer />
        </BrowserRouter>
      </SubcatContext>
    </SubModuleContext>
  </AuthProvider>
);
