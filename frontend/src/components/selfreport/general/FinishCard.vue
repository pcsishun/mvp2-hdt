<template>
    <div class="mt-5">
        <div class="finish-container w-[90%] m-auto" >
            เสร็จเรียบร้อยแล้วค่ะ กดปุ่มด้านล่างเพื่อกลับไปหน้าเริ่มต้นได้เลยค่ะ
        </div>
    </div>
</template>

<script>
export default {
    components:{

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
        this.$store.state.isUseMic = false
    }
}
</script>

<style scoped>

</style>