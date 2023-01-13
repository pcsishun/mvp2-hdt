<template>
    <div class="a-card-4">
        <div class="warp">
            <div class="description-text mt-5">
                <div class="text-desc">พอพูดถึงเรื่องนี้เเล้วรู้สึกอย่างไร</div>
            </div>
            <div class="input-container mt-10 p-5">
                <textarea class="set-input-1 w-[90%] h-[100px]" placeholder="" @click="haddleSelectInput(0)" v-model="$store.state.answerCard"></textarea>
            </div>
            <!-- <div class="btn-selfreport mt-[40px] p-5">
                <button class="border border-stone-800 w-[200px] h-[50px] rounded-lg text-slate-50 bg-slate-700" @click="haddleNextCard" >
                    ถัดไป
                </button>
            </div> -->
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
        haddleSelectInput(evt){
            this.$store.state.isGoalCard = false
            this.$store.state.clickGoalans = evt
        }
    },
    mounted(){
        this.$store.state.isUseMic = true
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