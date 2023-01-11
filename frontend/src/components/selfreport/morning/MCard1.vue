<template>
    <div class="c-card-1">
        <div class="warp">
            <div class="description-text mt-5">
                <div class="text-desc"> วันนี้มีแผนจะทำอะไรบ้างหรือเปล่าค่ะ ช่วยบอกอย่างน้อย 3 เรื่องด้วยค่ะ</div>
            </div>
            <div class="input-container mt-10 p-5">
                <input class="set-input-1 w-[90%]" placeholder="เรื่องที่ 1"/>
                <input class="set-input-2 w-[90%] mt-8" placeholder="เรื่องที่ 2"/>
                <input class="set-input-3 w-[90%] mt-8" placeholder="เรื่องที่ 3"/>
            </div>
            <!-- <div class="btn-selfreport mt-[40px] p-5">
                <button class="border border-stone-800 w-[200px] h-[50px] rounded-lg text-slate-50 bg-slate-700" @click="haddleNextCard" >
                    ถัดไป
                </button>
            </div> -->
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

<style scoped>
.set-input-1, .set-input-2, .set-input-3{
    text-indent: 10px;
    border-bottom: 2px solid rgb(165, 165, 165);
    background-color: #EFFAFF;
}

.set-input:focus{
    outline: none;
}

.set-input::placeholder{
    margin-left: 20px;
}

.text-desc{
    animation: fadeIn 2s;
}

.set-input-1{
    animation: fadeIn-1 4s;
}

.set-input-2{
    animation: fadeIn-2 4.5s;
}

.set-input-3{
    animation: fadeIn-3 5s;
}


@keyframes fadeIn{
    0%{opacity: 0;}
    100%{opacity: 1;}
}


@keyframes fadeIn-1{
    0%{opacity: 0;}
    100%{opacity: 1;}
}
@keyframes fadeIn-2{
    0%{opacity: 0;}
    100%{opacity: 1;}
}
@keyframes fadeIn-3{
    0%{opacity: 0;}
    100%{opacity: 1;}
}
</style>