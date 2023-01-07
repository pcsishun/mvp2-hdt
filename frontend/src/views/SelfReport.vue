<template>
    <div class="set-menu">
        <Navbar/>
        <Menu/>
    </div>
    <div class="self-report-container w-[95%] m-auto">
        <div class="title text-center mt-20 text-[20px] font-bold">บันทึกเรื่องราวของฉันประจำวัน</div>
        <div class="set-description mt-10  text-center p-5" >
            <div class="warp" v-if="cardStep === 0">
                <div class="description-text mt-5">
                    <div> ทางเราหวังเป็นอย่างยิ่งว่าข้อมูลของท่านจะช่วยให้เราออกแบบระบบในอนาคตที่สามารถช่วยเหลือผู้ป่วยสุขภาพจิตให้สามารถดำเนินชีวิตที่ดียิ่งขึ้นได้ในอนาคต</div>
                    <div class="flex justify-around mt-10">
                        <div>
                            <img class="mt-5" src="../assets/camera.png" height="550" width="550"/>
                        </div>
                        <div class="mt-5 text-left ml-3">ระบบจะมีการใช้ AI ตรวจจับภาวะอารมณ์จากทางใบหน้าผู้ใช้ ทางระบบจะไม่มีการเก็บรูปหรือวีดีโอ user หากพร้อมแล้วสามารถกดปุ่มเริ่มต้นเพื่อเริ่มบันทึกเรื่องราวประจำวัน</div>
                    </div>
                </div>
                <div class="btn-selfreport mt-20 p-5">
                    <button class="border border-stone-800 w-[200px] h-[50px] rounded-lg text-slate-50 bg-slate-700">
                        เริ่มต้น
                    </button>
                    <button class="border border-stone-800 w-[200px] h-[50px] rounded-lg text-slate-50 bg-slate-700" hidden @click="fnOpen">
                        test
                    </button>
                    <button class="border border-stone-800 w-[200px] h-[50px] rounded-lg text-slate-50 bg-slate-700" hidden @click="fnClose">
                        stop test
                    </button>
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
            <MCard1Vue v-if="cardType === 'morning' &&  cardStep === 1"/>
            <MCard2Vue v-if="cardType === 'morning' &&  cardStep === 2"/>
            <MCard3Vue v-if="cardType === 'morning' &&  cardStep === 3"/>
            <ACard1Vue v-if="cardType === 'afternoon' &&  cardStep === 1"/>
            <ACard2Vue v-if="cardType === 'afternoon' &&  cardStep === 2"/>
            <ACard3Vue v-if="cardType === 'afternoon' &&  cardStep === 3"/>
            <ACard4Vue v-if="cardType === 'afternoon' &&  cardStep === 4"/>
            <ParameterVue v-if="cardStep === 5"/>
            <SyncDeviceVue v-if="cardStep === 6"/>
            <HeartRateVue v-if="cardStep === 7"/>
            <FinishCardVue v-if="cardStep === 8"/>
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
import HeartRateVue from '../components/selfreport/general/HeartRate.vue'
import FinishCardVue from '../components/selfreport/general/FinishCard.vue'

import * as faceapi from "face-api.js";

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
        HeartRateVue,
        FinishCardVue
    },
    data(){
        return{
            cardStep: 0,
            cardType: "",
            nets: "tinyFaceDetector", 
            options: null,
            withBoxes: true,
            detectFace: "detectSingleFace",
            detection: "expression",
            videoEl: null,
            canvasEl: null,
            timeout: 0,
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
            surprised: null
        }
    },
    watch: {
        nets(val) {
        this.nets = val;
        this.fnInit();
        },
        detection(val) {
        this.detection = val;
        this.videoEl.pause();
        setTimeout(() => {
            this.videoEl.play();
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
        controllCard(){
            const d = new Date();
            const hours = d.getHours();
            if(hours <= 12 && hours > 0){
                this.cardType = "morning"
            }else{
                this.cardType = "afternoon"
            }
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
                        minFaceSize: 20, // 0.1 ~ 0.9
                        scaleFactor: 0.709, // 0.1 ~ 0.9
                    });
                    break;
                }
            this.videoEl = document.getElementById("myVideo");
            this.canvasEl = document.getElementById("myCanvas");
        },

        async fnRunFaceLandmark() {
            console.log("RunFaceLandmark");
            if (this.videoEl.paused) return clearTimeout(this.timeout);
            const result = await faceapi[this.detectFace](
                this.videoEl,
                this.options
                ).withFaceLandmarks();
            if (result && !this.videoEl.paused) {
                const dims = faceapi.matchDimensions(this.canvasEl, this.videoEl, true);
                const resizeResult = faceapi.resizeResults(result, dims);
                this.withBoxes 
                    ? faceapi.draw.drawDetections(this.canvasEl, resizeResult)
                    : faceapi.draw.drawFaceLandmarks(this.canvasEl, resizeResult);
            } else {
                this.canvasEl.getContext("2d").clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
            }
            this.timeout = setTimeout(() => this.fnRunFaceLandmark());
        },
        
        async fnRunFaceExpression() {
            // console.log("RunFaceExpression");
            if (this.videoEl.paused) return clearTimeout(this.timeout);
            const result = await faceapi[this.detectFace](this.videoEl, this.options)
                .withFaceLandmarks()
                .withFaceExpressions();
            if (result && !this.videoEl.paused) {
                const dims = faceapi.matchDimensions(this.canvasEl, this.videoEl, true);
                const resizeResult = faceapi.resizeResults(result, dims);
                this.withBoxes
                ? faceapi.draw.drawDetections(this.canvasEl, resizeResult)
                : faceapi.draw.drawFaceLandmarks(this.canvasEl, resizeResult);
                faceapi.draw.drawFaceExpressions(this.canvasEl, resizeResult, 0.05);
                console.log("result emo =>",resizeResult.expressions);
                // this.angry = resizeResult.expressions.angry
                // this.disgusted = resizeResult.expressions.disgusted
                // this.fearful = resizeResult.expressions.fearful
                // this.happy = resizeResult.expressions.happy
                // this.neutral = resizeResult.expressions.neutral
                // this.surprised = resizeResult.expressions.surprised
            } else {
                this.canvasEl
                .getContext("2d")
                .clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
            }
            this.timeout = setTimeout(() => this.fnRunFaceExpression());
        },

        async fnRunFaceAgeAndGender() {
            if (this.videoEl.paused) return clearTimeout(this.timeout);
            const result = await faceapi[this.detectFace](this.videoEl, this.options)
                .withFaceLandmarks()
                .withAgeAndGender();
            if (result && !this.videoEl.paused) {
                const dims = faceapi.matchDimensions(this.canvasEl, this.videoEl, true);
                const resizeResults = faceapi.resizeResults(result, dims);
                this.withBoxes
                ? faceapi.draw.drawDetections(this.canvasEl, resizeResults)
                : faceapi.draw.drawFaceLandmarks(this.canvasEl, resizeResults);
                if (Array.isArray(resizeResults)) {
                resizeResults.forEach((result) => {
                    const { age, gender, genderProbability } = result;
                    new faceapi.draw.DrawTextField(
                    [
                        `${Math.round(age, 0)} years`,
                        `${gender} (${Math.round(genderProbability)})`,
                    ],
                    result.detection.box.bottomLeft
                    ).draw(this.canvasEl);
                });
                } else {
                const { age, gender, genderProbability } = resizeResults;
                new faceapi.draw.DrawTextField(
                    [
                    `${Math.round(age, 0)} years`,
                    `${gender} (${Math.round(genderProbability)})`,
                    ],
                    resizeResults.detection.box.bottomLeft
                ).draw(this.canvasEl);
                }
            } else {
                this.canvasEl
                .getContext("2d")
                .clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
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
            window.stream = stream; 
            this.videoEl.srcObject = stream;
            this.videoEl.play();
        },

        fnError(error) {
            console.log(error);
            alert("steaming error: " + error);
        },
        fnClose() {
            this.canvasEl.getContext("2d").clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
            this.videoEl.pause();
            clearTimeout(this.timeout);
            if (typeof window.stream === "object") {
                window.stream.getTracks().forEach((track) => track.stop());
                window.stream = "";
                this.videoEl.srcObject = null;
            }
        },
    },
   
    beforeDestroy() {
        this.fnClose();
    },
}
</script>

<style scoped>
.set-description{
    border: 1px solid grey;
    border-radius: 10px;
}
</style>