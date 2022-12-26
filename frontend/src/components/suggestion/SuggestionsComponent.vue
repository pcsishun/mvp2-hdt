<template>
    <div>
        <div class="set-descritption mb-5">
            <div class="set-title font-bold text-[18px]">Descritption:</div>
            <div>
                The weekly data is reflecting to your emotion of depression with a critical thinking of Pitching and Investment by frequency of self-report.
            </div>
        </div>
        <div class="set-suggestion">
            <div class="set-title font-bold text-[18px]">Suggestion:</div>
            <div>
                <ul class="ml-3 mb-3 mt-3">
                    <li class="font-bold">Therapist</li>
                    <div class="ml-3">We suggested a personalized therapist for helping you recover and reach a goal >> Dr. Joe Nutthatorn</div>
                    <div class="mt-4 mb-4 h-[40px] ">
                        <button class="flex justify-center bg-cyan-500 rounded-lg h-[40px] text-white w-[150px] font-bold" @click="haddleMebne('Therapist')">
                            <div class="mr-3 mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                </svg>  
                            </div>
                            <div class="mt-2">
                                Therapist
                            </div>
                        </button>
                    </div>
                </ul>
                <ul class="ml-3 mb-3 mt-1">
                    <li class="font-bold">Look-Alike</li>
                    <div class="ml-3">We ssuggested you to join a community of healthy diet for encouraging your goal.</div>
                    <div class="mt-4 mb-4 h-[40px] ">
                        <button class="flex justify-center bg-cyan-500 rounded-lg h-[40px] text-white w-[150px] font-bold" @click="haddleMebne('Look alive')">
                            <div class="mr-3 mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 ">
                                    <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clip-rule="evenodd" />
                                    <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                                </svg>
                            </div>
                            <div class="mt-2">
                                Look alive
                            </div>
                        </button>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components:{

    },
    data(){
        return{

        }
    },
    methods:{
        haddleMebne(evt){
            alert(`This ${evt} funtion is on maintenance.`)
        }   
    }
}
</script>

<style>

</style>