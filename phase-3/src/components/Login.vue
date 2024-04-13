<template>
    <div id="loginPage">
        <h1>Login</h1>
        <form>
            <input v-model="username" type="text" name="username" id="username" placeholder="Username"/>
            <input v-model="password" type="password" name="password" id="password" placeholder="Password"/>
        </form>
        <button @click="login">Login</button>
    </div>

</template>

<style scoped>
  #loginPage{
      display: flex;
      flex-direction: column;
      width: 50vw;
      height:50vh;
      align-items: center;
      gap:50px;
  }

  form{
      display: flex;
      flex-direction: column;
      gap:30px;
      align-items: center;
  }

  input{
      border-radius: 10px;
      border: none;
      outline: none;
      padding:5px;
      font-size: 18px;
  }

  button{
      border-radius: 10px;
      border: none;
      outline: none;
      padding:10px;
      font-size: 18px;
      cursor: pointer;
  }

  button:hover{
      background-color: plum;
      color: white;
  }
</style>

<script >
import { ref } from 'vue';
import { useStore } from '../store.js';
import router from '../router';

export default {
    setup() {
        const store = useStore();
        const username = ref('');
        const password = ref('');

        const login = async () => {
            try {
                const id = generateRandomId();
                await store.loginUser(username.value,id,password.value,'customer');
                console.log("Logged in successfully!");
                router.push('/');
            } catch (error) {
                console.error('Error logging in:', error);
            }
        };

        return {
            username,
            password,
            login
        };
    }
};

function generateRandomId(){
    const idLength = 6; // Length of the generated ID
    const characters = '0123456789'; // Characters to choose from for the ID
    let result = '';

    for (let i = 0; i < idLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}
</script>