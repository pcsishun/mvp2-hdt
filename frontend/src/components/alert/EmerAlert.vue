<template>
    <div >
        <div class="desc-status"> 
            <div class="text-[14px] bg-none title-status font-bold border-b border-gray-400/[0.8]">
                ภาพรวมอารมณ์ประจำวันของคุณ {{ name }}    
            </div>
            <!-- <div class="desc-text">
                Your current status is lower than a target, do you need help?
            </div>
            <div class="get-help flex mt-5 text-yellow-500">
                <div class="font-bold">
                    <button class="w-[150px] h-[40px] border-2 border-yellow-500 rounded-lg" @click="haddleToSuggestPage">Get help now</button>   
                </div>
                <div class="ml-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M11.484 2.17a.75.75 0 011.032 0 11.209 11.209 0 007.877 3.08.75.75 0 01.722.515 12.74 12.74 0 01.635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 01-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 01.722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zM12 15a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H12z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
    components:{
        RouterLink
    },
    data(){
        return{
            name:""
        }
    },
    methods:{
        haddleToSuggestPage(){  
            this.$router.push("/suggestions")
        }
    },
    mounted(){
        this.name = this.$cookies.get("hdt-user")
    }
}
</script>

<style scoped>

 
</style>