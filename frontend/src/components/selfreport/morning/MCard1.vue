<template>
    <div class="c-card-1">
        <div class="warp">
            <div class="description-text mt-5">
                <div class="text-desc">วันนี้มีแผนจะทำอะไรบ้างหรือเปล่าค่ะ ช่วยบอกอย่างน้อย 3 เรื่องด้วยค่ะ</div>
            </div>
            <div class="input-container mt-10 p-5">
                <div>   
                    <input class="set-input-1 w-[80%] mr-4" placeholder="เรื่องที่ 1" v-model="$store.state.answerGoal1"/>
                    <button  
                        class="border border-stone-800 w-[30px] h-[30px] rounded-full text-slate-50 bg-slate-700 text-[10px]"
                        @click="haddleOpenMicGoal1"
                        >
                        <b>mic</b>
                    </button>
                </div>
                <div>   
                    <input class="set-input-2 w-[80%] mt-8 mr-4" placeholder="เรื่องที่ 2" v-model="$store.state.answerGoal2"/>
                    <button 
                        class="border border-stone-800 w-[30px] h-[30px] rounded-full text-slate-50 bg-slate-700 text-[10px]"
                        @click="haddleOpenMicGoal2"
                        >
                        <b>mic</b>
                    </button>
                </div>
                <div>   
                    <input class="set-input-3 w-[80%] mt-8 mr-4" placeholder="เรื่องที่ 3" v-model="$store.state.answerGoal3"/>
                    <button 
                        class="border border-stone-800 w-[30px] h-[30px] rounded-full text-slate-50 bg-slate-700 text-[10px]"
                        @click="haddleOpenMicGoal3"
                        >
                        <b>mic</b>
                    </button>
                </div>
                <!-- <div class="btn-selfreport mt-[40px] p-5">
                    <button  class="border border-stone-800 w-[200px] h-[50px] rounded-lg text-slate-50 bg-slate-700" @click="haddleNextCard('con')" v-if="$store.state.stepCard !== 0 && $store.state.stepCard < 7" >
                        ถัดไป
                    </button>
                </div> -->
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
            window.SpeechRecognition = window.SpeechRecognition ||  window.webkitSpeechRecognition;
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
            window.SpeechRecognition = window.SpeechRecognition ||  window.webkitSpeechRecognition;
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
            window.SpeechRecognition = window.SpeechRecognition ||  window.webkitSpeechRecognition;
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
    },
    beforeUnmount() {
        console.log("close mic")
        window.SpeechRecognition = window.SpeechRecognition ||  window.webkitSpeechRecognition;
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
    },
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