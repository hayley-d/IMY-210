<template>
    <div>
        <button @click="back" class="backBtn">Back</button>
        <h1>Manage {{ storeName }}</h1>
        <form @submit.prevent="submitForm1">
            <label for="storeName">Store Name:</label>
            <input type="text" id="storeName" v-model="storeName">

            <label for="description">Description:</label>
            <textarea id="description" v-model="description"></textarea>

            <button type="submit">Update Store Details</button>
        </form>

        <h2>Add New Product</h2>
        <hr/>
        <br/>
        <form @submit.prevent="submitForm2">

            <label for="productLang">Product Language</label>
            <input type="text" id="productLang" value="En">

            <label for="productEd">Product Edition</label>
            <input type="text" id="productEd">

            <label for="productTitle">Product Title</label>
            <input type="text" id="productTitle">

            <label for="productAuthor">Product Author</label>
            <input type="text" id="productAuthor">

            <label for="productIsbn">Product ISBN</label>
            <input type="text" id="productIsbn">

            <label for="productSku">Product SKU</label>
            <input type="text" id="productSku">

            <label for="productDesc">Product Description</label>
            <input type="text" id="productDesc">

            <label for="productPrice">Product Price</label>
            <input type="text" id="productPrice">

            <label for="productCurrency">Product currency</label>
            <select id="productCurrency" name="productCurrency">
                <option value="USD">USD</option>
                <option value="ZAR">ZAR</option>
            </select>

            <label for="productDepartment">Product Department</label>
            <input type="text" id="productDepartment">

            <label for="productModuleName">Module Name</label>
            <input type="text" id="productModuleName">

            <label for="productModuleCode">Module Code</label>
            <input type="text" id="productModuleCode">

            <label for="productAv">Availability</label>
            <select id="productAv" name="productAv">
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
            </select>

            <label for="productCon">Condition</label>
            <select id="productCon" name="productCon">
                <option value="Great">Great</option>
                <option value="Good">Good</option>
                <option value="Used">Used</option>
                <option value="Brand new">Brand new</option>
            </select>

            <label for="productImg">Image Location</label>
            <input type="text" id="productImg">

            <button>Add Product</button>
        </form>

<!--Search through products and then edit chosen product and delete product if wanted-->
    </div>
</template>

<script>
import { useStore } from '../store.js';
import router from '../router';
export default {
    data() {
        return {
            storeName: '',
            description: ''
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
        currentStore(){
            return useStore().currentStore;
        }
    },
    async mounted() {
        await useStore().fetchStore(this.userId);
        this.storeName = useStore().currentStore['information']?.[0]?.name?.[0] || '';
        this.description = useStore().currentStore['information']?.[0]?.description?.[0] || '';
    },
    methods: {
        async submitForm1() {
            const store = {
                "store": {
                    "_attributes" :{
                        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                        "xsi:noNamespaceSchemaLocation": "validate.xsd"
                    },
                    "information": {
                        "_attributes":{
                            "id": `${this.userId}`
                        },
                        "name":{
                            "_text": this.storeName
                        },
                        "description": {
                            "_text": this.description
                        },
                        "owner": {
                            "_attributes":{
                                "userId": `${this.userId}`
                            },
                            "_text": this.userName
                        }
                    },
                    "products":{
                        "product":[]
                    }
                }
            };

            console.log('Updated Store:', store);
            await useStore().updateStore(store, this.userId);
            console.log('Store updated successfully');
            router.push('/');
        },
        back() {
            router.push('/');
        },
        async submitForm2() {
            const store = {
                "store": {
                    "_attributes" :{
                        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                        "xsi:noNamespaceSchemaLocation": "validate.xsd"
                    },
                    "information": {
                        "_attributes":{
                            "id": `${this.userId}`
                        },
                        "name":{
                            "_text": this.storeName
                        },
                        "description": {
                            "_text": this.description
                        },
                        "owner": {
                            "_attributes":{
                                "userId": `${this.userId}`
                            },
                            "_text": this.userName
                        }
                    },
                    "products":{
                        "product":[]
                    }
                }
            };

            console.log('Updated Store:', store);
            await useStore().updateStore(store, this.userId);
            console.log('Store updated successfully');
            router.push('/');
        },
    },
};
</script>

<style scoped>
    input, textarea{
        border: none;
        outline: none;
        border-radius: 10px;
        padding:5px;
        color:#222222;
        width:50vw;
        text-align: left;
    }



    form{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 3fr;
        gap:20px;
    }

    label{
        font-size: 18px;
    }

    button{
        border-radius: 10px;
        padding:5px;
        font-size: 16px;
        cursor: pointer;
        width:100px;
        color:#222222;
        border:none;
    }

    button:hover{
        background-color: plum;
        color:white;
    }

    form > button{
        width:200px;
        columns: 2;
        margin-top:30px;
        margin-bottom:50px;
    }

    h1{
        margin-bottom:30px;
        margin-top:30px;
    }

</style>