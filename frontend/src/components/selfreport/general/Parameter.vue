<template>
    <div class="parameter-emotion">
        <div class="warp">
            <div class="description-text mt-5">
                <div class="text-desc">
                    เลื่อนระดับตามความรู้สึกประจำวัน
                </div>
            </div>
            <div class="input-container mt-10 p-5">
                <input class="set-input-1 w-[90%]"
                    type="range" 
                    min="-3" 
                    max="3"
                    step="1"
                    v-model="emotionSlide"
                />
                <!-- {{ emotionSlide }} -->
            </div>
            <div class="warp-wight mt-10" v-if="emotionSlide !== 0">
                <div class="text-desc-weight w-[70%] m-auto">
                    คิดว่าอารมณ์ระดับ {{ emotionSlide }} ที่ให้ค่านั้นส่งผลกับคุณมากแค่ไหน มากสุดคือ 10
                </div>
                <div>
                    <input class="set-input-1 w-[90%]"
                    type="range" 
                    min="1" 
                    max="10"
                    v-model="weightEmotion"
                />
                </div>
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
            emotionSlide: 0,
            weightEmotion: 0
        }
    },
    computed:{

    },
    watch:{

    },
    methods:{

    },
    mounted(){

    }
}
</script>

<style lang="scss" scoped>

</style>