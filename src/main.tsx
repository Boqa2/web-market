import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Louyot from "./components/Layout/Louyot";
import TrashPage from "./components/Pages/TrashPage";
import HomePage from "./components/Pages/HomePage";
import FavoritesPage from "./components/Pages/FavoritesPage";
import LoginPage from "./components/LoginPage";
import CardAbout from "./components/Card/CardAbout";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Louyot />,
    children: [
      {
        path: "/",
        element: <HomePage  />,
      },
      {
        path: "trash",
        element: <TrashPage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
      {
        path:"/cardimgs/:id",
        element: <CardAbout />
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
