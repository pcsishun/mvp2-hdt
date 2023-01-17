<template>
    <div class="is-loading m-auto mb-1 rounded-lg w-[140px] h-[120px]">

    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.is-loading{
    background: #FFC36D; 
    background: linear-gradient(110deg, #FFC36D 8%, #FFE4BE 18%, #FFC36D 33%);
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

 