import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
//------ Page -------
import CategoryPage from "./Pages/CategoryPage";
import MenuPage from "./Pages/MenuPage";
//------ React Router ------
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// -------Router ----------
const router = createBrowserRouter([
  {
    path: "/order",
    element: <CategoryPage />,
  },
  {
    path: "/order/categories",
    element: <MenuPage />,
  },
  {
    path: "/",
    element: <MenuPage />,
  },
  {
    path: "*",
    element: <h2>Please Re-Scanning QR Code</h2>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
