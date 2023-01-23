<template>
    <div class="c-card-1">
        <div class="warp">
            <div class="description-text mt-5">
                <div class="text-desc">ลิสต์ 3 ความคิดในใจ ที่เกิดในวันนี้</div>
            </div>
            <div class="input-container mt-10 p-5">
                <div>   
                    <input class="set-input-1 w-[80%] mr-4" placeholder="เรื่องที่ 1" v-model="$store.state.answerGoal1"/>
                    <button  
                        class="border border-stone-800 w-[30px] h-[30px] rounded-full text-slate-50 bg-slate-700 text-[10px]"
                        @click="haddleOpenMicGoal1"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-center m-auto">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                        </svg>
                    </button>
                </div>
                <div>   
                    <input class="set-input-2 w-[80%] mt-8 mr-4" placeholder="เรื่องที่ 2" v-model="$store.state.answerGoal2"/>
                    <button 
                        class="border border-stone-800 w-[30px] h-[30px] rounded-full text-slate-50 bg-slate-700 text-[10px]"
                        @click="haddleOpenMicGoal2"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-center m-auto">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                        </svg>
                    </button>
                </div>
                <div>   
                    <input class="set-input-3 w-[80%] mt-8 mr-4" placeholder="เรื่องที่ 3" v-model="$store.state.answerGoal3"/>
                    <button 
                        class="border border-stone-800 w-[30px] h-[30px] rounded-full text-slate-50 bg-slate-700 text-[10px]"
                        @click="haddleOpenMicGoal3"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-center m-auto">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                        </svg>
                    </button>
                </div>
                
            </div>
            <!-- <div >
                <button @click="debugText"> debug text</button>
            </div> -->
            <!-- <div class="btn-selfreport mt-[40px] p-5">
                <button class="border border-stone-800 w-[200px] h-[50px] rounded-lg text-slate-50 bg-slate-700" @click="haddleNextCard" >
                    ถัดไป
                </button>
            </div> -->
        </div>
    </div>
</template>

<script>
window.SpeechRecognition = window.SpeechRecognition ||  window.webkitSpeechRecognition;


export default {
    components:{

    },
    data(){
        return{
            openupMic: true
        }
    },
    computed:{

    },
    watch:{

    },
    methods:{   
        haddleCloseMic(state){
            console.log("state haddle mic off")
            recognition.lang = state.selectLang;
            recognition.stop();
            recognition.addEventListener("end", () => {
                recognition.stop();
            });
            state.setMic = "mic"
        },

        haddleSelectInput(evt){
            this.$store.commit("haddleCloseMic")
            this.$store.state.text = ""
            this.$store.state.clickGoalans =  evt
            // console.log("this.$store.state.text =>", this.$store.state.text)
        },
        haddleOpenMicGoal1(){
            const recognition = new window.SpeechRecognition();
            recognition.interimResults = true;
            recognition.continuous = true;
            recognition.lang = this.$store.state.selectLang;
            recognition.stop();
            recognition.addEventListener("end", () => {
                recognition.stop();
            });
            this.$store.state.setMic = "mic"
            
            recognition.addEventListener("result", event => {
                let text = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join("");
                this.$store.state.answerGoal1 = text;
            })
            recognition.start()
            this.$store.state.setMic = "off"
        },
        haddleOpenMicGoal2(){
            const recognition = new window.SpeechRecognition();
            recognition.interimResults = true;
            recognition.continuous = true;
            recognition.lang = this.$store.state.selectLang;
            recognition.lang = this.$store.state.selectLang;
            recognition.stop();
            recognition.addEventListener("end", () => {
                recognition.stop();
            });
            this.$store.state.setMic = "mic"
            
            recognition.addEventListener("result", event => {
                let text = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join("");
                this.$store.state.answerGoal2 = text;
            })
            recognition.start()
            this.$store.state.setMic = "off"
        },
        haddleOpenMicGoal3(){
            const recognition = new window.SpeechRecognition();
            recognition.interimResults = true;
            recognition.continuous = true;
            recognition.lang = this.$store.state.selectLang;
            recognition.lang = this.$store.state.selectLang;
            recognition.stop();
            recognition.addEventListener("end", () => {
                recognition.stop();
            });
            this.$store.state.setMic = "mic"
            
            recognition.addEventListener("result", event => {
                let text = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join("");
                this.$store.state.answerGoal3 = text;
            })
            recognition.start()
            this.$store.state.setMic = "off"
        },
        debugText(){
            console.log("debug this.$store.state.text =>", this.$store.state.text)
        }
    },
    mounted(){
        this.$store.state.isGoalCard = true
        this.$store.state.isUseMic = true
    }
}
</script>

<style scoped>
.set-input-1, .set-input-2, .set-input-3{
    text-indent: 10px;
    border-bottom: 2px solid rgb(165, 165, 165);
    background-color: #EFFAFF;
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

.set-input-2{
    animation: fadeIn-2 4.5s;
}

.set-input-3{
    animation: fadeIn-3 5s;
}


@keyframes fadeIn{
    0%{opacity: 0;}
    100%{opacity: 1;}
}


@keyframes fadeIn-1{
    0%{opacity: 0;}
    100%{opacity: 1;}
}
@keyframes fadeIn-2{
    0%{opacity: 0;}
    100%{opacity: 1;}
}
@keyframes fadeIn-3{
    0%{opacity: 0;}
    100%{opacity: 1;}
}
</style>