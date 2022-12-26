<template>
    <div class="scale-container">
        <canvas id="scale-sentiment"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    components:{

    },
    data(){
        return{
            mockDataSCG:{
                type: "line",
                options: {
                    elements:{
                        point:{
                            radius: 0
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            display: false,
                        }
                    },
                    plugins: {
                        legend: {
                            display: false,
                        }
                    }
                },
                data: {
                    labels: ["Mon", "Tue", "Wed", "Thu", "Today"],                    
                    datasets: [
                        {
                            label: "Average sentiment score",
                            type: "line",
                            data: [0.1,0.55,-0.24,-0.5,0.23],
                            backgroundColor: '#676C6D',
                            borderColor: '#676C6D',
                            borderWidth: 2,
                            tension: 0.35
                        },
                        {
                            label: "Positive line",
                            type: "line",
                            data: [0.25,0.25,0.25,0.25,0.25],
                            backgroundColor: '#00D2FC',
                            borderColor: '#00D2FC',
                            borderWidth: 1
                        },
                        {
                            label: "Negative line",
                            type: "line",
                            data: [-0.25,-0.25,-0.25,-0.25,-0.25],
                            backgroundColor: '#FC0000',
                            borderColor:'#FC0000',
                            borderWidth: 1
                        }
                    ]
                },
            }
        }
    },
    methods:{
    },
    mounted(){
        const ctx =document.getElementById("scale-sentiment");
        new Chart(ctx, this.mockDataSCG);
    
    }
}
</script>

<style scoped>

</style>