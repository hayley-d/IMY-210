// src/store/index.ts
import { defineStore } from 'pinia'



export const useStore  = defineStore('store', {
    state: () => ({
        stores: [] ,// Array to hold the list of stores
        currentUser : "",
        currentStore: {},
        cart: [] //holds array of product objects
    }),
    actions: {
        async fetchStores() {
            try {
                const response = await fetch('http://localhost:3000/stores');

                this.stores = await response.json();
                console.log( this.stores );
            } catch (error) {
                console.error('Error fetching stores:', error);
            }
        },
        async loginUser(username,id,password,role) {
            try {
                const response = await fetch(`http://localhost:3000/user/${username}`);
                this.currentUser = await response.json();
                console.log('Current user:', this.currentUser);
            } catch (error) {
                console.error('Error fetching user:', error);
                const userdata = {
                    id: id,
                    username: username,
                    password: password,
                    role: role
                }
                await this.registerUser(userdata);

                try {
                    const response = await fetch(`http://localhost:3000/user/${username}`);
                    this.currentUser = await response.json();
                    console.log('Newly registered user:', this.currentUser);
                } catch (error) {
                    console.error('Error fetching newly registered user:', error);
                }
            }
        },
        async registerUser(userData) {
            try {
                const response = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });
               this.currentUser = await response.json();
                console.log('Newly registered user:', this.currentUser);
            } catch (error) {
                console.error('Error registering user:', error);
            }
        },
        async fetchStore(storeId) {
            try {
                console.log("Store id: "+ storeId)
                const response = await fetch(`http://localhost:3000/store/${storeId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch store (${response.status} ${response.statusText})`);
                }
                this.currentStore = await response.json();
                this.currentStore = this.currentStore.store;
                console.log("Current Store:", this.currentStore);
            } catch (error) {
                console.error('Error fetching store:', error);
            }
        },
        addToCart(item) {
            console.log("Added to cart ");
            console.log(item);
            this.cart.push(item);
        },

        removeFromCart(index) {
            this.cart.splice(index, 1);
        },

        async createStore(data,id) {
            try {
                const response = await fetch('http://localhost:3000/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                this.userStore = await this.fetchStore(id);
                //update user to store_owner role
                const data2 = {};
                const response2 = await fetch(`http://localhost:3000/updateUser/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data2)
                });
                this.currentUser.role = "store_owner";
                console.log('Newly registered store:', this.userStore);
            } catch (error) {
                console.error('Error registering store:', error);
            }
        },
        async createProduct(data,id) {
            try {
                const response = await fetch(`http://localhost:3000/newProduct/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                console.log(response);
            } catch (error) {
                console.error('Error adding product:', error);
            }
        },
    }
})
