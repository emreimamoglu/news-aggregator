import { createBrowserRouter } from "react-router-dom";
import Login from "../views/Login";
import Register from "../views/Register";
import Home from "../views/Home";
import Layout from "../components/Layout";

export enum Routes {
    HOME = "/",
    LOGIN = "/login",
    REGISTER = "/register",
}

const routesForAuthenticatedOnly = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: Routes.HOME,
                element: <Home />,
            }
        ],
    },
];

const publicRoutes = [
    {
        path: Routes.LOGIN,
        component: Login,
    },
    {
        path: Routes.REGISTER,
        component: Register,
    },
];

export const router = createBrowserRouter([
    ...publicRoutes,
    ...routesForAuthenticatedOnly,
]);
