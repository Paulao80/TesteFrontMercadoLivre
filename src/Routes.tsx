import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Redirect from "./pages/Redirect";
import Publicacao from "./pages/Publicacao";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/redirect",
    element: <Redirect />,
  },
  {
    path: "/publicacao",
    element: <Publicacao />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
