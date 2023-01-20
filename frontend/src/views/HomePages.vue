<template>
    <div class="set-menu">
        <Navbar/>
        <Menu/>
    </div>
    <div class="mt-5">
        <div class="w-[350px] m-auto">
            <WeatherVue/>
        </div>
        <div class="set-chart w-[350px] mt-[20px] p-[15px] m-auto rounded-lg">
            <div class="title text-[14px] mb-7 font-bold border-b border-gray-400/[0.8]">
                อารมณ์ระหว่างวน
            </div>
            <div class="body-description mt-5 mb-7">
                หากมีความรู้สึกระหว่างวันที่ดีหรือไม่ดีกับเรื่องอะไรสามารถกดปุ่มด้านล่างได้เลยค่ะ
            </div>
            <div class="mb-4">
                <ButtonEmer/>
            </div>
        </div>
        <div class="set-chart w-[350px] mt-[20px] p-[15px] m-auto rounded-lg">
            <div class="text-[14px] font-bold mt-5 mb-5">อารมณ์ย้อนหลังประจำวัน</div>
            <div><img src="../assets/good.png" width="20" height="20"/></div>
            <div >
                <ChartLineVue />
            </div>
            <div v-if="$store.state.loadingLineChart === false">
                <LoadingLineChart/>
            </div>
            <div><img src="../assets/bad.png" width="20" height="20"/></div>
        </div>
        
        <div class="set-info w-[350px] m-auto mt-[20px] p-[15px] rounded-lg">
            <EmerAlertVue/>
            <CognitiveAndEmotionalVue/>
        </div>
        <BTNRedoVue/>
    </div>
</template>

<script>
import ChartLineVue from '../components/chart/ChartLine.vue';
import WeatherVue from '../components/weather/Weather.vue';
import EmerAlertVue from '../components/alert/EmerAlert.vue';
import CognitiveAndEmotionalVue from '../components/chart/CognitiveAndEmotional.vue';
import BTNRedoVue from '../components/btn_re_do/BTNRedo.vue';
import Navbar from '../components/navbar/Navbar.vue'
import Menu from '../components/menu/Menu.vue'
import axios from 'axios';
import LoadingLineChart from '../components/loading/LoadingLineChart.vue'
import ButtonEmer from '../components/emergecyEmo/ButtonEmer.vue'


export default {
    components:{
        ChartLineVue,
        WeatherVue,
        EmerAlertVue,
        CognitiveAndEmotionalVue,
        BTNRedoVue,
        Navbar,
        Menu,
        LoadingLineChart,
        ButtonEmer
    },
    data(){
        return{
            isError: "",
            showData:null,

        }
    },
    methods:{
        async haddleMiniDashboard(){
            this.$store.state.loading = true

            const checktoken = this.$cookies.get("hdt-token")
            if(checktoken){
                const headerConf = {
                    headers:{
                        "access-token": this.$cookies.get("hdt-token")
                    }
                }
                try{
                    const homeData = await axios.get("https://backend-hdt-homepage-zt27agut7a-as.a.run.app/api/home", headerConf)
                    if(homeData.data.status === 403 ){
                        alert(homeData.data.text)
                        this.$cookies.remove("hdt-token")
                        this.$cookies.remove("hdt-user")
                        this.$store.state.loading = false
                        this.$router.push("/login")
                    }else if(homeData.data.status === 401 ){
                        alert(homeData.data.text)
                        this.$cookies.remove("hdt-token")
                        this.$cookies.remove("hdt-user")
                        this.$store.state.loading = false
                        this.$router.push("/login")
                    }else if(homeData.data.status === 200 || homeData.data.status === 500 ){
                        if(homeData.data.status === 200){
                            if(homeData.data.text){
                                const textLoad = {
                                    text: homeData.data.text
                                }
                                const imgBase64 = await axios.post("https://backend-hdt-wordcloud-zt27agut7a-as.a.run.app/api/wordcloud",textLoad)
                                this.$store.state.imgWordCloud = imgBase64.data
                                ///
                                
                                ///
                                this.$store.state.loading = false
                            }else{
                                // this.$store.state.miniDashboardData = homeData.data
                                this.$store.state.loading = false
                            }
                            
                        }else{
                            this.$store.state.loading = false
                            this.showData = {
                                status: 500,
                                data: "ระบบแสดงข้อมูลไม่พร้อมใช้งาน"
                            }
                        }
                    }
                }catch(err){
                    this.$store.state.loading = false
                    this.isError = err
                }
            }else{
                this.$store.state.loading = false
                this.$cookies.remove("hdt-token")
                this.$cookies.remove("hdt-user")
                this.$router.push("/login")
            }
        }
    },
    created(){
        this.haddleMiniDashboard()
    },
    mounted(){
        
    }
}
</script>

<style scoped>



.set-chart{
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.set-info{
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
</style>