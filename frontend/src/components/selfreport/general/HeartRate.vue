<template>
    <div class="heart-rate-container">
        <div class="warp">
            <div class="description-text mt-5">
                <div class="text-desc mb-5">ขั้นตอนสุดท้ายแล้ว</div>
                <div class="flex justify-center">
                    <div class="text-desc-2 pl-5 pr-5">
                        <img src="../../../assets/face-scan.png" height="200" width="200"/>
                    </div>
                    <div class="text-desc-2 mt-4">
                        <div>
                            ตรวจจับอัตราการเต้นของหัวใจโดยผ่านระบบกล้อง 
                        </div>  
                        <div class="mt-2">
                            <b class="text-desc-3">
                                กรุณาอยู่ในพื้นที่สว่างเพื่อความเพิ่มความแม่นยำ
                            </b>
                        </div>  
                    </div>
                </div>
                <div class="cam-action text-center m-auto rounded-lg mt-5 w-[85%]" >
                    <video 
                        hidden
                        class="rounded-lg text-center"
                        id="webcam" 
                        width="300" 
                        height="300"
                        ></video>
                    <canvas class="rounded-lg text-center" id="canvas" width="300" height="300"></canvas>
                </div>
                
            </div>
            <div class="set-input-1  mt-5 p-5  w-[80%]  m-auto">
                <button class="" @click="activeCamera" v-if="isRec === false">เริ่มบันทึก</button>
                <div class="text-center" v-if="isRec === true">
                    <p>กำลังบันทึก</p>
                    <p id="set-signal"></p>
                    <div class="font-bold">   
                        <p id="percent-finish"></p>
                        <p id="mean-bpm"></p>
                    </div>
                </div>
            </div>
            <!-- <div class="set-input-1  mt-5 p-5  w-[80%]  m-auto">
                <button>กรอกค่าอัตราการเต้นหัวใจ</button>
            </div> -->
            
            <!-- <div class="input-container mt-10 p-5">
                <textarea class="set-input-1 w-[90%] h-[100px]" placeholder=""></textarea>
            </div> -->
        </div>
    </div>
</template>

<script>
import { Heartbeat } from '../../../heart_rate/heartbeat'
const OPENCV_URI = "https://docs.opencv.org/master/opencv.js"


export default {
    components:{

    },
    data(){
        return{
           isRec: false
        }
    },
    computed:{

    },
    watch:{

    },
    methods:{
        async loadOpenCv(uri){
            return new Promise(function(resolve, reject) {
                console.log("starting to load opencv");
                var tag = document.createElement('script');
                // console.log("tag =>", tag)
                tag.src = uri;
                // console.log("tag.src =>", tag.src)
                tag.async = true;
                // console.log("tag.async =>", tag.async)
                tag.type = 'text/javascript'
                // console.log("tag.type =>", tag.type)
                tag.onload = () => {
                    cv['onRuntimeInitialized'] = () => {
                        console.log("opencv ready");
                        resolve();
                    }
                };
                tag.onerror = () => {
                throw new URIError("opencv didn't load correctly.");
                };
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            });
        },

        activeCamera(){
            this.isRec = true
            const HAARCASCADE_URI = "../../../heart_rate/haarcascade_frontalface_alt.xml"
            console.log("action cam!")
            let demo = new Heartbeat("webcam", "canvas", HAARCASCADE_URI, 30, 6, 250);
            var ready = this.loadOpenCv(OPENCV_URI);
            ready.then(function() {
            demo.init();
            });
        }
    },
    mounted(){
        this.$store.state.isUseMic = false
    },
    updated() {
        // if(this.$store.state.myRatebpm.lenght >= 20){
        //     console.log("array bpm rate => ",this.$store.state.myRatebpm)
        // }
    },

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

.text-desc-2{
    animation: fadeIn-1 3.5s; 
}

.text-desc-3{
    animation: fadeIn-2 4s; 
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

.cam-action{
    border: 1px solid rgb(220, 220, 220);
}
</style>
