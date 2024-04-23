<!--Hayley Dodkins u21528790-->
<template>
    <div id="todos">
        <div v-if="userIdDefined" class="todo-area-container">
            <h2 id="todos-username">{{ user.username }}</h2>
            <hr />
            <div v-for="todo in todos" :key="todo.id" class="todo-container">
                <div>
                    <input type="checkbox" :id="'todo-' + todo.id" v-model="todo.completed" @change="updateTodo(todo.id)" />
                    <label :for="'todo-' + todo.id" :class="{ 'completed': todo.completed }">{{ todo.title }}</label>
                    <button @click="deleteTodo(todo.id)" class="deleteBtn">X</button>
                </div>

            </div>
        </div>
        <template v-else id="form-input">
            <input v-model="userIdInput" placeholder="Enter User ID" />
            <button @click="fetchTodos">Fetch Todos</button>
        </template>
    </div>
</template>

<script>
import { useStore } from '../store/store.js';
import { ref, watch } from 'vue';
/*import { toast } from 'vue-toastification';*/

export default {
    props: {
        userId: {
            required: true,
        },
    },
    setup(props) {
        const userIdDefined = ref(false);
        const store = useStore();
        let userId = parseInt(props.userId);
        let user = {};
        const userIdInput = ref('');
        const users = store.users;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === userId) {
                user = users[i];
                break;
            }
        }

        let todos = [];

        const fetchTodos = async () => {
            userIdDefined.value = true;
            try{
                todos = await store.fetchTodos(userId);
               /* toast.success('Todos fetched successfully');*/
            }
            catch (error) {
                console.error('Failed to fetch todos:', error);
                /*toast.error('Failed to fetch todos');*/
            }
        };

        const updateTodo = async (todoId) => {
            try{
                await store.patchTodo(todoId);
                /*toast.success('Todo updated successfully');*/
            }
            catch (error) {
                console.error('Failed to update todo:', error);
                /*toast.error('Failed to update todo');*/
            }
        };

        const deleteTodo = async (todoId) => {
            try{
                await store.deleteTodo(todoId);
                todos = todos.filter((todo) => todo.id !== todoId);
                /*toast.success('Todo deleted successfully');*/
            }
            catch (error) {
                console.error('Failed to delete todo:', error);
                /*toast.error('Failed to delete todo');*/
            }
        };

        watch(() => props.userId, () => {
            if (props.userId) {
                userIdInput.value = props.userId; // Update userIdInput when userId prop changes
                store.userIdInput = props.userId;
                fetchTodos();
            }
        });

        return {
            userIdDefined,
            userId: store.userId,
            user,
            todos,
            fetchTodos,
            updateTodo,
            deleteTodo,
            userIdInput,
        };
    },
};
</script>

<style scoped>
*{
    font-family: "Montserrat", sans-serif;
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
.completed {
    text-decoration: line-through;
}

#form-input{
    display: flex;
    gap:30px;
}

.todo-container{
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 30px;
    font-size: 18px;
}

.todo-container > div{
    display: flex;
    gap:20px;
    justify-content: center;
    margin:10px;
    align-items: center;
}

.deleteBtn{
    background-color: transparent;
    box-shadow: none;
    color:darkred;
}

input[type="checkbox"]{
    cursor: pointer;
}

</style>