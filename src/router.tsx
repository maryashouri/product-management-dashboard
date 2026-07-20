import { createBrowserRouter, Navigate } from "react-router-dom";
import ProductsPage from "./products/ProductsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/products" replace />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
]);
