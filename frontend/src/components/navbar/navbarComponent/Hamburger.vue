<template>
    <button @click="haddleMenu">
        <div :class="$store.state.cssHamOpenTB"></div>
        <div :class="cssHamOpenMd"></div>
        <div :class="$store.state.cssHamOpenTB"></div>
    </button>
</template>

<script>
export default {
    components:{
        
    },
    data(){
        return{
            cssHamOpenMd: "ham-mid-close"
        }
    },
    methods:{
        haddleMenu(){
            if(this.$store.state.cssHamOpenTB === "ham-tb-close"){
                this.$store.state.cssHamOpenTB = "ham-tb-open"
                this.$store.state.cssMenu = "menu-open"
                this.$store.state.cssBodyMenu = "body-menu-open"
            }else{
                this.$store.state.cssMenu = "menu-close"
            }
        }
    }
}

</script>

<style scoped>
.ham-tb-close{
    width: 40px;
    border-bottom: 5px solid black;
    margin-top: 4px;
    border-radius: 10px;
    transition:  1s;
}

.ham-mid-close{
    width: 40px;
    border-bottom: 5px solid black;
    margin-top: 4px;
    border-radius: 10px;
    transition:  1s;
}

.ham-tb-open{
    width: 30px;
    border-bottom: 5px solid black;
    margin-top: 4px;
    border-radius: 10px;
    transition: 1s;
}


</style>