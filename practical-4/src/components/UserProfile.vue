<!--Hayley Dodkins u21528790-->
<template >
    <div v-if="userIdDefined" id="container">
        <h1>{{ user.name }}</h1>
        <div id="profile">

            <div class="profile-heading">Username:</div>
            <div>{{ user.username }}</div>

            <div class="profile-heading">Email:</div>
            <div>{{ user.email }}</div>

            <div class="profile-heading">Phone:</div>
            <div>{{ user.phone }}</div>

            <div class="profile-heading">Website:</div>
            <div><a :href="user.website">{{ user.website }}</a></div>

            <div class="profile-heading">Address:</div>
            <div>{{ user.address.street }}, {{ user.address.city }}, {{ user.address.zipcode }}</div>


            <div class="profile-heading">Company:</div>
            <div>
                <ul>
                    <li>{{ user.company.name }}</li>
                    <li>{{ user.company.catchPhrase }}</li>
                    <li>{{ user.company.bs }}</li>
                </ul>
            </div>
        </div>
        <router-link :to="`/posts/${user.id}`" class="btn">View Posts</router-link>
        <router-link :to="`/todos/${user.id}`" class="btn">View Todos</router-link>
    </div>
    <div v-else>
        <input v-model="userIdInput" placeholder="Enter User ID" />
        <button @click="fetchuser">Fetch Posts</button>
    </div>
</template>


<script>
import { useStore } from '../store/store.js';
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
/*import { toast } from 'vue-toastification';*/

export default {
    props: {
        userId: {
            required: true,
        },
    },
    setup(props) {
        let userIdDefined = ref(false);
        const store = useStore();
        const route = useRoute();
        let userId = parseInt(props.userId);
        const user = ref(null);

        onMounted(async () => {
            if (userId) {
                try{
                    await fetchUser(userId);
                    /*toast.success('User fetched successfully');*/
                }
                catch (error) {
                    console.error('Failed to fetch user:', error);
                    /*toast.error('Failed to fetch user');*/
                }
            }
        });


        watch(() => route.query.userId, async (userId) => {
            if (userId) {
                try{
                    await fetchUser(userId);
                    /*toast.success('User fetched successfully');*/
                }
                catch (error) {
                    console.error('Failed to fetch user:', error);
                    /*toast.error('Failed to fetch user');*/
                }
            }
        });

        const fetchUser = async (userId) => {
            userIdDefined.value = true;
            try {
                await store.fetchUser(userId);
                const users = store.users;
                for(let i =0; i  < users.length;i++)
                {
                    if(users[i].id === userId)
                    {
                        user.value = users[i];
                        break;
                    }
                }
                /*toast.success('User fetched successfully');*/
            } catch (error) {
                console.error('Failed to fetch user:', error);
                /*toast.error('Failed to fetch user');*/
            }
        };

        const fetchuser = async () => {
            userIdDefined.value = true;
            try {
                await store.fetchUser(userId);
                const users = store.users;
                for(let i =0; i  < users.length;i++)
                {
                    if(users[i].id === userId)
                    {
                        user.value = users[i];
                        break;
                    }
                }
               /* toast.success('User fetched successfully');*/
            } catch (error) {
                console.error('Failed to fetch user:', error);
                /*toast.error('Failed to fetch user');*/
            }
        };

        return {
            user,
            userIdDefined,
            fetchuser,
            fetchUser
        };
    },

};
</script>

<style scoped>
button{
    border-radius: 10px;
    border: none;
    background-color: #42b883;
    padding:10px;
    color: white;
    font-size: 18px;
    cursor: pointer;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);

}

button:hover{
    background-color: #181818;
}
input, textarea{
    border-radius: 10px;
    padding:5px;
    font-size: 18px;
    background-color: lightgrey;
    color: white;
    border: none;
    outline: none;
    width:50%;
}


#container{
    display: flex;
    flex-direction: column;
    gap:30px;

}

h1{
    margin:10px;
}

#profile{
    font-size: 18px;
    color:white;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap:30px;
}


.profile-heading{
    width:100px;
    display: flex;
    justify-content: left;
    color:#42b883;
}

ul{
    list-style: none;
    padding: 0;
}

.btn{
    background-color: white;
    border-radius: 10px;
    padding:10px;
    color:#181818;
    width: 30%;
}

.btn:hover{
    background-color: #42b883;
}
</style>