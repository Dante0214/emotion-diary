import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";
import Login from "./pages/Login";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateAccount from "./pages/CreateAccount";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "/new", element: <New /> },
      {
        path: "/edit",
        element: <Edit />,
        children: [
          { index: true, element: <Edit /> },
          { path: ":id", element: <Edit /> },
        ],
      },
      {
        path: "/diary",
        element: <Diary />,
        children: [
          {
            index: true,
            element: <Diary />,
          },
          { path: ":id", element: <Diary /> },
        ],
      },
      { path: "*", element: <Notfound /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/createaccount", element: <CreateAccount /> },
]);

export default router;
