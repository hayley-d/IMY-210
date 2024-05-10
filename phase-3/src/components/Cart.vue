<template>
    <div id="cart">
        <p>Welcome, {{ userName }}</p>
        <button @click="back" class="backBtn">Back</button>
        <div class="list"  v-for="product in cart" :key="product.id">
            <h3 class="productHeading">{{ product.title[0] }}</h3>
            <p class="description">{{ product.description[0] }}</p>
            <p>{{ product.price[0]['$'].currency }} {{ product.price[0]['_'] }}</p>
        </div>
    </div>

</template>

<script>
import { useStore } from '../store.js';
import router from '../router';
export default {
    data() {
        return {

        };
    },
    computed: {
        cart() {
            return useStore().cart;
        },
        user() {
            return useStore().currentUser;
        },
        userName() {
            return this.user ? this.user.username : null;
        },
    },
    methods: {
        back() {
            router.push('/');
        },
    },
};
</script>

<style scoped>
.productHeading{
    color:plum;
    margin-top:20px;
}
.description{
    width: fit-content;
}

.backBtn{
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

#cart{
    display: flex;
    flex-direction: column;
    gap:30px;
}

 .backBtn:hover{
    background-color: plum;
}
</style>