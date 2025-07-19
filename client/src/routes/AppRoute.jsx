import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import Layout from "../layout/Layout";
 


const AppRoutes = () => {
  const HomePage = lazy(() => import("../pages/HomePage"));
  const LoginPage = lazy(() => import("../pages/LoginPage"));
  const RegistrationPage = lazy(() => import("../pages/RegistrationPage"));
  const DashboardPage = lazy(() => import("../pages/DashboardPage"));

  const appRoute = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegistrationPage />,
    },
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element:<HomePage />
        },
        {
          path:"dashboard",
          element:<DashboardPage />
        }
      ]
    },
  ]);

  return (
    <div>
      <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
        <RouterProvider router={appRoute} />
      </Suspense>
    </div>
  );
};

export default AppRoutes;
