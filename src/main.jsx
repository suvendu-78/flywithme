import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppLay from "./Layout/Applayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/Home.jsx";
// import App from './App.jsx'
import Booking from "./page/bookinf.jsx";
import ManageBooking from "./page/Manging.jsx";
import Help from "./page/help.jsx";
const Root = createBrowserRouter([
  {
    path: "/",
    element: <AppLay />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Booking",
        element: <Booking />,
      },
      {
        path: "/ManageBooking",
        element: <ManageBooking />,
      },
      {
        path: "/Help",
        element: <Help />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={Root} />
  </StrictMode>,
);
