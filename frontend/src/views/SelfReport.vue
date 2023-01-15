<template>
    <div class="set-menu">
        <Navbar/>
        <Menu/>
    </div>
    <div class="self-report-container w-[95%] m-auto pb-10">
        <div class="title text-center mt-20 text-[20px] font-bold">บันทึกเรื่องราวของฉันประจำวัน</div>
        <div class="set-description mt-10  text-center p-5" >
            <div class="warp" v-if="$store.state.stepCard === 0">
                <div class="description-text mt-5">
                    <div v-if="cardType === 'morning'">
                        มาเริ่มวันใหม่ของคุณกัน  การได้พูดคุยและได้ยินเสียงสะท้อนของตัวเองเป็นอีกตัวช่วยที่จะช่วยคุณในการวางแผนชีวิตประจำวันได้นะ  เริ่มกัน
                    </div>
                    <div v-if="cardType === 'afternoon'">
                        ก่อนเข้านอนคืนนี้ เรามาสรุปกันดีกว่าว่าวันนี้เจออะไรมาบ้าง
                    </div>
                    <div class="flex justify-around mt-10">
                        <div>
                            <img class="mt-5" src="../assets/camera.png" height="550" width="550"/>
                        </div>
                        <div class="mt-5 text-left ml-3">ระบบจะมีการใช้ AI ตรวจจับภาวะอารมณ์จากทางใบหน้าผู้ใช้ ทางระบบจะไม่มีการเก็บรูปหรือวีดีโอ user หากพร้อมแล้วสามารถกดปุ่มเริ่มต้นเพื่อเริ่มบันทึกเรื่องราวประจำวัน</div>
                    </div>
                    <div class="description-text mt-[100px]">
                        Application นี้เป็นพื้นที่เพื่อรับฟัง สะท้อนความรู้สึกที่เฉพาะสำหรับคุณเท่านั้น เพื่อการรู้จักตัวเองที่มากขึ้น ดังนั้นข้อมูลของคุณจะมีความเป็นส่วนตัวเฉพาะคุณ
                    </div>
                </div>
            </div>
            <div class="see">
                <video
                id="myVideo"
                poster="https://dummyimage.com/800x600"
                muted
                loop
                playsinline
                @loadedmetadata="fnRun"
                hidden
                ></video>
                <canvas id="myCanvas" hidden />
            </div>
            
            <MCard1Vue v-if="cardType === 'morning' &&  $store.state.stepCard === 1"/> <!--  1 -->
            <MCard2Vue v-if="cardType === 'morning' &&  $store.state.stepCard === 2"/> <!--  2 -->
            <MCard3Vue v-if="cardType === 'morning' &&  $store.state.stepCard === 3"/> <!--  3 -->
            <ACard1Vue v-if="cardType === 'afternoon' &&  $store.state.stepCard === 1"/> <!--  1 -->
            <ACard2Vue v-if="cardType === 'afternoon' &&  $store.state.stepCard === 2"/> <!--  2 -->
            <ACard3Vue v-if="cardType === 'afternoon' &&  $store.state.stepCard === 3"/> <!--  3 -->
            <ACard4Vue v-if="cardType === 'afternoon' &&  $store.state.stepCard === 4"/> <!--  4 -->
            <ParameterVue v-if="$store.state.stepCard === 5"/><!--  5 -->
            <SubEmotion v-if="$store.state.stepCard === 6"/><!--  6 -->
            <HeartRateVue v-if="$store.state.stepCard === 7"/><!--  7 -->
            <FinishCardVue v-if="$store.state.stepCard === 8"/><!--  8 -->
            <div class="text-center text-red-700 mt-3 p-3">{{isError}}</div>
            <div class="btn-selfreport mt-[40px] p-5">
                <div class="text-right" v-if="$store.state.isGoalCard !== true && $store.state.isUseMic !== false">
                    <button class="border border-stone-800 w-[50px] h-[50px] rounded-full text-slate-50 bg-slate-700" @click="this.$store.commit('haddleOpenMic')" v-if="$store.state.stepCard !== 0 && $store.state.stepCard < 7 && $store.state.setMic === 'mic'">mic</button>
                    <button class="border border-stone-800 w-[50px] h-[50px] rounded-full text-slate-50 bg-slate-700" @click="this.$store.commit('haddleCloseMic')" v-if="$store.state.stepCard !== 0 && $store.state.stepCard < 7 && $store.state.setMic === 'off'">off</button>
                </div>
                <button class="border border-stone-800 w-[200px] h-[50px] rounded-lg text-slate-50 bg-slate-700" @click="haddleNextCard('start')" v-if="$store.state.stepCard === 0">
                    เริ่มต้น
                </button>
                <button class="border border-stone-800 w-[200px] h-[50px] rounded-lg text-slate-50 bg-slate-700" @click="haddleNextCard('con')" v-if="$store.state.stepCard !== 0 && $store.state.stepCard < 8 " >
                    ถัดไป
                </button>
                <button class="border border-stone-800 w-[200px] h-[50px] rounded-lg text-slate-50 bg-slate-700" @click="haddleFinish" v-if="$store.state.stepCard === 8" >
                    เสร็จสิ้น
                </button>
                <!-- <button class="border border-stone-800 w-[200px] h-[50px] rounded-lg text-slate-50 bg-slate-700" hidden @click="haddleDebug">debug</button> -->
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/navbar/Navbar.vue'
import Menu from '../components/menu/Menu.vue'

// morning //
import MCard1Vue from '../components/selfreport/morning/MCard1.vue'
import MCard2Vue from '../components/selfreport/morning/MCard2.vue'
import MCard3Vue from '../components/selfreport/morning/MCard3.vue'

// afternoon //
import ACard1Vue from '../components/selfreport/afternoon/ACard1.vue'
import ACard2Vue from '../components/selfreport/afternoon/ACard2.vue'
import ACard3Vue from '../components/selfreport/afternoon/ACard3.vue'
import ACard4Vue from '../components/selfreport/afternoon/ACard4.vue'

// general card //
import ParameterVue from '../components/selfreport/general/Parameter.vue'
import SyncDeviceVue from '../components/selfreport/general/SyncDevice.vue'
import SubEmotion from '../components/selfreport/general/SubEmotion.vue'
import HeartRateVue from '../components/selfreport/general/HeartRate.vue'
import FinishCardVue from '../components/selfreport/general/FinishCard.vue'

import * as faceapi from "face-api.js"
import axios from 'axios'


export default {
    components:{
        Navbar,
        Menu,
        MCard1Vue,
        MCard2Vue,
        MCard3Vue,
        ACard1Vue,
        ACard2Vue,
        ACard3Vue,
        ACard4Vue,
        ParameterVue,
        SyncDeviceVue,
        SubEmotion,
        HeartRateVue,
        FinishCardVue
    },
    data(){
        return{
            // $store.state.stepCard: 0,
            cardType: "",
            isReport:"",
            countResult: 0,
            nets: "tinyFaceDetector", 
            options: null,
            withBoxes: true,
            detectFace: "detectSingleFace",
            detection: "expression",
            videoEl: null,
            canvasEl: null,
            // setMic: "mic",
            timeout: 0,
            setAnger:[],
            setDisgusted:[],
            setFearful:[],
            setHappy:[],
            setNeutral:[],
            setSad:[],
            setSurprised:[],
            isRecord: false,
            // selectLang: 'th-TH',
            constraints: {
                audio: false,
                video: {
                    width: {
                        min: 320,
                        ideal: 1280,
                        max: 1920,
                    },
                    height: {
                        min: 240,
                        ideal: 720,
                        max: 1080,
                    },
                    frameRate: {
                        min: 10,
                        ideal: 10,
                        max: 10,
                    },
                    facingMode: "environment",
                },
            },
            angry: null,
            disgusted: null,
            fearful: null,
            happy: null,
            neutral: null,
            surprised: null,
            isError: null
            // setMic:'mic'
        }
    },
    watch: {
        nets(val) {
                this.nets = val;
                this.fnInit();
            },
            detection(val) {
            this.detection = val;
            this.$store.state.videoEl.pause();
            setTimeout(() => {
                this.$store.state.videoEl.play();
                setTimeout(() => this.fnRun(), 300);
            }, 300);
        },
    },
    mounted() {
        this.$nextTick(() => {
        this.fnInit();
        });
    },
    beforeMount(){
        this.controllCard();
    },
    methods:{
        
        async haddleFinish(){
            try{
                // POST TO Backend_emotion //
                const headerConf = {
                    headers:{
                        "access-token": this.$cookies.get("hdt-token")
                    }
                }
                const payload = {
                    
                }

                const resultInsert =  await axios.post("https://.../api/insertData", payload,headerConf)
                console.log("POST finish")
                // ==== //
                alert("ระบบทำการบันทึกเสร็จเรียบร้อย")
                location.reload()
            }catch(err){
                console.log(err)
            }
        },  
        haddleDebug(){
            console.log("answerAndEmotion ==> ",this.$store.state.answerAndEmotion)
            console.log("parameter emotion ==> ", this.$store.state.emotionSlide, "and wieght", this.$store.state.weightEmotion)
            console.log("bpm rate:", this.$store.state.myRatebpm, "average bpm => ", this.$store.state.averageBpm)
            console.log("emotionSlide =>", this.$store.state.emotionSlide , "weightEmotion =>", this.$store.state.weightEmotion)
            console.log("happySubEmo", this.$store.state.happySubEmo)
            console.log("averageBpm => ", this.$store.state.averageBpm)
        },
        controllCard(){
            const d = new Date();
            const hours = d.getHours();
            if(hours <= 12 && hours > 0){
                this.cardType = "morning" // morning
            }else{
                this.cardType = "afternoon" // afternoon
            }
        },
        
        // start face cam // 
        haddleNextCard(){
            
            this.isError = null
            // console.log("step card => ", this.$store.state.stepCard)
            if(this.$store.state.stepCard >= 5){
                this.$store.state.stepCard += 1
            }else if(this.isReport === 'none' && this.$store.state.stepCard === 7){
                this.$store.commit('fnClose')
            }

            if(this.$store.state.stepCard === 0){
                this.fnOpen();
                this.$store.state.stepCard += 1;

            }else if (this.isReport !== 'none'){
                this.$store.state.stepCard += 1;
                if(this.$store.state.isGoalCard === false && this.$store.state.answerCard !== "" && this.$store.state.answerCard !== null && this.$store.state.answerCard !== NaN){
                    const averageAnger = this.setAnger.reduce((a, b) => a + b, 0) / this.setAnger.length;
                    const averageDisgusted = this.setDisgusted.reduce((a, b) => a + b, 0) / this.setDisgusted.length;
                    const averageFearful = this.setFearful.reduce((a, b) => a + b, 0) / this.setFearful.length;
                    const averageHappy = this.setHappy.reduce((a, b) => a + b, 0) / this.setHappy.length;
                    const averageNeutral = this.setNeutral.reduce((a, b) => a + b, 0) / this.setNeutral.length;
                    const averageSad = this.setSad.reduce((a, b) => a + b, 0) / this.setSad.length;
                    const averageSurprised = this.setSurprised.reduce((a, b) => a + b, 0) / this.setSurprised.length;
                    if(this.cardType === 'afternoon'){
                        const payload = {
                            timing: "afternoon",
                            anger: averageAnger,
                            disgusted:averageDisgusted,
                            fearful:averageFearful,
                            happy:averageHappy,
                            neutral:averageNeutral,
                            sad:averageSad,
                            surprised:averageSurprised,
                            answer: this.$store.state.answerCard,
                        }
                        // console.log("afternoon payload => ", payload)
                        this.setAnger = []
                        this.setDisgusted = []
                        this.setFearful = []
                        this.setHappy = []
                        this.setNeutral = []
                        this.setSad = []
                        this.setSurprised = []
                        this.$store.state.answerAndEmotion.push(payload)
                        this.$store.state.answerCard = ""
                        this.$store.state.answerGoal1 = ""
                        this.$store.state.answerGoal2 = ""
                        this.$store.state.answerGoal3 = ""
                        this.$store.commit('haddleCloseMic');
                        this.$store.state.isGoalCard = false
                        if(this.$store.state.stepCard === 5){
                            this.$store.commit('fnClose')
                            this.isReport = "none"
                            // this.$store.state.stepCard += 1
                        }
                    }else if(this.cardType === 'morning'){
                        const payload = {
                            timing: "morning",
                            anger: averageAnger,
                            disgusted:averageDisgusted,
                            fearful:averageFearful,
                            happy:averageHappy,
                            neutral:averageNeutral,
                            sad:averageSad,
                            surprised:averageSurprised,
                            answer: this.$store.state.answerCard,
                            }
                        // console.log("morning payload => ", payload)
                        this.setAnger = []
                        this.setDisgusted = []
                        this.setFearful = []
                        this.setHappy = []
                        this.setNeutral = []
                        this.setSad = []
                        this.setSurprised = []
                        this.$store.state.answerAndEmotion.push(payload)
                        this.$store.state.answerCard = ""
                        this.$store.state.answerGoal1 = ""
                        this.$store.state.answerGoal2 = ""
                        this.$store.state.answerGoal3 = ""
                        this.$store.commit('haddleCloseMic')
                        this.$store.state.isGoalCard = false
                        if(this.$store.state.stepCard === 4){
                            this.$store.commit('fnClose')
                            this.isReport = "none"
                            this.$store.state.stepCard += 1
                        }
                    }
                }else if(this.$store.state.isGoalCard === true && this.$store.state.answerGoal1 !== "" && this.$store.state.answerGoal1 !== null && this.$store.state.answerGoal1 !== NaN){
                    const averageAnger = this.setAnger.reduce((a, b) => a + b, 0) / this.setAnger.length;
                    const averageDisgusted = this.setDisgusted.reduce((a, b) => a + b, 0) / this.setDisgusted.length;
                    const averageFearful = this.setFearful.reduce((a, b) => a + b, 0) / this.setFearful.length;
                    const averageHappy = this.setHappy.reduce((a, b) => a + b, 0) / this.setHappy.length;
                    const averageNeutral = this.setNeutral.reduce((a, b) => a + b, 0) / this.setNeutral.length;
                    const averageSad = this.setSad.reduce((a, b) => a + b, 0) / this.setSad.length;
                    const averageSurprised = this.setSurprised.reduce((a, b) => a + b, 0) / this.setSurprised.length;
                    if(this.cardType === 'afternoon'){
                        const payload = {
                            timing: "afternoon",
                            anger: averageAnger,
                            disgusted:averageDisgusted,
                            fearful:averageFearful,
                            happy:averageHappy,
                            neutral:averageNeutral,
                            sad:averageSad,
                            surprised:averageSurprised,
                            answer: [
                                this.$store.state.answerGoal1,
                                this.$store.state.answerGoal2,
                                this.$store.state.answerGoal3,
                            ],
                        }
                        // console.log("goal afternoon payload => ", payload)
                        this.setAnger = []
                        this.setDisgusted = []
                        this.setFearful = []
                        this.setHappy = []
                        this.setNeutral = []
                        this.setSad = []
                        this.setSurprised = []
                        this.$store.state.answerAndEmotion.push(payload)
                        this.$store.state.answerCard = ""
                        this.$store.state.answerGoal1 = ""
                        this.$store.state.answerGoal2 = ""
                        this.$store.state.answerGoal3 = ""
                        this.$store.commit('haddleCloseMic');
                        this.$store.state.isGoalCard = false
                        // console.log("set 4 answerCard => ", this.$store.state.answerCard)
                    }else if(this.cardType === 'morning'){
                        const payload = {
                            timing: "morning",
                            anger: averageAnger,
                            disgusted:averageDisgusted,
                            fearful:averageFearful,
                            happy:averageHappy,
                            neutral:averageNeutral,
                            sad:averageSad,
                            surprised:averageSurprised,
                            answer: [
                                this.$store.state.answerGoal1,
                                this.$store.state.answerGoal2,
                                this.$store.state.answerGoal3,
                                ],
                            }
                        // console.log("goal morning payload => ", payload)
                        this.setAnger = []
                        this.setDisgusted = []
                        this.setFearful = []
                        this.setHappy = []
                        this.setNeutral = []
                        this.setSad = []
                        this.setSurprised = []
                        this.$store.state.answerAndEmotion.push(payload)
                        this.$store.state.answerCard = ""
                        this.$store.state.answerGoal1 = ""
                        this.$store.state.answerGoal2 = ""
                        this.$store.state.answerGoal3 = ""
                        this.$store.commit('haddleCloseMic')
                        this.$store.state.isGoalCard = false
                        // console.log("set 5 answerCard => ", this.$store.state.answerCard)
                    }
                }else{
                    // console.log(this.$store.state.stepCard)
                    if(this.$store.state.stepCard === 7){
                        const setAverageBpm =  this.$store.state.myRatebpm.reduce((a, b) => a + b, 0) / this.$store.state.myRatebpm.length;
                        this.$store.state.averageBpm = setAverageBpm
                    }else{
                        this.$store.state.stepCard -= 1
                        this.isError = "กรุณาตอบคำถามในช่องว่าง"
                    }
                }
            }
        }, 

        sleepFunc(milliseconds){
            const date = Date.now();
            let currentDate = null;
            do {
                currentDate = Date.now();
            } while (currentDate - date < milliseconds);
        },

        async fnInit() {
            await faceapi.nets[this.nets].loadFromUri("/models"); // 
            await faceapi.loadFaceLandmarkModel("/models"); // 
            await faceapi.loadFaceExpressionModel("/models"); // 
            // await faceapi.loadAgeGenderModel("../../public/models"); 
            switch (this.nets) {
                case "ssdMobilenetv1":
                    this.options = new faceapi.SsdMobilenetv1Options({
                        minConfidence: 0.5, 
                    });
                break;
                case "tinyFaceDetector":
                    this.options = new faceapi.TinyFaceDetectorOptions({
                        inputSize: 512,  
                        scoreThreshold: 0.5,  
                    });
                    break;
                case "mtcnn":
                    this.options = new faceapi.MtcnnOptions({
                        minFaceSize: 20, 
                        scaleFactor: 0.709, 
                    });
                    break;
                }
            this.$store.state.videoEl = document.getElementById("myVideo");
            this.$store.state.canvasEl = document.getElementById("myCanvas");
        },

        async fnRunFaceLandmark() {
            // console.log("RunFaceLandmark");
            if (this.$store.state.videoEl.paused) return clearTimeout(this.timeout);
            const result = await faceapi[this.detectFace](
                this.$store.state.videoEl,
                this.options
                ).withFaceLandmarks();
            if (result && !this.$store.state.videoEl.paused) {
                const dims = faceapi.matchDimensions(this.$store.state.canvasEl, this.$store.state.videoEl, true);
                const resizeResult = faceapi.resizeResults(result, dims);
                this.withBoxes 
                    ? faceapi.draw.drawDetections(this.$store.state.canvasEl, resizeResult)
                    : faceapi.draw.drawFaceLandmarks(this.$store.state.canvasEl, resizeResult);
            } else {
                this.$store.state.canvasEl.getContext("2d").clearRect(0, 0, this.$store.state.canvasEl.width, this.$store.state.canvasEl.height);
            }
            this.timeout = setTimeout(() => this.fnRunFaceLandmark());
        },
        
        async fnRunFaceExpression() {
            // console.log("RunFaceExpression");
            if (this.$store.state.videoEl.paused) return clearTimeout(this.timeout);
            const result = await faceapi[this.detectFace](this.$store.state.videoEl, this.options)
                .withFaceLandmarks()
                .withFaceExpressions();
            if (result && !this.$store.state.videoEl.paused) {
                const dims = faceapi.matchDimensions(this.$store.state.canvasEl, this.$store.state.videoEl, true);
                const resizeResult = faceapi.resizeResults(result, dims);
                this.withBoxes
                ? faceapi.draw.drawDetections(this.$store.state.canvasEl, resizeResult)
                : faceapi.draw.drawFaceLandmarks(this.$store.state.canvasEl, resizeResult);
                faceapi.draw.drawFaceExpressions(this.$store.state.canvasEl, resizeResult, 0.05);
                // output result //
                // console.log("resizeResult.expressions ==> ", resizeResult.expressions)
                if(this.countResult < 20){
                    this.setAnger.push(resizeResult.expressions.angry)
                    this.setDisgusted.push(resizeResult.expressions.disgusted)
                    this.setFearful.push(resizeResult.expressions.fearful)
                    this.setHappy.push(resizeResult.expressions.happy)
                    this.setNeutral.push(resizeResult.expressions.neutral)
                    this.setSad.push(resizeResult.expressions.sad)
                    this.setSurprised.push(resizeResult.expressions.surprised)
                    this.countResult += 1;
                    // console.log(this.countResult);
                }else{
                    this.countResult = 0;
                    // this.sleepFunc(3000)
                }

            } else {
                this.$store.state.canvasEl
                .getContext("2d")
                .clearRect(0, 0, this.$store.state.canvasEl.width, this.$store.state.canvasEl.height);
            }
            this.timeout = setTimeout(() => this.fnRunFaceExpression());
        },

        async fnRunFaceAgeAndGender() {
            if (this.$store.state.videoEl.paused) return clearTimeout(this.timeout);
            const result = await faceapi[this.detectFace](this.$store.state.videoEl, this.options)
                .withFaceLandmarks()
                .withAgeAndGender();
            if (result && !this.$store.state.videoEl.paused) {
                const dims = faceapi.matchDimensions(this.$store.state.canvasEl, this.$store.state.videoEl, true);
                const resizeResults = faceapi.resizeResults(result, dims);
                this.withBoxes
                ? faceapi.draw.drawDetections(this.$store.state.canvasEl, resizeResults)
                : faceapi.draw.drawFaceLandmarks(this.$store.state.canvasEl, resizeResults);
                if (Array.isArray(resizeResults)) {
                resizeResults.forEach((result) => {
                    const { age, gender, genderProbability } = result;
                    new faceapi.draw.DrawTextField(
                    [
                        `${Math.round(age, 0)} years`,
                        `${gender} (${Math.round(genderProbability)})`,
                    ],
                    result.detection.box.bottomLeft
                    ).draw(this.$store.state.canvasEl);
                });
                } else {
                const { age, gender, genderProbability } = resizeResults;
                new faceapi.draw.DrawTextField(
                    [
                    `${Math.round(age, 0)} years`,
                    `${gender} (${Math.round(genderProbability)})`,
                    ],
                    resizeResults.detection.box.bottomLeft
                ).draw(this.$store.state.canvasEl);
                }
            } else {
                this.$store.state.canvasEl
                .getContext("2d")
                .clearRect(0, 0, this.$store.state.canvasEl.width, this.$store.state.canvasEl.height);
            }
            this.timeout = setTimeout(() => this.fnRunFaceAgeAndGender());
        },

        fnRun() {
            if (this.detection === "landmark") {
                this.fnRunFaceLandmark();
                return;
            }
            if (this.detection === "expression") {
                this.fnRunFaceExpression();
                return;
            }
            // if (this.detection === "age_gender") {
            //     this.fnRunFaceAgeAndGender();
            //     return;
            // }
        },

        fnOpen() {
            console.log("start camera.")
            if (typeof window.stream === "object") return;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                clearTimeout(this.timeout);
                navigator.mediaDevices
                    .getUserMedia(this.constraints)
                    .then(this.fnSuccess)
                    .catch(this.fnError);
            }, 300);
        },

        fnSuccess(stream) {
            // console.log("test ==> ",demo)
            // console.log("stream ==> ",stream)
            window.stream = stream; 
            this.$store.state.videoEl.srcObject = stream;
            this.$store.state.videoEl.play();
        },

        fnError(error) {
            // console.log(error);
            alert("steaming error: " + error);
        },
        
        // fnClose() {
        //     this.$store.state.canvasEl.getContext("2d").clearRect(0, 0, this.$store.state.canvasEl.width, this.$store.state.canvasEl.height);
        //     this.$store.state.videoEl.pause();
        //     clearTimeout(this.timeout);
        //     if (typeof window.stream === "object") {
        //         window.stream.getTracks().forEach((track) => track.stop());
        //         window.stream = "";
        //         this.$store.state.videoEl.srcObject = null;
        //     }
        // },
    },
    beforeDestroy() {
        this.$store.commit('fnClose');
        // this.$store.commit("fnClose")
    },
}
</script>

<style scoped>
.set-description{
    border: 1px solid grey;
    border-radius: 10px;
}
</style>