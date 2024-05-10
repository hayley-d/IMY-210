<script>
import { useStore } from '../store.js';
import router from '../router';
export default {
    data() {
        return {
            currentStore: {},
            loading: true
        };
    },
    computed: {
        storeName() {
            return useStore().currentStore['information']?.[0]?.name?.[0] || '';
        },
        storeDescription() {
            return useStore().currentStore['information']?.[0]?.description?.[0] || '';
        },
        ownerName() {
            return useStore().currentStore['information'][0].owner[0]['_'];
        },
        products() {
            return useStore().currentStore.products[0].product;
        },
        user() {
            return useStore().currentUser;
        },
        userName() {
            return this.user ? this.user.username : null;
        },
        cartCount() {
            return useStore().cart.length;
        },
        isLoading() {
            return this.loading; // Computed property to track loading state
        },


    },
    props: ['storeId'],
    async mounted() {
        await this.fetchStore(this.storeId);
    },
    methods: {
        async fetchStore(storeId) {
            try {
                const fetchedStore = await useStore().fetchStore(storeId);
                this.currentStore = useStore().currentStore.store;
                console.log(this.currentStore)
                this.loading = false;
            } catch (error) {
                console.error('Error fetching store:', error);
            }
        },
        goToLogin() {
            // Navigate to the login route
            router.push('/login');
        },
        async addToCart(product) {
            try {
                useStore().addToCart(product);
            } catch (error) {
                console.error('Error adding item to cart:', error);
            }
        },
        viewCart() {
            router.push('/cart');
        },
        back() {
            router.push('/');
        },
    },
};
</script>

<template>
    <div id="storePage">
        <button @click="back" class="backBtn">Back</button>
        <div v-if="user">
            <button @click="viewCart" class="cartBtn">Cart ({{ cartCount }})</button>
        </div>
        <div v-if="!isLoading">
            <button v-if="!user" @click="goToLogin" class="loginBtn">Login</button>
            <div v-else>
                <p>Welcome, {{ userName }}</p>
            </div>
            <p id="storeName">{{ storeName }}</p>
            <p id="storeDesc">{{ storeDescription }}</p>
            <h2>Products</h2>
            <div v-for="product in products" :key="product.id">
                <h3 class="productHeading">{{ product.title[0] }}</h3>
                <p class="description">{{ product.description[0] }}</p>
                <p>{{ product.price[0]['$'].currency }} {{ product.price[0]['_'] }}</p>
                <div v-if="user">
                    <button class="cartBtn" @click="addToCart(product)">Add to Cart</button>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
            <!-- You can also add a spinner or other loading indicator here -->
        </div>
    </div>

</template>

<style scoped>

#storePage{
    width:100vw;
    padding:20px;
    display: flex;
    flex-direction: column;
    gap:20px;
}
.productHeading{
    color:plum;
    margin-top:20px;
}
.description{
    width: fit-content;
}

.cartBtn, .backBtn{
    border: none;
    border-radius: 10px;
    background-color: #222222;
    color: white;
    cursor: pointer;
    padding:10px;
    font-size: 16px;
    margin-top:5px;
    margin-bottom: 5px;
    width:fit-content;
}

.loginBtn{
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

.loginBtn:hover, .cartBtn:hover, .backBtn:hover{
    background-color: plum;
}

#storeName{
    font-size: 30px;
    color:plum;
    margin-bottom: 5px;
}

#storeDesc{
    font-size: 20px;
    margin-bottom: 20px;
}
</style>
