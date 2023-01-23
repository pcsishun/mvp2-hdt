<template>
    <div class="sub-emo-container">
        <div class="text-center w-[95%] m-auto">
            พอ พูดถึงเรื่องนี้แล้วรู้สึกยังไง  และรู้สึกแบบนั้นเข้มข้นมากน้อยแค่ไหน ถ้า 0=รู้สึกแบบนั้นเบาบางมาก 10=รู้สึกแบบนั้นเข้มข้นมาก
        </div>
        <div>
            <div class="mt-5 border border-gray-400 rounded-lg  p-5">
                <div class="flex justify-around">
                    <div>
                        <div class="set-title text-[14px]">ดีใจ</div>
                        <div class="flex">
                            <input type="range" orient="vertical" list="set-happy" max="10" min="0" step="1" v-model="$store.state.happySubEmo"/>
                            <datalist class="set-label-col" id="set-happy">
                                <option hidden>10</option>
                                <option hidden>5</option>
                                <option hidden>0</option>
                            </datalist>
                            <div class="set-label-col -translate-y-2">
                                <label>10</label>
                                <label>0</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="set-title text-[14px]">ภูมิใจ</div>
                        <div class="flex">
                            <input type="range" orient="vertical" list="set-pow" max="10" min="0" step="1" v-model="$store.state.powSubEmo"/>
                            <datalist class="set-label-col" id="set-pow">
                                <option hidden>10</option>
                                <option hidden>5</option>
                                <option hidden>0</option>
                            </datalist>
                            <div class="set-label-col -translate-y-2">
                                <label>10</label>
                                <label>0</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="set-title text-[14px]">สงบ</div>
                        <div class="flex">
                            <input type="range" orient="vertical" list="set-relax" max="10" min="0" step="1" v-model="$store.state.relaxSubEmo"/>
                            <datalist class="set-label-col" id="set-relax">
                                <option hidden>10</option>
                                <option hidden>5</option>
                                <option hidden>0</option>
                            </datalist>
                            <div class="set-label-col -translate-y-2">
                                <label>10</label>
                                <label>0</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="set-title text-[14px]">โล่งใจ</div>
                        <div class="flex">
                            <input type="range" orient="vertical" list="set-relax-x" max="10" min="0" step="1" v-model="$store.state.relaxXSubEmo"/>
                            <datalist class="set-label-col" id="set-relax-x">
                                <option hidden>10</option>
                                <option hidden>5</option>
                                <option hidden>0</option>
                            </datalist>
                            <div class="set-label-col -translate-y-2">
                                <label>10</label>
                                <label>0</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="set-title text-[14px]">ผิดหวัง</div>
                        <div class="flex">
                            <input type="range" orient="vertical" list="set-dis" max="10" min="0" step="1" v-model="$store.state.disSubEmo"/>
                            <datalist class="set-label-col" id="set-dis">
                                <option hidden>10</option>
                                <option hidden>5</option>
                                <option hidden>0</option>
                            </datalist>
                            <div class="set-label-col -translate-y-2">
                                <label>10</label>
                                <label>0</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-around mt-5">
                    
                    <div>
                        <div class="set-title text-[14px]">เศร้า</div>
                        <div class="flex">
                            <input type="range" orient="vertical" list="set-sad" max="10" min="0" step="1" v-model="$store.state.sadSubEmo"/>
                            <datalist class="set-label-col" id="set-sad">
                                <option hidden>10</option>
                                <option hidden>5</option>
                                <option hidden>0</option>
                            </datalist>
                            <div class="set-label-col -translate-y-2">
                                <label>10</label>
                                <label>0</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="set-title text-[14px]">กลัว</div>
                        <div class="flex">
                            <input type="range" orient="vertical" list="set-fer" max="10" min="0" step="1" v-model="$store.state.ferSubEmo"/>
                            <datalist class="set-label-col" id="set-fer">
                                <option hidden>10</option>
                                <option hidden>5</option>
                                <option hidden>0</option>
                            </datalist>
                            <div class="set-label-col -translate-y-2">
                                <label>10</label>
                                <label>0</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="set-title text-[14px]">กังวล</div>
                        <div class="flex">
                            <input type="range" orient="vertical" list="set-anx" max="10" min="0" step="1" v-model="$store.state.anxSubEmo"/>
                            <datalist class="set-label-col" id="set-anx">
                                <option hidden>10</option>
                                <option hidden>5</option>
                                <option hidden>0</option>
                            </datalist>
                            <div class="set-label-col -translate-y-2">
                                <label>10</label>
                                <label>0</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="set-title text-[14px]">โกรธ</div>
                        <div class="flex"> 
                            <input type="range" orient="vertical" list="set-ang" max="10" min="0" step="1"  v-model="$store.state.angSubEmo"/>
                            <datalist class="set-label-col" id="set-ang">
                                <option hidden>10</option>
                                <option hidden>5</option>
                                <option hidden>0</option>
                            </datalist>
                            <div class="set-label-col -translate-y-2">
                                <label>10</label>
                                <label>0</label>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                
            <div class="mt-3 border border-gray-400 p-5">
                <div>
                    <label class="text-left mr-5">อารมณ์อื่น ๆ</label>
                    <input class="set-label-in" type="text"  v-model="$store.state.labelOtherEmo"/>
                </div>
                <div class="mt-5" v-if="$store.state.labelOtherEmo !== ''">
                    <input class="w-[90%]" type="range"  list="set-othe" max="10" min="0" step="1" v-model="$store.state.otherSubEmo"/>
                    <datalist class="set-label-row" id="set-othe">
                        <option hidden>0</option>
                        <option hidden>5</option>
                        <option hidden>10</option>
                    </datalist>
                    <div class="set-label-row ml-3 mr-3">
                        <label>0</label>
                        <label>10</label>
                    </div>
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

        }
    },
    methods:{

    },
    mounted(){
        
    }
}
</script>

<style scoped>
input[type=range][orient=vertical]
{
    writing-mode: bt-lr; /* IE */
    -webkit-appearance: slider-vertical; /* Chromium */
    width: 8px;
    height: 175px;
    padding: 0 5px;
}

.set-label-in{
    text-indent: 10px;
    border: 2px solid rgb(165, 165, 165);
    background-color: #EFFAFF;
    border-radius:  10px;
}

.set-label-col{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: auto;
    overflow: hidden;
    margin-top: 16px; 
    font-size: 10px;
}

.set-label-row{
    display: flex;
    justify-content: space-between;
    height: auto;
    overflow: hidden;
    font-size: 12px;
}

.set-title{
    margin-bottom: 10px;
    margin-top: 10px;
    font-weight: bold;
}
</style>