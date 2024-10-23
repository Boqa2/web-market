import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Louyot from "./components/Layout/Louyot";
import TrashPage from "./components/Pages/TrashPage";
import HomePage from "./components/Pages/HomePage";
import FavoritesPage from "./components/Pages/FavoritesPage";
import LoginPage from "./components/LoginPage";
import CardAboutWomen from "./components/Card/CardAboutWomen";
import CardAboutMen from "./components/Card/CardAboutMen";


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
        path:"/card4women/:id",
        element: <CardAboutWomen />
      },
      {
        path:"/cardimgs/:id",
        element: <CardAboutMen />
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
