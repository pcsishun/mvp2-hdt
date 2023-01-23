<template>
    <div>   
        <Navbar/>
        <Menu/>
    </div>
    <div class="emotion-emergecy h-[100vh] mt-[80px] w-[90%] m-auto text-center">
        <EmCard v-if="stepCard === 0"/>
        <SubEmotion v-if="stepCard === 1"/>
        <Parameter v-if="stepCard === 2"/>
        <HeartRate v-if="stepCard === 3"/>
        <FinishCard v-if="stepCard === 4"/>
        <div class="m-auto text-center flex justify-center ">
            <button class="mr-3 border border-stone-800 w-[130px] h-[50px] rounded-lg text-slate-50 bg-slate-700 mt-10" @click="haddleStepDown" v-if="stepCard !== 4">ย้อนกลับ</button>
            <button class="ml-3 border border-stone-800 w-[130px] h-[50px] rounded-lg text-slate-50 bg-slate-700 mt-10" @click="haddleStepUp" v-if="stepCard !== 4">ถัดไป</button>
        </div>
        <div class="m-auto text-center"  v-if="stepCard === 4">
            <button class="mr-3 border border-stone-800 w-[130px] h-[50px] rounded-lg text-slate-50 bg-slate-700 mt-10" @click="haddlePushData">เสร็จสิ้น</button>
        </div>
        <!-- <div class="m-auto text-center">
            <button class="mr-3 border border-stone-800 w-[130px] h-[50px] rounded-lg text-slate-50 bg-slate-700 mt-10" @click="debugData">debug</button>
        </div> -->
    </div>
</template>

<script>
import Navbar from '../components/navbar/Navbar.vue'
import Menu from '../components/menu/Menu.vue'
import EmCard from '../components/emergecyEmo/EmCard.vue'
import SubEmotion from '../components/selfreport/general/SubEmotion.vue'
import Parameter from '../components/selfreport/general/Parameter.vue'
import HeartRate from '../components/selfreport/general/HeartRate.vue'
import FinishCard from '../components/selfreport/general/FinishCard.vue'
import axios from 'axios'

export default {
    components:{
        EmCard,
        Navbar,
        Menu,
        SubEmotion,
        Parameter,
        HeartRate,
        FinishCard
    },
    data(){
        return{
            stepCard: 0,
            isError: "",
            // setAnger: [],
            // setDisgusted:[],
            // setFearful:[],
            // setHappy:[],
            // setNeutral:[],
            // setSad:[],
            // setSurprised:[]
        }
    },  
    methods:{
        // debugData(){
        //     console.log("debug data vvvv")
        //     console.log( this.$store.state.answerAndEmotion)
        //     console.log(this.$store.state.emotionSlide)
        //     console.log(this.$store.state.weightEmotion)
        //     console.log(this.$store.state.happySubEmo)
        //     console.log(this.$store.state.powSubEmo)
        //     console.log(this.$store.state.relaxSubEmo)
        //     console.log(this.$store.state.relaxXSubEmo)
        //     console.log(this.$store.state.nerSubEmo)
        //     console.log(this.$store.state.disSubEmo)
        //     console.log(this.$store.state.sadSubEmo)
        //     console.log(this.$store.state.ferSubEmo)
        //     console.log(this.$store.state.anxSubEmo)
        //     console.log(this.$store.state.angSubEmo)
        //     console.log(this.$store.state.labelOtherEmo)
        //     console.log(this.$store.state.labelOtherEmo)
        //     console.log(this.$store.state.averageBpm)
        //     console.log(this.$store.state.labelOtherEmo)
        //     console.log(this.$store.state.isMic)
        // },
        haddleStepUp(){
            this.stepCard += 1
            this.$store.commit('haddleCloseMic')
            if(this.stepCard === 1){
                // const averageAnger = this.setAnger.reduce((a, b) => a + b, 0) / this.setAnger.length;
                // const averageDisgusted = this.setDisgusted.reduce((a, b) => a + b, 0) / this.setDisgusted.length;
                // const averageFearful = this.setFearful.reduce((a, b) => a + b, 0) / this.setFearful.length;
                // const averageHappy = this.setHappy.reduce((a, b) => a + b, 0) / this.setHappy.length;
                // const averageNeutral = this.setNeutral.reduce((a, b) => a + b, 0) / this.setNeutral.length;
                // const averageSad = this.setSad.reduce((a, b) => a + b, 0) / this.setSad.length;
                // const averageSurprised = this.setSurprised.reduce((a, b) => a + b, 0) / this.setSurprised.length;
                const payload = {
                    timing: "emer",
                    anger: null,
                    disgusted:null,
                    fearful:null,
                    happy:null,
                    neutral:null,
                    sad:null,
                    surprised:null,
                    answer: this.$store.state.answerCard,
                    isMic: this.$store.state.isMic
                }
                // this.setAnger = []
                // this.setDisgusted = []
                // this.setFearful = []
                // this.setHappy = []
                // this.setNeutral = []
                // this.setSad = []
                // this.setSurprised = []
                this.$store.state.answerAndEmotion.push(payload)
                this.$store.state.answerCard = ""
                    }
        },
        haddleStepDown(){
            if(this.stepCard < 0){
                this.stepCard = 0
            }else{
                this.stepCard -= 1
            }
        },
        async haddlePushData(){
            this.$store.state.loading = true
            try{
                const headerConf = {
                    headers:{
                        "access-token": this.$cookies.get("hdt-token")
                    }
                }

                const payload = {
                    data:{
                        arrayOfanswer: this.$store.state.answerAndEmotion,
                        mainEmotion: this.$store.state.emotionSlide,
                        weightMainEmotion: this.$store.state.weightEmotion,
                        happyRange: this.$store.state.happySubEmo,
                        powRange: this.$store.state.powSubEmo,
                        relaxRange: this.$store.state.relaxSubEmo,
                        relievedRange: this.$store.state.relaxXSubEmo,
                        normalRange: this.$store.state.nerSubEmo,
                        disgustedRange: this.$store.state.disSubEmo,
                        sadRange: this.$store.state.sadSubEmo,
                        fearRange: this.$store.state.ferSubEmo,
                        worryRange: this.$store.state.anxSubEmo,
                        angerRange: this.$store.state.angSubEmo,
                        otherEmotionLabel: this.$store.state.labelOtherEmo,
                        otherRangeEmotion: (this.$store.state.labelOtherEmo === '')? 0 : this.$store.state.otherSubEmo,
                        averagBpm: this.$store.state.averageBpm,
                        mic:  this.$store.state.isMic
                    }
                }

                const replyResult = await axios.post("https://backend-hdt-selfreport-zt27agut7a-as.a.run.app/api/insertData", payload,headerConf)
                
                if(replyResult.status === 200 ){
                    this.$store.state.loading = false
                    alert("ระบบทำการบันทึกเสร็จเรียบร้อย")
                    this.$router.push("/")
                    location.reload()
                }else{
                    // alert(replyResult.data)
                    this.$cookies.remove('hdt-token')
                    this.$cookies.remove("hdt-user")
                    this.$store.state.loading = false
                    alert("session expired.")
                    location.reload()
                }
            }catch(err){
                console.log(err)
                this.$store.state.loading = false
                alert(err)
                location.reload()

            }
        }
    },
    mounted(){

    }

}
</script>

<style lang="scss" scoped>
</style>