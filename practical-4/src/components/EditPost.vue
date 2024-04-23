<!--Hayley Dodkins u21528790-->
<template>
    <form @submit.prevent="updatePost">
        <input v-model="updatedPostTitle" placeholder="Title" />
        <textarea v-model="updatedPostBody" placeholder="Body"></textarea>
        <button type="submit">Update Post</button>
    </form>
</template>


<script>
import { ref } from 'vue';

export default {
    props: {
        post: {
            required: true,
        },
    },
    setup(props, { emit }) {
        console.log(props.post)
        const updatedPostTitle = ref(props.post.title);
        const updatedPostBody = ref(props.post.body);

        const updatePost = () => {
            emit('update', { title: updatedPostTitle.value, body: updatedPostBody.value });
        };

        return {
            updatedPostTitle,
            updatedPostBody,
            updatePost,
        };
    },
};
</script>

<style scoped>
    *{
        font-family: "Montserrat", sans-serif;
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
    form{
        display: flex;
        flex-direction: column;
        gap:20px;
        align-items: center;
        width:100%;
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
</style>

