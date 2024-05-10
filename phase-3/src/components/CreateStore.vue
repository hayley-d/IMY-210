<template>
    <div>
        <button @click="back" class="backBtn">Back</button>
        <h1>Create Store</h1>
        <form @submit.prevent="submitForm">
            <label for="storeName">Store Name:</label>
            <input type="text" id="storeName" v-model="storeName" required>

            <label for="description">Description:</label>
            <textarea id="description" v-model="description" required></textarea>

            <button type="submit">Create Store</button>
        </form>
    </div>
</template>

<script>
import { useStore } from '../store.js';
import router from '../router';
export default {
    data() {
        return {
            storeName: '',
            description: '',

        };
    },
    computed: {
        user() {
            return useStore().currentUser;
        },
        userName() {
            return useStore().currentUser.username;
        },
        userId() {
            return useStore().currentUser.id;
        },
    },
    async mounted() {

    },
    methods: {
        async submitForm() {
            const trimmedName = this.storeName.trim();
            const trimmedDescription = this.description.trim();
            const username = this.userName.trim();
            console.log("UserID: " + this.userId)
            const userId = this.userId.trim();

            const store = {
                "store": {
                    "_attributes" :{
                        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                        "xsi:noNamespaceSchemaLocation": "validate.xsd"
                    },
                    "information": {
                        "_attributes":{
                            "id": `${userId}`
                        },
                        "name":{
                            "_text": trimmedName
                        },
                        "description": {
                            "_text":trimmedDescription
                        },
                        "owner": {
                            "_attributes":{
                                "userId": `${userId}`
                            },
                            "_text": `${username}`
                        }
                    },
                    "products":{
                        "product":[]
                    }
                }
            };

            console.log('New Store:', store);
            await useStore().createStore(store, this.userId);
            console.log('Store created successfully');
            router.push('/');
        },
        back() {
            router.push('/');
        },
    },
};
</script>

<style scoped>


button{
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

 button:hover{
    background-color: plum;
}

input, textarea{
    border-radius: 10px;
    border: none;
    outline: none;
    padding:5px;
    font-size: 18px;
    margin:10px;
}
</style>