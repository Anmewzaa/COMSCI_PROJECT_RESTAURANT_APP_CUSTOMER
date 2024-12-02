import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
//------ Page -------
// import CategoryPage from "./Pages/CategoryPage";
// import MenuPage from "./Pages/MenuPage";
// import CartPage from "./Pages/CartPage";
import HomePage from "./Pages/HomePage";
import CartPage from "./Pages/CartPage";
//------ React Router ------
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Ant Design
import { Result } from "antd";
// -------Router ----------
const router = createBrowserRouter([
  {
    path: "/order",
    element: <HomePage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "*",
    element: (
      <>
        <Result
          status="404"
          title="Page not found"
          subTitle="ไม่มีการเปิดโต๊ะนี้หรือถ้านี้คือของผิดพลาดกรุณาติดต่อพนักงาน"
        />
      </>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
