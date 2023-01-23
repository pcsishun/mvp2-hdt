<template>
    <div class="nav-tab h-[60px] mb-10">
        <div class="grid grid-cols-2">
            <div class="text-left  mr-5 mt-3.5 flex justify-start">
                <!-- <div class="avatar ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                    </svg>
                </div> -->
                <div class="ham-menu ml-4">
                    <HamburgerVue/>
                </div> 
            </div>
            <div class="text-right">
                <!-- <div class="icon-alert float-right mr-5 mt-3.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clip-rule="evenodd" />
                    </svg>
                </div> -->
                <div class="flex justify-end  mt-4 mr-5" @click="haddleHome">
                    <div><img class="-translate-y-2 mr-2" src="../../assets/logo.png" width="40" height="40"/></div>
                    <div class="app-name text-[20px] text-cyan-500/[0.8] font-bold">SookYen</div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>

import HamburgerVue from './navbarComponent/Hamburger.vue';

export default {
    components:{
        HamburgerVue,
    },
    data(){
        return{

        }
    },
    methods:{
        haddleHome(){
            this.$router.push("/")
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100;200;300;400;500;600&display=swap');
.nav-tab{
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
}

.app-name{
    font-family: 'Noto Sans Thai', sans-serif;
}
</style>