<template>
    <div class="set-re-do mt-[50px] mb-[50px] flex justify-center ">
        <button class="w-[300px] h-[60px] text-[20px] font-bold text-center bg-emerald-500 rounded-xl text-white" @click="haddleSelfReport">ทำแบบทดสอบอารมณ์</button>
    </div>
</template>

<script>
export default {
    methods:{
        haddleSelfReport(){
            this.$router.push("/self_report")
        }
    }
}
</script>

<style scoped>
button{
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

button:focus{
    background: rgb(14, 137, 96);
}
</style>