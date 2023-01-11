import { createStore } from 'vuex' 
// import * as faceapi from "face-api.js";


export default createStore({
    state: {
        cssMenu: "menu-close",
        cssBodyMenu: "body-menu-close",
        cssHamOpenTB: "ham-tb-close",
        stepCard:0,
        videoEl:null,
        canvasEl: null,
        answerAndEmotion:[],
        answerCard:"",
        answerGoal1:"",
        answerGoal2:"",
        answerGoal3:"",
        // anger:[],
        // disgusted:[],
        // fearful:[],
        // happy:[],
        // neutral:[],
        // sad:[],
        // surprised:[]
        // timeout: 0,
        // constraints: {
        //     audio: false,
        //     video: {
        //         width: {
        //             min: 320,
        //             ideal: 1280,
        //             max: 1920,
        //         },
        //         height: {
        //             min: 240,
        //             ideal: 720,
        //             max: 1080,
        //         },
        //         frameRate: {
        //             min: 10,
        //             ideal: 10,
        //             max: 10,
        //         },
        //         facingMode: "environment",
        //     },
        // },

    },
    mutations:{
        // haddleNextCard(state){
        //     state.stepCard += 1;
        //     this.commit("fnOpen");
        // }, 

        // fnOpen(state) {
        //     console.log("start camera.")
        //     if (typeof window.stream === "object") return;
        //     clearTimeout(state.timeout);
        //     state.timeout = setTimeout(() => {
        //         clearTimeout(state.timeout);
        //         navigator.mediaDevices
        //         .getUserMedia(state.constraints)
        //         .then(this.commit("fnSuccess"))
        //         .catch(this.commit("fnError"));
        //     }, 300);
        // },

        // fnSuccess(stream) {
        //     console.log("stream => ",stream)
        //     window.stream = stream; 
        //     state.videoEl.srcObject = stream;
        //     state.videoEl.play();
        // },

        // fnError(error) {
        //     console.log(error);
        //     alert("steaming error: " + error);
        // },
        
        fnClose(state) {
            state.canvasEl.getContext("2d").clearRect(0, 0, state.canvasEl.width, state.canvasEl.height);
            state.videoEl.pause();
            clearTimeout(state.timeout);
            if (typeof window.stream === "object") {
                window.stream.getTracks().forEach((track) => track.stop());
                window.stream = "";
                state.videoEl.srcObject = null;
            }
        },

        vidOff() {
            vid.pause();
            vid.src = "";
            localstream.getTracks()[0].stop();
            console.log("Vid off");
          }
    }
});
