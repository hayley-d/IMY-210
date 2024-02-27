<!--Hayley Dodkins u21528790-->
<template>
<div class = "list-container">
    <ol>
        <li v-for="(movie,index) in movies" :key="index">
            {{movie}}
            <button @click="removeMovie(index)">-</button>
        </li>
    </ol>
</div>
</template>

<script>
export default {
    name: 'List',
    props: ['movies'],
    methods: {
        removeMovie(index) {
            this.$emit('removeMovie', index);
        },
    },
};
</script>

<style scoped>

*{
    font-family: Roboto,sans-serif;
    overflow-x: hidden;
}

.list-container{
    width:30%;
    height:100%;

    min-width: 400px;
    display: flex;
    font-size: 20px;
    color:white;
}
ol {
    padding: 0;
    color:white;
    width:fit-content;
}

li {
    list-style: decimal;
    margin-bottom: 5px;
}

button{
    background-color: transparent;
    cursor: pointer;
    border:none;
    font-size: 30px;
    color:red;
}
</style>