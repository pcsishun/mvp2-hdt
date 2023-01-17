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
            const isToken = this.$cookies.get("hdt-token");
            const headerConf = {
                    headers:{
                        "access-token": isToken.token
                    }
                } 
            const authCheck = await axios.get("https://backend-hdt-auth-zt27agut7a-as.a.run.app/api/auth",headerConf);
            if(authCheck.data !== 200 ){
                alert("unauthorized")
                this.$cookies.remove('hdt-token');
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