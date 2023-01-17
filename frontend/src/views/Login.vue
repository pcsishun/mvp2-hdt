<template>
    <div class="container-login w-[95%] text-center m-auto">
        <div class="logo-c mt-[110px] text-center">
            <img class="text-center m-auto mb-10" src="../assets/logo.png" height="100" width="100"/>
        </div>
        <div class="w-[70%] m-auto">
            <div class="login-container">
                <div class="l-email-container text-left">
                    <label class="">Email</label>
                </div>
                <div>
                    <input class="set-input w-[100%] h-[50px]" type="email" v-model="email"/>
                </div>
            </div>
            <div class="password-container mt-10">
                <div  class="l-password-container text-left">
                    <label>Password</label>
                </div>
                <div>
                    <input class="set-input w-[100%] h-[50px]" type="password" v-model="password"/>
                </div>
            </div>
        </div>
        <div class="error-status" v-if="isError !== ''">
            {{ isError }}
        </div>
        <div>
            <button class="mt-20 w-[250px] h-[50px] rounded-lg font-bold text-white" @click="haddleLogin">Login</button>
            <div class="mt-5 w-[100px] m-auto"><u @click="haddleToRegister">สมัครสมาชิก</u></div>
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
            email: "",
            password: "",
            isError: "",
            apiLogin: import.meta.env.SERVICE_LOGIN
        }
    },
    methods:{
        async haddleLogin(){
            this.$store.state.loading = true
            if(this.email && this.password){
                // start connect to backend at login service //
                const payload = {
                    email: this.email,
                    password: this.password
                }
                const userAccess = await axios.post("https://backend-hdt-login-zt27agut7a-as.a.run.app/api/login",payload)
                // console.log("userAccess", userAccess.data)
                if(userAccess.status === 200){
                    // console.log("login!")
                    this.$cookies.set("hdt-token", userAccess.data.token)
                    this.$cookies.set("hdt-user", userAccess.data.username)
                    this.$store.state.loading = false
                    this.$router.push("/")
                }else{
                    this.$store.state.loading = false
                    this.isError = "Invalid email or password."
                }
            }else{
                this.$store.state.loading = false
                this.isError = "Email and password are require to login."
            }
        },
        haddleToRegister(){
            this.$store.state.loading = false
            this.$router.push("/register")
        }
    },
    mounted(){
        // console.log("API ===> ",this.apiLogin, import.meta.env.SERVICE_LOGIN)
    }
}
</script>

<style scoped>
label{
    font-weight: bold;
}
.set-input{
    text-indent: 10px;
    border-bottom: 2px solid rgb(165, 165, 165);
    background-color: #EFFAFF;
}

.set-input:focus{
    outline: none;
}

.set-input::placeholder{
    text-align: center;
}

button{
    background: rgb(8, 156, 255);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
}
</style>