import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Redirect from "./pages/Redirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/redirect",
    element: <Redirect />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
