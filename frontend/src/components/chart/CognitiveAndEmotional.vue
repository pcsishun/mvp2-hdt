<template>
    <div class="">
        <div class="chart-result flex justify-between text-center mt-10" >
            <div class="mr-1 word-cloud border border-orange-400 rounded-lg w-[95%] bg-orange-400 text-white font-bold">
                <div class="mt-1.5">Cognitive</div>
                <div class="bg-orange-200 w-[100%] h-[150px] mt-2 rounded-b-lg pt-4">
                    <WordCloudVue v-if="$store.state.loading === false"/>
                    <loadingChart v-if="$store.state.loading === true"/>
                </div>
            </div>
            <div class="ml-1 emotion-set border border-orange-400 rounded-lg w-[95%] bg-orange-400 text-white font-bold">
                <div class="mt-1.5">Emotional</div>
                <div class="bg-orange-200  w-[100%] h-[150px] mt-2 rounded-b-lg pt-4">
                    <loadingChart/>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import WordCloudVue from './WordCloud.vue';
import loadingChart from '../loading/loadingChart.vue';

export default {
    components:{    
        WordCloudVue,
        loadingChart
    },
    data(){
        return{

        }
    },
    methods:{

    },
    mounted(){

    }
}
</script>

<style scoped>

</style>