<template>
    <Line v-if="isloaded" :data="setData" :options="options" />
</template>

<script >
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement} from 'chart.js'
import { Line } from 'vue-chartjs'
import axios from 'axios'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
  )
  
export default {
    components: {
      Line
    },
    data() {
      return { 
            isloaded: false,
            setData:null,
            options:{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            display: false
                            }
                        },
                    y: {
                        beginAtZero: false,
                        max: 4,
                        min: -4
                    }
                },
                plugins: {
                        legend: {
                            display: false,
                        }
                }
            }
        }      
    }, 
    methods:{
        async fetchData(){
            console.log("start")
            this.isloaded = false
            this.$store.state.loadingLineChart = true;
            let rawData = []
            let setLabel = []
            let setNegThes = []
            let setPosThes = []
            const headerConf = {
                    headers:{
                        "access-token": this.$cookies.get("hdt-token")
                    }
                }

            const homeData = await axios.get("https://backend-hdt-homepage-zt27agut7a-as.a.run.app/api/home", headerConf)
            const reversedArray = homeData.data.data.reverse();
            for(let i = 0; i < reversedArray.length; i++){
                const d = new Date(reversedArray[i].create_date)
                const day = d.getDate();
                const month = d.getMonth() + 1;
                const hours = d.getHours();
                const min = d.getMinutes();
                const rangeEmotionMain = parseFloat(reversedArray[i].mainEmotion)
                setLabel.push(`${day}/${month} ${hours}:${min}`)
                rawData.push(rangeEmotionMain)      
                setNegThes.push(-2)
                setPosThes.push(2)
            }

            const dataset ={
                    labels: setLabel,
                        datasets: [{
                            label: "อารมณ์ประจำวัน",
                            backgroundColor: '#676C6D',
                            borderColor: '#676C6D',
                            borderWidth: 2,
                            tension: 0.35,
                            data: rawData
                        },
                        {
                            backgroundColor: '#FC0000',
                            borderColor: '#FC0000',
                            borderWidth: 1,
                            data: setNegThes,
                            pointRadius: 0,
                        },
                        {
                            backgroundColor: '#00D2FC',
                            borderColor: '#00D2FC',
                            borderWidth: 1,
                            data: setPosThes,
                            pointRadius: 0,
                        }
                    ]
                }
                

            this.setData = dataset
            this.$store.state.loadingLineChart = false;
            this.isloaded = true
            console.log(this.isloaded, this.setData)
        }
    },
    mounted(){
        this.fetchData();
    }   
}
</script>
  