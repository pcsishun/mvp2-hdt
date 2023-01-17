<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Loading from './components/loading/Loading.vue';
// import Navbar from './components/navbar/Navbar.vue'
// import Menu from './components/menu/Menu.vue'
</script>

<template>
    <div class="wrapper"> 
      <Loading v-if="$store.state.loading === true"/>
      <div> 
        <RouterView />
      </div>
    </div>
</template>

<style>
/* google font */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100;200;300;400;500;600&display=swap');

body{
  padding: 0px;
  margin: 0px;
  background-color: #EFFAFF;
  font-family: 'Noto Sans Thai', sans-serif;
}


</style>
