import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./component/auth/SignIn.tsx";
import SignUp from "./component/auth/SignUp.tsx";
import Home from "./pages/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path:'/signin',
    element:<SignIn/>
  },
  {
    path:'/signup',
    element:<SignUp/>
  }
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
