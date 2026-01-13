import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import { HomeProvider } from "../features/tasks/contexts/HomeProvider";

import Login from "../features/authentication/pages/Login";
import Register from "../features/authentication/pages/Register";
import ForgotPassword from "../features/authentication/pages/ForgotPassword";
import RecoverPassword from "../features/authentication/pages/RecoverPassword";

import Home from "../features/tasks/pages/Home";

import NotAuthenticated from "../features/error/pages/NotAuthenticated";
import NotFound from "../features/error/pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/recover-password",
    element: <RecoverPassword />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <HomeProvider>
          <Home />
        </HomeProvider>
      </ProtectedRoute>
    ),
  },
  {
    path: "/not-authenticated",
    element: <NotAuthenticated />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;
