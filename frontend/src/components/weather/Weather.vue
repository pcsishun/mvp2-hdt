<template>
    <div >
        <div class="set-text mt-3 mb-4  text-[17px] font-bold">
            <div class="mt-10 ml-3">
                <div>{{ meetup }},</div>
                <div>คุณ {{name}}</div>
            </div>
            <div>
                <div class="mr-[30px]">
                    <div class="flex justify-end">
                        <!-- <img class="text-right" src="../../assets/weather.png" height="60" width="60"/> -->
                        <Mist v-if="weather === 'Mist' || 
                            weather === 'Smoke' || 
                            weather === 'Haze' || 
                            weather === 'Dust'|| 
                            weather === 'Fog' ||
                            weather === 'Ash' "/>
                        <Rain v-if="weather === 'Rain'"/>
                        <Strom v-if="weather === 'Thunderstorm'"/>
                        <Sunny v-if="weather === 'Clear'"/>
                        <Cloud v-if="weather === 'Clouds'"/>
                    </div>
                    <div class="text-right">
                        {{ day }} {{ month }} {{ year }} <div  style='font-size:15px'> {{temp}} &#8451;</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Mist from '../icons/Mist.vue';
import Rain from '../icons/Rain.vue';
import Strom from '../icons/Strom.vue';
import Sunny from '../icons/Sunny.vue';
import Cloud from "../icons/Cloud.vue";

export default {
    components:{
        Mist,
        Rain,
        Strom,
        Sunny,
        Cloud
    },
    data(){
        return{
            weatherToken: "163a46b5d45e56aeba5f7a1ad9c55838",
            lat: 13.7698751,
            lng: 100.520175,
            year: "",
            month:"",
            day: "",
            temp:"",
            weather:"",
            desc:"",
            isError:"",
            meetup: "",
            name: "",
        }
    },
    methods:{
        async getWeatherData(){
            const d = new Date();
            this.year = d.getFullYear().toString().slice(-2);
            this.month = d.toLocaleString('default', { month: 'short' });
            this.day = d.getDate().toString();
            const hours = d.getHours();
            this.name = this.$cookies.get("hdt-user");
            // const min = d.getMinutes();
            if(hours >= 5 && hours < 12){
                this.meetup = "สวัสดียามเช้า"
            }else if(hours >= 12 && hours <= 18 ){
                this.meetup = "สวัสดียามบ่าย"
            }else {
                this.meetup = "สวัสดียามเย็น"
            }
            try{
                const setData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lng}&appid=${this.weatherToken}`)
                this.desc= setData.data.weather[0].description,
                this.weather= setData.data.weather[0].main,
                this.temp= (setData.data.main.temp - 273.15).toFixed(2)
                // console.log("setData" , this.weather)
            }catch(err){
                this.isError = err
            }
        }
    },
    mounted(){
        this.getWeatherData();
    }
}
</script>

<style scoped>
.set-text{
    display: grid;
    grid-template-columns: 1fr 1fr;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    padding: 20px;
    border-radius: 10px;
}
</style>