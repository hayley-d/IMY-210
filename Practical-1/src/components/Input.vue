<!--Hayley Dodkins u21528790-->
<template>
  <div class = "input-container">
      <label for="movie-input">Enter a Movie Title</label>
      <input type="text" id = "text-input" name="movie-input" v-model="movieName" :class="{ 'full': isFull }" @keyup.enter="addMovie" placeholder="Enter movie title" ></input>
      <button id = "add-btn" @click="addMovie">Add to List</button>
  </div>
</template>

<script>
export default {
    name: 'Input',
    props: ['isFull'],
    data() {
        return {
            movieName: '',

        };
    },
    methods: {
        addMovie() {
            if (this.movieName.trim() !== '') {
                this.$emit('addMovie', this.movieName.trim());
                this.movieName = '';

                // Emit an event to the parent when the input is full
                if (this.isFull) {
                    this.$emit('inputFull');
                }
            }
        },
    },
};
</script>

<style scoped>
  #text-input{
      border-radius: 10px;
      font-size: 20px;
      padding:10px;
      border:none;
      outline: none;
  }

  button{
      border-radius: 10px;
      border:none;
      outline: none;
      font-size: 20px;
      padding:10px;
      cursor:pointer;
      background-color: palevioletred;
      color:white;
  }

  button:hover{
      background-color: darkgrey;
  }

  .input-container{
      display: flex;
      gap:20px;
      justify-content: center;
      align-items: center;
      width:50%;
      height:30vh;

  }

  label{
      font-size: 20px;
      color: white;
  }

  .full {
      border: 2px solid red;
  }
</style>