// src/store/index.ts
import { defineStore } from 'pinia'



export const useStore  = defineStore('store', {
    state: () => ({
        stores: [] ,// Array to hold the list of stores
        currentUser : ""
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
    }
})
