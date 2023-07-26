import Home from "@/views/Home";
import Search from "@/views/Search";

export const routes = [
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