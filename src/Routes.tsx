import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Redirect from "./pages/Redirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
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
