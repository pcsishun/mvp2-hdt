<template>
    <div class="set-re-do mt-[20px] mb-5 flex justify-center ">
        <button class="w-[300px] h-[60px] text-[20px] font-bold text-center bg-emerald-500 rounded-xl text-white">ทำแบบทดสอบอารมณ์</button>
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

</style>