import Home from "@/views/Home";
import Search from "@/views/Search";

export const sidebarMenuRoutes = [
    {
        id : '1',
        path: '/',
        component: Home,
        name : 'Home'
    },
    {
        id : '2',
        path: '/search',
        component: Search,
        name : 'Search'
    },
    {
        id: '3',
        path: '/subscriptions',
        component: Home,
        name : 'Subscriptions'
    },

]

export const sidebarProfileRoutes = [
    {
        id : '1',
        path: '/profile',
        name : 'Profile'
    },
    {
        id : '2',
        path: '/settings',
        name : 'Settings'
    },
    {
        id : '3',
        name : 'Logout'
    },
]