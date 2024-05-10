<script>
import { ref, onMounted } from 'vue';
import { useStore } from '../store.js';
import router from "@/router.js";
export default {
    data() {
        return {
            stores: [],
            loaded: false
        };
    },
    computed: {
        user() {
            return useStore().currentUser;
        },
        userName() {
            return this.user ? this.user.username : null;
        },
        cartCount() {
            return useStore().cart.length;
        },
    },
    mounted() {
        this.fetchStores();
    },
    methods: {
        async fetchStores() {
            try {
                const store = useStore();
                const response = await fetch('http://localhost:3000/stores');
                this.stores = await response.json();
                console.log('Stores:', this.stores);
                this.loaded = true;
            } catch (error) {
                console.error('Error fetching stores:', error);
            }
        },
        goToLogin() {
            this.$router.push('/login');
        },
        viewCart() {
            router.push('/cart');
        },
        manageStore() {
            //api call to get the store id
            router.push(`/manage/${this.user.id}`);
        },
        createStore() {
            //api call to get the store id
            router.push(`/create/${this.user.id}`);
        },

    }
};
</script>

<template>
    <div>
        <h1>Store Directory</h1>

        <button v-if="!user" @click="goToLogin" class="loginBtn">Login</button>
        <div v-else>
            <p>Welcome, {{ userName }}</p>
        </div>

        <div v-if="user">
            <button @click="viewCart" class="cartBtn">Cart ({{ cartCount }})</button>
            <div v-if="user.role === 'store_owner' ">
                <button @click="manageStore" class="cartBtn">Manage Store</button>
            </div>
            <div v-if="user.role !== 'store_owner' ">
                <button @click="createStore" class="cartBtn">Create Store</button>
            </div>
        </div>

        <div v-if="loaded">
            <ul>
                <li v-for="store in stores" :key="store.id">
                    <router-link :to="'/store/' + store.id" class="sotrename">{{ store.name }}</router-link>
                </li>
            </ul>
        </div>


        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<style scoped>

ul{
    list-style: none;
}
    li{
        color: white;
        font-size: 18px;
    }

    .sotrename{
        font-size: 20px;
    }

.loginBtn, .cartBtn{
    border: none;
    border-radius: 10px;
    background-color: #222222;
    color: white;
    cursor: pointer;
    padding:10px;
    font-size: 18px;
    margin-top:10px;
    margin-bottom: 10px;
}

.loginBtn:hover, .cartBtn:hover{
    background-color: plum;
}
</style>
