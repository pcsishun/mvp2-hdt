<template>
    <div class="update-profile-container">
        <div class="title mt-10 text-center font-bold">แก้ไขโปรไฟล์</div>
        <div class="mt-5 border border-gray-500 rounded-lg w-[95%] m-auto">
            
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    components:{

    },
    data(){
        return{

        }
    },
    methods:{
        async haddleAuth(){
            const headerConf = {
                    headers:{
                        "access-token": this.$cookies.get("hdt-token")
                    }
                } 
            const authCheck = await axios.get("https://backend-hdt-auth-zt27agut7a-as.a.run.app/api/auth",headerConf);
            if(authCheck.data !== 200 ){
                this.$cookies.remove('hdt-token')
                this.$cookies.remove("hdt-user")
                alert("session expired.")
                this.$router.push("/login")
            }
        },
    },
    beforeMount(){
        this.haddleAuth();
    },
    mounted(){

    }
}
</script>

<style scoped>

</style>