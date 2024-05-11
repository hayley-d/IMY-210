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


        <div v-if="editId === -1">
            <h2>Add New Product</h2>
            <hr/>
            <br/>
            <form @submit.prevent="submitForm2">

                <label for="productLang">Product Language</label>
                <input type="text" id="productLang" v-model="productLang">

                <label for="productEd">Product Edition</label>
                <input type="text" id="productEd" v-model="productEd">

                <label for="productTitle">Product Title</label>
                <input type="text" id="productTitle" v-model="productTitle">

                <label for="productAuthor">Product Author</label>
                <input type="text" id="productAuthor" v-model="productAuthor">

                <label for="productIsbn">Product ISBN</label>
                <input type="text" id="productIsbn" v-model="productIsbn">

                <label for="productSku">Product SKU</label>
                <input type="text" id="productSku" v-model="productSku">

                <label for="productDesc">Product Description</label>
                <input type="text" id="productDesc" v-model="productDesc">

                <label for="productPrice">Product Price</label>
                <input type="text" id="productPrice" v-model="productPrice">

                <label for="productCurrency">Product currency</label>
                <select id="productCurrency" name="productCurrency" v-model="productCurrency">
                    <option value="USD">USD</option>
                    <option value="ZAR">ZAR</option>
                </select>

                <label for="productDepartment">Product Department</label>
                <input type="text" id="productDepartment" v-model="productDepartment">

                <label for="productModuleName">Module Name</label>
                <input type="text" id="productModuleName" v-model="productModuleName">

                <label for="productModuleCode">Module Code</label>
                <input type="text" id="productModuleCode" v-model="productModuleCode">

                <label for="productAv">Availability</label>
                <select id="productAv" name="productAv" v-model="productAv">
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                </select>

                <label for="productCon">Condition</label>
                <select id="productCon" name="productCon" v-model="productCon">
                    <option value="Great">Great</option>
                    <option value="Good">Good</option>
                    <option value="Used">Used</option>
                    <option value="Brand new">Brand new</option>
                </select>

                <label for="productImg">Image Location</label>
                <input type="text" id="productImg" v-model="productImg">

                <button type="submit">Add Product</button>
            </form>
        </div>


        <div v-if="editId === -1">
            <div v-for="product in productsArr.product" :key="product.id">
                <h3 class="productHeading">{{ product.title[0] }}</h3>
                <p class="description">{{ product.description[0] }}</p>
                <p>{{ product.price[0]['$'].currency }} {{ product.price[0]['_'] }}</p>
                <div class="buttonList">
                    <button class="editBtn" @click="startEditing(product['$'].id,product)">Edit</button>
                    <button class="deleteBtn" @click="deleteProduct(product['$'].id,product)">Delete</button>
                </div>
            </div>
        </div>

        <div v-if="editId !== -1">
            <h2>Edit Product</h2>
            <hr/>
            <br/>
            <form @submit.prevent="updateProduct(editingProductId)">
                <label for="productLang2">Product Language</label>
                <input type="text" id="productLang2" v-model="productLang">

                <label for="productEd2">Product Edition</label>
                <input type="text" id="productEd2" v-model="productEd">

                <label for="productTitle2">Product Title</label>
                <input type="text" id="productTitle2" v-model="productTitle">

                <label for="productAuthor2">Product Author</label>
                <input type="text" id="productAuthor2" v-model="productAuthor">

                <label for="productIsbn2">Product ISBN</label>
                <input type="text" id="productIsbn2" v-model="productIsbn">

                <label for="productSku2">Product SKU</label>
                <input type="text" id="productSku2" v-model="productSku">

                <label for="productDesc2">Product Description</label>
                <input type="text" id="productDesc2" v-model="productDesc">

                <label for="productPrice2">Product Price</label>
                <input type="text" id="productPrice2" v-model="productPrice">

                <label for="productCurrency2">Product currency</label>
                <select id="productCurrency2" name="productCurrency2" v-model="productCurrency">
                    <option value="USD">USD</option>
                    <option value="ZAR">ZAR</option>
                </select>

                <label for="productDepartment2">Product Department</label>
                <input type="text" id="productDepartment2" v-model="productDepartment">

                <label for="productModuleName2">Module Name</label>
                <input type="text" id="productModuleName2" v-model="productModuleName">

                <label for="productModuleCode2">Module Code</label>
                <input type="text" id="productModuleCode2" v-model="productModuleCode">

                <label for="productAv2">Availability</label>
                <select id="productAv2" name="productAv2" v-model="productAv">
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                </select>

                <label for="productCon">Condition</label>
                <select id="productCon" name="productCon" v-model="productCon">
                    <option value="Great">Great</option>
                    <option value="Good">Good</option>
                    <option value="Used">Used</option>
                    <option value="Brand new">Brand new</option>
                </select>

                <label for="productImg">Image Location</label>
                <input type="text" id="productImg" v-model="productImg">

                <button type="submit">Update Product</button>
                <button onclick="cancelEditing()">Cancel</button>
            </form>
        </div>


<!--Search through products and then edit chosen product and delete product if wanted-->
    </div>
</template>

<script>
import { ref } from 'vue'; // Import ref from Vue 3 or 'vue'
import { useStore } from '../store.js';
import router from '../router';
export default {
    data() {
        return {
            storeName: '',
            description: '',
            productLang: 'En',
            productEd: '',
            productTitle: '',
            productAuthor: '',
            productIsbn: '',
            productSku: '',
            productDesc: '',
            productPrice: '',
            productCurrency: 'USD',
            productDepartment: '',
            productModuleName: '',
            productModuleCode: '',
            productAv: 'In Stock',
            productCon: 'Great',
            productImg: '',

            productsArr: []
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
        },
        products() {
            return this.productsArr;
        },
        editId() {
            return useStore().getEditId();
        },

    },
    async mounted() {
       /* await useStore().fetchStore(this.userId);*/
        await this.fetchStore(this.userId);
        this.storeName = useStore().currentStore['information']?.[0]?.name?.[0] || '';
        this.description = useStore().currentStore['information']?.[0]?.description?.[0] || '';
        this.productsArr = useStore().currentStore.products[0];
        console.log(this.productsArr);
        console.log("Current Store: ",useStore().currentStore);
    },
    methods: {
        async submitForm1() {
            console.log("Current User",this.user);
            console.log("User id",this.userId)
            const details = {
               name: this.storeName,
              description: this.description
            }
            /*const store = {
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
            };*/

            console.log('Updated Store:', details);
            await useStore().updateStore(details, useStore().currentUser.id);
            console.log('Store updated successfully');
            router.push('/');
        },
        back() {
            router.push('/');
        },
        async submitForm2() {
            //Generate an id
            const id = this.generateRandom();
            const newProduct =
            {
                id: id,
                language:this.productLang,
                edition:this.productEd,
                title:this.productTitle,
                author:this.productAuthor,
                isbn:this.productIsbn,
                sku:this.productSku,
                description:this.productDesc,
                price:this.productPrice,
                currency:this.productCurrency,
                department:this.productDepartment,
                modules:[
                    {
                        id:this.productModuleCode,
                        name:this.productModuleName
                    }
                ],
                availability:this.productAv,
                condition:this.productCon,
                image:this.productImg
            }

            console.log('New Product:', newProduct);
            await useStore().createProduct(newProduct, useStore().currentUser.id);
            console.log('Product Added successfully');
            router.push('/');
        },
        generateRandom(){
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < 4; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        },
        async deleteProduct(productId,product)
        {
            console.log("Deleting Product with id "+ productId);
            await useStore().deleteProduct(productId, useStore().currentUser.id);
            console.log('Product Deleted Successfully');
            router.push('/');
        },
        async updateProduct(productId)
        {
            console.log("Updating Product with id "+ productId);
            const data =
            {
                id: useStore().getEditId(),
                language:this.productLang,
                edition:this.productEd,
                title:this.productTitle,
                author:this.productAuthor,
                isbn:this.productIsbn,
                sku:this.productSku,
                description:this.productDesc,
                price:this.productPrice,
                currency:this.productCurrency,
                department:this.productDepartment,
                modules:
                [
                    {
                    id:this.productModuleCode,
                    name:this.productModuleName
                    }
                ],
                availability:this.productAv,
                condition:this.productCon,
                image:this.productImg
            }
            await useStore().updateProduct(data,useStore().getEditId(), useStore().currentUser.id);
            console.log('Product Update Successfully');
            router.push('/');
        },
        startEditing(productId,product) {

            useStore().updateEdit(productId);
            this.productImg = product.image;
            this.productLang = product['$'].language;
            this.productTitle = product.title;
            this.productAuthor = product.author;
            this.productIsbn = product.isbn;
            this.productSku = product.sku;
            this.productDesc = product.description;
            this.productPrice = product.price[0]['_'];
            this.productCurrency = product.price[0]['$'].currency;
            this.productDepartment = product.department;
            this.productModuleName = product.modules[0].module[0].name;
            this.productModuleCode = product.modules[0].module[0].id;
            /*document.getElementById('productAv2').value = product.availability;
            document.getElementById('productCon2').value = product.condition;*/
            this.productAv = product.availability[0];
            this.productCon = product.condition[0];
            this.productEd = product['$'].edition;
        },
        cancelEditing() {
            useStore().updateEdit(-1);
        },
        async fetchStore(storeId) {
            try {
                const fetchedStore = await useStore().fetchStore(storeId);
                this.currentStore = useStore().currentStore.store;
                this.loading = false;
            } catch (error) {
                console.error('Error fetching store:', error);
            }
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

    .buttonList{
        display: flex;
        gap:30px;
        justify-content: center;
        align-items: center;
    }

</style>