<!--Hayley Dodkins u21528790-->


<template>
<header>
    <h1>Favorite Movie List</h1>
    <div class="container">
        <Input @addMovie="addMovie" :isFull="isFull"  @inputFull="isFull = true"></Input>
        <List :movies="movies" @removeMovie="removeMovie"></List>
    </div>
</header>


</template>

<script>
import Input from "./components/Input.vue";
import List from "./components/List.vue";

export default {
    name: 'App',
    components: {
        Input,
        List
    },
    data() {
        return {
            movies: [],
            isFull: false,
        };
    },
    methods: {
        addMovie(movie) {
            if (this.movies.length < 10) {
                this.movies.push(movie);
                this.isFull = this.movies.length === 10;
            }
        },
        removeMovie(index) {
            this.movies.splice(index, 1);
            this.isFull = false;
        },
    },
}
</script>



<style scoped>
*{
    font-family: Roboto,sans-serif;
    overflow-x: hidden;
}
header{
    display: flex;
    flex-direction: column;
    background-color: #222222;
}
 .container{
     display: flex;
     flex-direction: column;
     width:100vw;
     height:100vh;
     background-color: #222222;
     align-items: center;
     overflow-x: hidden;
 }

 h1{
     display: flex;
     justify-content: center;
     align-items: center;
     color:white;
     font-size: 50px;
 }

@media (min-width: 1024px) {

}
</style>
