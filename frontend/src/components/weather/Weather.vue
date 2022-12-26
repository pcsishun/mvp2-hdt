<template>
    <div >
        <div class="set-text mt-4 mb-4  text-[17px] font-bold">
            <div>Good Afternoon, Vicky!</div>
            <div>
                <div class="ml-[25%]">
                    <div class="flex justify-start">
                        <img  src="../../assets/weather.png" height="60" width="60"/>
                    </div>
                    <div class="text-left">
                        15 Nov, 27 oC
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

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