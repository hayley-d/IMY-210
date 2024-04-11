<script>
import { ref, onMounted } from 'vue';
import { useStore } from '../store.js';
export default {
    setup() {
        const store = useStore();
        const loaded = ref(false);

        onMounted(async () => {
            await store.fetchStores();
            console.log('Stores:', store.stores);
            loaded.value = true;
        });

        return {
            stores: store.stores,
            loaded
        };
    }
};
</script>

<template>
    <div>
        <h1>Store Directory</h1>
        <div v-if="loaded">
            <ul>
                <li v-for="store in stores" :key="store.id">
                    {{ store.name }}
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
    li{
        color: white;
        font-size: 18px;
    }
</style>
