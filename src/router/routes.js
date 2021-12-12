export const routes = [{
        path: "",
        name: "search-movies",
        component: () => import("@/views/SearchMovies"),
    },
    {
        path: '/watched-movies',
        name: 'watched-movies',
        component: () => import("@/views/WatchedMovies.vue")
    },
    {
        path: "*",
        redirect: {
            name: "search-movies"
        },
    }
];