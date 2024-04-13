<script>
import { ref, onMounted } from 'vue';
import { useStore } from '../store.js';
export default {
    data() {
        return {
            stores: [],
            loaded: false
        };
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
        }
    }
};
</script>

<template>
    <div>
        <h1>Store Directory</h1>
        <div v-if="loaded">
            <ul>
                <li v-for="store in stores" :key="store.id">
                    <router-link :to="'/store/' + store.id">{{ store.name }}</router-link>
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
</style>
