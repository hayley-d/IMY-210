<!--Hayley Dodkins u21528790-->

<template>
    <div  id="posts" >

        <div v-if="userIdDefined" class="post-area-container">
            <h2 id="posts-username">{{ user.username }}</h2>
            <hr/>
            <div v-for="post in posts" :key="post.id" class="post-container">
                <h3  class="post-title">{{ post.title }}</h3>
                <p>{{ post.body }}</p>
                <div class="button-container">
                    <button @click="editPost(post)">Edit</button>
                    <button @click="deletePost(post.id)">Delete</button>
                </div>
                <EditPostForm v-if="showEditPostForm" :post="post" @update="updatePost" />
            </div>
            <button @click="showAddPostForm = true" v-if="posts.length > 0" id="add-post-btn">Add New Post</button>
            <form v-if="showAddPostForm" @submit.prevent="addPost" class="add-form">
                <input v-model="newPostTitle" placeholder="Title" />
                <textarea v-model="newPostBody" placeholder="Body"></textarea>
                <button type="submit">Add Post</button>
            </form>
        </div>
        <template v-else>
            <input v-model="userIdInput" placeholder="Enter User ID" />
            <button @click="fetchPosts">Fetch Posts</button>
        </template>
    </div>
</template>



<script>
import EditPostForm from './EditPost.vue';
import { useStore } from '../store/store.js';
import {ref, watch} from 'vue';
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
        let userId = parseInt(props.userId);
        let user = {};
        const users = store.users;
        for(let i =0; i  < users.length;i++)
        {
            if(users[i].id === userId)
            {
                user = users[i];
                break;
            }
        }
        console.log(user);
        
        let showAddPostForm = ref(false);
        let newPostTitle = ref('');
        let newPostBody = ref('');
        let showEditPostForm = ref(false);
        let selectedPost = ref(null);

        const fetchPosts = async () => {

            try{
                await store.fetchPosts(store.userId);
                userIdDefined.value = true;
                /*toast.success('Posts fetched successfully');*/
            }
            catch (error) {
                console.error('Failed to fetch posts:', error);
                /*toast.error('Failed to fetch posts');*/
            }

        };

        const editPost = (post) => {
            selectedPost.value = post;
            showEditPostForm.value = true;
        };

        const updatePost = async ({ title, body }) => {
            try{
                await store.deletePost(selectedPost.value.id);
                await  store.createPost(store.userId, title, body);
                showEditPostForm.value = false;
                /*toast.success('Post updated successfully');*/
            }
            catch (error) {
                console.error('Failed to update post:', error);
                /*toast.error('Failed to update post');*/
            }
        };

        const deletePost = async (postId) => {
            try{
                await store.deletePost(postId);
                /*toast.success('Post deleted successfully');*/
            }
            catch (error) {
                console.error('Failed to delete post:', error);
                /*toast.error('Failed to delete post');*/
            }
        };

        const addPost = async () => {
            try{
                await store.createPost(store.userId, newPostTitle.value, newPostBody.value);
                showAddPostForm.value = false;
                newPostTitle = '';
                newPostBody = '';
                /*toast.success('Post added successfully');*/
            }
            catch (error) {
                console.error('Failed to add post:', error);
                /*toast.error('Failed to add post');*/
            }
        };

        watch(() => props.userId,  () => {
            if (props.userId) {
                store.userIdInput = props.userId;
                fetchPosts();
            }
        });

        return {
            userIdInput: store.userId,
            userId: store.userId,
            user: user,
            posts: store.posts,
            fetchPosts,
            editPost,
            deletePost,
            addPost,
            showAddPostForm,
            newPostTitle,
            newPostBody,
            showEditPostForm,
            selectedPost,
            updatePost,
            userIdDefined
        };
    },
    components: {
        EditPostForm,
    },
};
</script>

<style scoped>
*{
    font-family: "Montserrat", sans-serif;
}

.post-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:30px;
    background-color: white;
    padding:30px;
    border-radius: 20px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    font-size: 18px;
}

.post-area-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:50px;
    padding:30px;
    max-width: 100vw;
}

#posts-username{
    color: white;
    font-size: 40px;
    padding:0;
    margin:0;
}

p{
    color:#181818;
}

.post-title{
    font-size: 30px;
    color: #181818;
    padding:0;
    margin:0;
}

.button-container{
    display: flex;
    gap:30px;
}

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

hr{
    border: 1px solid white;
    width: 90vw;
}

.add-form{
    background-color: white;
    border-radius: 20px;
    padding:10px;
    height:fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:10px;
    width:45%;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
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

#add-post-btn{
    background-color: white;
    color: #181818;
}

#add-post-btn:hover{
    background-color: #42b883;
    color: white;
}
</style>
