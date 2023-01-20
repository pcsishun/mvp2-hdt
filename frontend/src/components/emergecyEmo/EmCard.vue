<template>
    <div class="a-card-1">
        <div class="warp w-[95%] m-auto text-center">
            <div class="description-text mt-5 mb-10">
                <div class="text-desc">เล่าให้ฟังได้นะ ตอนนี้เกิดอะไรเหรอ</div>
            </div>
            <div class="input-container  p-5">
                <textarea class="set-input-1 w-[90%] h-[100px]" placeholder="" v-model="$store.state.answerCard"></textarea>
            </div>
            <div class="flex justify-end mr-10">
                <button v-if="this.$store.state.isMic === false"  class="border-2 border-gray-600 rounded-full w-[40px] h-[40px]" @click="this.$store.commit('haddleOpenMic')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-center m-auto">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                    </svg>
                </button>
                <button v-if="this.$store.state.isMic === true" class="border-2 border-gray-600 rounded-full w-[40px] h-[40px]" @click="this.$store.commit('haddleOpenMic')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-center m-auto">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                </button>
            </div>
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
        haddleMicCard(){

        }
    },
    mounted(){
    }
}
</script>

<style scoped>
.set-input-1{
    text-indent: 10px;
    border-bottom: 1px solid rgb(165, 165, 165);
    border-top: 1px solid rgb(165, 165, 165);
    border-left: 1px solid rgb(165, 165, 165);
    border-right: 1px solid rgb(165, 165, 165);
    background-color: #EFFAFF;
    border-radius: 10px;
}

.set-input:focus{
    outline: none;
}

.set-input::placeholder{
    margin-left: 20px;
}

.text-desc{
    animation: fadeIn 2s;
}

.set-input-1{
    animation: fadeIn-1 4s;
}



@keyframes fadeIn{
    0%{opacity: 0;}
    100%{opacity: 1;}
}


@keyframes fadeIn-1{
    0%{opacity: 0;}
    100%{opacity: 1;}
}

</style>