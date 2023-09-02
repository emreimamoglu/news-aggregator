import { createBrowserRouter } from "react-router-dom";
import Login from "../views/Login";
import Register from "../views/Register";
import Home from "../views/Home";
import Layout from "../components/Layout";
import Settings from "../views/Settings";
import Sources from "../views/Sources";
import Categories from "../views/Categories";
import News from "../views/News";
import ReadLater from "../views/ReadLater";

export enum Routes {
    HOME = "/",
    LOGIN = "/login",
    REGISTER = "/register",
    SETTINGS = "/settings",
    SOURCES = "/sources",
    CATEGORIES = "/categories",
    NEWS = "/news",
    READ_LATER = "/read-later",
}

const routesForAuthenticatedOnly = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: Routes.HOME,
                element: <Home />,
            },
            {
                path: Routes.SETTINGS,
                element: <Settings />,
            },
            {
                path: Routes.SOURCES,
                element: <Sources />,
            },
            {
                path: Routes.CATEGORIES,
                element: <Categories />,
            },
            {
                path: Routes.NEWS,
                element: <News />,
            },
            {
                path: Routes.READ_LATER,
                element: <ReadLater />,
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
