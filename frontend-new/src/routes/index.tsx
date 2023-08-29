import { createBrowserRouter } from "react-router-dom";
import Login from "../views/Login";
import Register from "../views/Register";

export enum Routes {
    HOME = "/",
    LOGIN = "/login",
    REGISTER = "/register",
}

export const router = createBrowserRouter([
    {
        path: Routes.HOME,
        element: <Login/>,
    },
    {
        path: Routes.LOGIN,
        element: <Login/>,
    },
    {
        path: Routes.REGISTER,
        element: <Register/>,
    },
]);