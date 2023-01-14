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
                            <datalist id="set-happy">
                                <option>10</option>
                                <option>5</option>
                                <option>0</option>
                            </datalist>
                        </div>
                    </div>
                    <div>
                        <div class="set-title text-[14px]">ภูมิใจ</div>
                        <div class="flex">
                            <input type="range" orient="vertical" list="set-pow" max="10" min="0" step="1" v-model="$store.state.powSubEmo"/>
                            <datalist id="set-pow">
                                <option>10</option>
                                <option>5</option>
                                <option>0</option>
                            </datalist>
                        </div>
                    </div>
                    <div>
                        <div class="set-title text-[14px]">สงบ</div>
                        <div class="flex">
                            <input type="range" orient="vertical" list="set-relax" max="10" min="0" step="1" v-model="$store.state.relaxSubEmo"/>
                            <datalist id="set-relax">
                                <option  >10</option>
                                <option  >5</option>
                                <option  >0</option>
                            </datalist>
                        </div>
                        
                    </div>
                    <div>
                        <div class="set-title text-[14px]">โล่งใจ</div>
                        <div class="flex">
                            <input type="range" orient="vertical" list="set-relax-x" max="10" min="0" step="1" v-model="$store.state.relaxXSubEmo"/>
                            <datalist id="set-relax-x">
                                <option>10</option>
                                <option>5</option>
                                <option>0</option>
                            </datalist>
                        </div>
                    </div>
                    <div>
                        <div class="set-title text-[14px]">เฉยๆ</div>
                        <div class="flex">
                            <input type="range" orient="vertical" list="set-ner" max="10" min="0" step="1" v-model="$store.state.nerSubEmo"/>
                            <datalist id="set-ner">
                                <option>10</option>
                                <option>5</option>
                                <option>0</option>
                            </datalist>
                        </div>
                    </div>
                </div>
                <div class="flex justify-around mt-5">
                    <div>
                        <div class="set-title text-[14px]">ผิดหวัง</div>
                        <div class="flex">
                            <input type="range" orient="vertical" list="set-dis" max="10" min="0" step="1" v-model="$store.state.disSubEmo"/>
                            <datalist id="set-dis">
                                <option>10</option>
                                <option>5</option>
                                <option>0</option>
                            </datalist>
                        </div>
                    </div>
                    <div>
                        <div class="set-title text-[14px]">เศร้า</div>
                        <div class="flex">
                            <input type="range" orient="vertical" list="set-sad" max="10" min="0" step="1" v-model="$store.state.sadSubEmo"/>
                            <datalist id="set-sad">
                                <option>10</option>
                                <option>5</option>
                                <option>0</option>
                            </datalist>
                        </div>
                    </div>
                    <div>
                        <div class="set-title text-[14px]">กลัว</div>
                        <div class="flex">
                            <input type="range" orient="vertical" list="set-fer" max="10" min="0" step="1" v-model="$store.state.ferSubEmo"/>
                            <datalist id="set-fer">
                                <option>10</option>
                                <option>5</option>
                                <option>0</option>
                            </datalist>
                        </div>
                    </div>
                    <div>
                        <div class="set-title text-[14px]">กังวล</div>
                        <div class="flex">
                            <input type="range" orient="vertical" list="set-anx" max="10" min="0" step="1" v-model="$store.state.anxSubEmo"/>
                            <datalist id="set-anx">
                                <option>10</option>
                                <option>5</option>
                                <option>0</option>
                            </datalist>
                        </div>
                    </div>
                    <div>
                        <div class="set-title text-[14px]">โกรธ</div>
                        <div class="flex"> 
                            <input type="range" orient="vertical" list="set-ang" max="10" min="0" step="1"  v-model="$store.state.angSubEmo"/>
                            <datalist id="set-ang">
                                <option>10</option>
                                <option>5</option>
                                <option>0</option>
                            </datalist>
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
                    <datalist id="set-othe">
                        <option>0</option>
                        <option>5</option>
                        <option>10</option>
                    </datalist>
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

datalist{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: auto;
    overflow: hidden;
    margin-top: 16px; 
    font-size: 12px;
}
.set-title{
    margin-bottom: 10px;
    margin-top: 10px;
    font-weight: bold;
}
</style>