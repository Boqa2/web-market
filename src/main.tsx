import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Louyot from "./components/Layout/Louyot";
import TrashPage from "./components/Pages/TrashPage";
import HomePage from "./components/Pages/HomePage";
import FavoritesPage from "./components/Pages/FavoritesPage";
import LoginPage from "./components/LoginPage";
import CardAboutMen from "./components/Card/CardAboutMen";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { NotificationProvider } from "./components/Libs/Notification";
import OrderPage from "./components/Pages/OrderPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Louyot />,
    children: [
      {
        path: "/",
        element: <HomePage />,
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
        path: "/cardimgs/:id",
        element: <CardAboutMen />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {path: "order",
        element: <OrderPage />
      }
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </Provider>
  </StrictMode>
);
