import { createRouter, createWebHistory } from 'vue-router';
import UserList from './components/UserList.vue';
import UserProfile from './components/UserProfile.vue';
import Posts from "./components/Posts.vue";
import TodoList from "./components/TodoList.vue";
import { useStore } from './store/store.js';

const routes = [
    {
        path: '/',
        component: UserList,
    },
    {
        path: '/profile/:userId',
        component: UserProfile,
        props: (route) => {
            const userId = route.params.userId;
            return { userId };
        },
    },
    {
        path: '/posts/:userId',
        component: Posts,
        props: (route) => {
            const userId = route.params.userId;
            return { userId };
        },
    },
    {
        path: '/todos/:userId',
        component: TodoList,
        props: (route) => {
            const userId = route.params.userId;
            return { userId };
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
