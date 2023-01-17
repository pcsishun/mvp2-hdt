<template>
    <div class="is-loading  m-auto mb-1 rounded-xl w-[320px] h-[160px]">

    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.is-loading{
    background: #EFFAFF;  
    background: linear-gradient(110deg, #EFFAFF 8%, #FFFFFF 18%, #EFFAFF 33%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 1.5s loading linear infinite;
}

@keyframes loading{
    to {
        background-position-x: -200%;
    }
}
</style>

 