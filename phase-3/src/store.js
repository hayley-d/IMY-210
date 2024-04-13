// src/store/index.ts
import { defineStore } from 'pinia'



export const useStore  = defineStore('store', {
    state: () => ({
        stores: [] // Array to hold the list of stores
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
        }
    }
})
