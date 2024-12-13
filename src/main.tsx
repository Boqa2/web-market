import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Louyot from "./components/Layout/Louyot";
import TrashPage from "./components/Pages/TrashPage";
import HomePage from "./components/Pages/HomePage";
import FavoritesPage from "./components/Pages/FavoritesPage";
import LoginPage from "./components/login/LoginPage";
import CardAboutMen from "./components/Card/CardAboutMen";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { NotificationProvider } from "./components/Libs/Notification";
import OrderPage from "./components/Pages/OrderPage";
import ProtectedRoute from "./components/login/ProtectedRoute";
import RegisterPage from "./components/login/RegisterPage";
import ModalForAdd from "./components/ModalForAdd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Louyot />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <HomePage />,
          </ProtectedRoute>
        ),
      },
      {
        path: "trash",
        element: (
          <ProtectedRoute>
            <TrashPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "favorites",
        element: (
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "newproduct",
        element: (
          <ProtectedRoute>
            <ModalForAdd />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cardimgs/:id",
        element: <CardAboutMen />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "order",
        element: (
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        ),
      },
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
