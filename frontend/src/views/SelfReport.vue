<template>
    <div class="set-menu">
        <Navbar/>
        <Menu/>
    </div>
    <div class="self-report-container w-[95%] m-auto">
        <div class="title text-center mt-5">Self Report </div>
    </div>
</template>

<script>
import Navbar from '../components/navbar/Navbar.vue'
import Menu from '../components/menu/Menu.vue'

export default {
    components:{
        Navbar,
        Menu
    },
    data(){
        return{

        }
    },
    computed:{

    },
    watch:{

    },
    methods:{

    },
    mounted(){

    }
}
</script>

<style scoped>

</style>