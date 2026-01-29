import User from "../getUser/user";
import Adduser from "../Adduser/Adduser";
import UpdateUser from "../Updateuser/update";
import "../getUser/user.css";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
export default function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add",
      element: <Adduser />,
    },
    {
      path: "/update/:id",
      element: <UpdateUser />,
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={route} />
    </div>
  );
}

