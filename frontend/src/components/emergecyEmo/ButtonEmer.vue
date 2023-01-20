<template>
    <div class="btn-emer-container mt-4">
        <div class="flex">   
            <button class="focus-click w-[150px] h-[40px] text-red-800 border-2 border-red-800 rounded-lg" @click="haddleRouterEmer">
                อารมณ์ฉุกเฉิน
            </button>
            <div class="mt-1 ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-red-800">
                    <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clip-rule="evenodd" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        haddleRouterEmer(){
            this.$router.push("/emergency")
        }
    }
}
</script>

<style  lang="scss" scoped>
.focus-click:focus{
    background: rgb(153 27 27);  
    background: linear-gradient(110deg, rgb(153 27 27) 8%, #FFFFFF 18%, rgb(153 27 27) 33%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 1.5s focus-c linear infinite;
    color: white
}

@keyframes focus-c {
    to{
        background-position-x: -200%;
    }
}

</style>