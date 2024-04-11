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
    { path: '/store/:id', component: StoreDetails },
    { path: '/manage/:id', component: ManageStore },
    { path: '/edit/:StoreId/:productId', component: EditProduct },
    { path: '/add/:StoreId', component: AddProduct },
    { path: '/create/:userId', component: CreateStore },
    { path: '/cart/:userId', component: Cart },
    { path: '/login', component: Login }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
