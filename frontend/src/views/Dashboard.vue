<template>
    <div class="set-menu">
        <Navbar/>
        <Menu/>
    </div>
    <div class="">
        <div class="set-find  w-[90%] m-auto mb-10">
            <div class="date-select w-[90%] h-[50px] m-auto mt-5">
                <div class="mb-5 flex">
                    <div class="font-bold mr-3 w-[50px]">from</div>
                    <input id="date" class="border border-black rounded-lg indent-[15%] w-[70%]" placeholder="" type="date"/>
                </div>
                <div class="flex">
                    <div class="font-bold mr-3 w-[50px]">to</div>
                    <input class="border border-black rounded-lg indent-[15%] w-[70%]" placeholder="" type="date"/>
                </div> 
            </div>
            <div class="mt-9 text-center">
                <button class="bg-cyan-500 w-[98%] h-[50px] rounded-full text-white font-bold">find</button>
            </div>
        </div>
        <div class="dashboard-body w-[95%] m-auto  pt-1 pl-3 pr-3 pb-10 rounded-lg ">
            <div class="font-bold mt-5">Emotion result</div>
            <div class="border-b border-gray-300 rounded-lg "></div>
            <CognitiveAndEmotionalVue/> 
        </div>
        <div class="sentiment-chart w-[95%] m-auto rounded-lg p-3 mt-6">
            <div class="font-bold mt-5">Sentiment</div>
            <div class="border-b border-gray-300 mb-3 rounded-lg"></div>
            <ChartLineVue/>
        </div>
        <div class="suggestion-body w-[95%] mt-5 m-auto p-3 mb-5 rounded-lg">
            <SuggestionsVue/>
        </div>
    </div>
</template>

<script>
import CognitiveAndEmotionalVue from '../components/chart/CognitiveAndEmotional.vue';
import ChartLineVue from '../components/chart/ChartLine.vue';
import SuggestionsVue from '../components/suggestion/SuggestionsComponent.vue'
import Navbar from '../components/navbar/Navbar.vue'
import Menu from '../components/menu/Menu.vue'

export default {
    components:{
        CognitiveAndEmotionalVue,
        ChartLineVue,
        SuggestionsVue,
        Navbar,
        Menu
    },
    data(){
        return{

        }
    },
    methods:{

    }
}
</script>

<style scoped>
input[type=date]:required:invalid::-webkit-datetime-edit {
    color: transparent;
}

input[type=date]:focus::-webkit-datetime-edit {
    color: black !important;
}

.set-find{
    display: grid;
    grid-template-columns: 2fr 0.5fr;
}

.dashboard-body{
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

.sentiment-chart{
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

.suggestion-body{
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
</style>