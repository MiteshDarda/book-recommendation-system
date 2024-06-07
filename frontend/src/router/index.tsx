import { createBrowserRouter, useLoaderData } from "react-router-dom";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => ({ message: "Hello Data Router!" }),
    Component() {
      const data = useLoaderData() as { message: string };
      data;
      return <App/>;
    },
  },
]);

export default router;