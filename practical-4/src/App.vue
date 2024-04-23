<!--Hayley Dodkins u21528790-->
<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: 'App',
};
</script>



<style scoped>
    #app{
        background-color: #181818;
        width: 100vw;
        height:100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap:40px;
        padding:20px;
    }
</style>
