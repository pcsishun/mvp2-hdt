<template>
    <div class="btn-emer-container">
        <div>   
            <button class="w-[80%] h-[50px] text-white bg-red-600 rounded-xl">อารมณ์ฉุกเฉิน</button>
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

<style>

</style>