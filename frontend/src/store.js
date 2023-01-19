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
        isUseMic:false,
        isGoalCard: false,
        clickGoalans:null,
        selectLang: 'th-TH',
        setMic: "mic",
        isRecord: false,
        emotionSlide: '0',
        weightEmotion: 0,
        averageBpm:0,
        myRatebpm:[],
        happySubEmo:0,
        powSubEmo:0,
        relaxSubEmo:0,
        relaxXSubEmo:0,
        nerSubEmo:0,
        disSubEmo:0,
        sadSubEmo:0,
        ferSubEmo:0,
        anxSubEmo:0,
        angSubEmo:0,
        labelOtherEmo:'',
        otherSubEmo:0,
        imgWordCloud:null,
        miniDashboardData:null,
        loadingLineChart:false,
        loading:false,
        
    },
    mutations:{

        haddleOpenMic(state){
            console.log("haddle open mic")
            window.SpeechRecognition = window.SpeechRecognition ||  window.webkitSpeechRecognition;
            const recognition = new window.SpeechRecognition();
            recognition.interimResults = true;
            recognition.continuous = true;
            recognition.addEventListener("result", event => {
                    let text = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join("");
                state.answerCard = text;
                })
            recognition.start()
            state.setMic = "off"
        },

        haddleCloseMic(state){
            console.log("state haddle mic off")
            window.SpeechRecognition = window.SpeechRecognition ||  window.webkitSpeechRecognition;
            const recognition = new window.SpeechRecognition();

            recognition.interimResults = true;
            recognition.continuous = true;

            recognition.lang = state.selectLang;
            recognition.stop();
            recognition.addEventListener("end", () => {
                recognition.stop();
                    });
            state.setMic = "mic"
        },

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
        },
    }
});
