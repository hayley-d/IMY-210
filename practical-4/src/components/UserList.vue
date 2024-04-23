<!--Hayley Dodkins u21528790-->
<template>
    <div id="list">
        <h1>Users</h1>
        <ul v-if="usersLoaded">
            <li v-for="user in users" :key="user.id">
                <router-link :to="`/profile/${user.id}`">{{ user.name }}</router-link>
            </li>

        </ul>
        <div v-else>No users found.</div>
        <button @click="fetchUsers" :disabled="loading">Make Call</button>
    </div>
</template>

<script>
import { useStore } from '../store/store.js';
import {ref} from "vue";
/*import { toast } from 'vue-toastification';*/
export default {
    setup() {
        const store = useStore();
        const loading = ref(false);
        let usersLoaded = ref(false);

        const fetchUsers = async () => {
            try {
                loading.value = true;
                await store.fetchUsers();
                /*toast.success('Users fetched successfully');*/
            } catch (error) {
                console.error('Failed to fetch users:', error);
                /*toast.error('Failed to fetch users');*/

            } finally {
                loading.value = false;
                usersLoaded.value = true;
            }
        };

        return {
            users: store.users,
            fetchUsers,
            loading,
            usersLoaded,
        };
    },
};
</script>

<style scoped>
    li > a{
        color: white;
        font-size: 18px;
    }

    ul{
        list-style: none;
    }

    h1{
        color:#42b883;
    }

    button{
        border-radius: 10px;
        padding:10px;
        border: none;
        background-color: #42b883;
        color:white;
        font-size: 18px;
        cursor: pointer;
    }

    button:hover{
        background-color: plum;
    }

    #list{
        display: flex;
        flex-direction: column;
        gap:30px;
        align-items: center;
    }
</style>