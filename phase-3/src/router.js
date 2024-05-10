/*Hayley Dodkins u21528790*/
import { createRouter, createWebHistory } from 'vue-router';
import StoreDirectory from './components/StoreList.vue';
import StoreDetails from './components/Store.vue';
import Login from './components/Login.vue';
import ManageStore from './components/ManageStores.vue';
import EditProduct from './components/EditProduct.vue';
import AddProduct from './components/AddProduct.vue';
import CreateStore from './components/CreateStore.vue';
import Cart from './components/Cart.vue';

const routes = [
    { path: '/', component: StoreDirectory },
    {
        path: '/store/:storeId',
        component: StoreDetails,
        props: (route) => {
            const storeId = route.params.storeId;
            return { storeId };
        },
    },
    { path: '/manage/:storeId', component: ManageStore },
    { path: '/edit/:storeId/:productId', component: EditProduct },
    { path: '/add/:storeId', component: AddProduct },
    { path: '/create/:userId', component: CreateStore },
    { path: '/cart', component: Cart },
    { path: '/login', component: Login },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
