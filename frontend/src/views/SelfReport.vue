<template>
    <div class="set-menu">
        <Navbar/>
        <Menu/>
    </div>
    <div class="self-report-container w-[95%] m-auto">
        <div class="title text-center mt-20 text-[20px] font-bold">บันทึกเรื่องราวของฉันประจำวัน</div>
        <div class="set-description mt-10  text-center p-5">
            <div class="description-text mt-5">
                <div>สุขภาพจิตดีขึ้นได้ง่าย ๆ การบันทึกเรื่องราวประจำวันช่วยให้เราได้รับรู้ถึงเหตุการ์ณที่ผ่านมาต่าง ๆ ที่ผ่านมา</div>
                <div class="flex justify-around mt-10">
                    <div>
                        <img src="../assets/camera.png" height="550" width="550"/>
                    </div>
                    <div class="mt-5 text-left ml-3">ระบบจะมีการใช้ AI ตรวจจับภาวะอารมณ์จากทางใบหน้าผู้ใช้ ทางระบบจะไม่มีการเก็บรูปหน้าของ user</div>
                </div>
            </div>
            <div class="btn-selfreport mt-20 p-5">
                <button class="border border-stone-800 w-[200px] h-[50px] rounded-lg text-slate-50 bg-slate-700">
                    เริ่มต้น
                </button>
            </div>
        </div>
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
            cardStep: 0
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
.set-description{
    border: 1px solid grey;
    border-radius: 10px;
}
</style>