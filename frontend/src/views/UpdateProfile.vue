<template>
    <div class="set-menu">
        <Navbar/>
        <Menu/>
    </div>
    <div class="update-profile-container">
        <div class="title mt-10 text-center font-bold">แก้ไขโปรไฟล์</div>
        <div class="mt-5 border border-gray-400/[0.5] rounded-lg w-[87%] m-auto text-center">
            <div class="w-[95%] p-5 m-auto">
                <div class="title text-center mb-10 border rounded-xl border-gray-400">
                    <h4>ข้อมูลบุคคลทั้วไป</h4>
                </div>
                <div class="m-auto text-center mb-10">
                    <div class="text-left">ชื่อ</div>
                    <input class="set-profile w-[100%] h-[35px]" v-model="firstname" required/>
                </div>
                <div class="m-auto text-center mb-10">
                    <div class="text-left">นามสกุล</div>
                    <input class="set-profile w-[100%] h-[35px]" v-model="lastname" required/>
                </div>
                <div class="m-auto text-center mb-10">
                    <div class="text-left">บุคลิกภาพ</div>
                    <!-- <input class="set-profile w-[100%] h-[35px]" v-model="personality" required/> -->
                    <select class="set-profile w-[100%] h-[35px]" v-model="personality_type"  id="personality" name="personality">
                        <option value="anaylzer">นักวิเคราะห์: INTJ / INTP / ENTJ / ENTP</option>
                        <option value="diplomat">นกการฑูต: INFJ / INFP / ENFJ / ENFP</option>
                        <option value="watchman">ผู้เผ้ายาม: ISTJ / ISFJ / ESTJ / ESFJ</option>
                        <option value="explorer">นักสำรวจ: ISTP / ISFP / ESTP / ESFP</option>
                    </select>
                    <div class="text-left mt-3 text-blue-500">
                        <a href="https://www.16personalities.com/th/%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%97%E0%B8%94%E0%B8%AA%E0%B8%AD%E0%B8%9A%E0%B8%9A%E0%B8%B8%E0%B8%84%E0%B8%84%E0%B8%A5%E0%B8%B4%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%9E">
                            <u>สำรวจบุคคลิกภาพของตัวเองได้ที่นี่</u>
                        </a>
                    </div>
                </div>
    
                <div class="m-auto text-center mb-10">
                    <div class="text-left">สถานะครอบครัว</div>
                    <!-- <input class="set-profile w-[100%] h-[35px]" v-model="personality" required/> -->
                    <select class="set-profile w-[100%] h-[35px]" v-model="family"  id="family" name="family">
                        <option value="โสดใช้ชีวิตอิสร">โสดใช้ชีวิตอิสระ</option>
                        <option value="สดดูแลพ่อแม่/ผู้สูงอายุ">โสดดูแลพ่อแม่ / ผู้สูงอายุ</option>
                        <option value="มีครอบครัวมีPartner">มีครอบครัว / มี Partner</option>
                        <option value="มีครอบครัวมีลูกอายุต่ำกว่า12ขวบ">มีครอบครัว มีลูกอายุต่ำกว่า 12 ขวบ</option>
                        <option value="มีครอบครัวมีลูกอายุ13ปีขึ้นไป">มีครอบครัว มีลูกอายุ 13 ปีขึ้นไป</option>
                        <option value="มีครอบครัวและลูกแยกไปใช้ชีวิตของตนเองแล้ว">มีครอบครัว และลูกแยกไปใช้ชีวิตของตนเองแล้ว</option>
                        <option value="พ่อ/แม่เลี้ยงเดี่ยวมีลูกอายุต่ำกว่า12ขวบ">พ่อ/แม่เลี้ยงเดี่ยว มีลูกอายุต่ำกว่า 12 ขวบ</option>
                        <option value="พ่อ/แม่เลี้ยงเดี่ยวมีลูกอายุ13ปีขึ้นไป">พ่อ/แม่เลี้ยงเดี่ยว มีลูกอายุ 13 ปีขึ้นไป</option>
                    </select>
                </div>
    
                <div class="flex">
                    <div class="m-auto mb-10 text-right">
                        <div class="text-left mb-3">เพศ</div>
                        <div class="set-gender">
                            <div class="flex justify-between">
                                <label>ชาย</label>
                                <input class=" w-[20px] h-[20px]" type="radio" name="gender" value="ชาย" v-model="gender" required/>
                            </div>
                            
                        </div>
                        <div class="set-gender">
                            <div class="flex justify-between">
                                <label>หญิง</label>
                                <input class="ml-3 w-[20px] h-[20px]" type="radio" name="gender" value="หญิง" v-model="gender" required/>
                            </div>
                            
                        </div>
                        <div class="set-gender">
                            <div class="flex justify-between">
                                <label>อื่นๆ</label>
                                <input class="ml-3 w-[20px] h-[20px]" type="radio" name="gender" value="เพศทางเลือก" v-model="gender" required/>
                            </div>
                        </div>
                    </div>
                    <div class="m-auto text-center mb-10">
                        <div class="text-center">วันเกิด</div>
                        <input class="set-profile w-[100%] h-[35px]" type="date" v-model="birthday" required/>
                    </div>
                </div>
                <div class="title text-center mb-10 border rounded-xl border-gray-400">
                    <h4>ลักษณะงาน</h4>
                </div>
                <div class="m-auto text-center mb-10">
                    <div class="text-left">สายงาน</div> 
                    <!-- <div>Working Nature</div> -->
                    <select class="set-profile w-[100%] h-[35px]" v-model="working_nature"  id="working_nature" name="working_nature">
                        <option value="creative">Being Creative: Designer / Architect / Advertising / Mass Communication </option>
                        <option value="leading&guiding">Leading & Guiding: Analyst / Specialist / Professional / Project Admin</option>
                        <option value="solving_problem">Solving Problem: ICT / Software test / System Engineer </option>
                        <option value="working_outdoor">Working outdoor: Civil Engineer / Foreman</option>
                        <option value="working_with_data">Working with data & details: Web dev / QA / System analyst / R&D</option>
                        <option value="working_with_my_hands">Working with my hands: Programmer / Craftman</option>
                        <option value="working_with_people">Working with people: Marketing / Sales / Call Center / Receptionist / Flight Attendant</option>
                    </select>
                    <!-- <input class="set-profile w-[100%] h-[35px]" type="email" v-model="email" required/> -->
                </div>
                <div class="m-auto text-center mb-10">
                    <div class="text-left">ประเภทของงาน</div>
                    <!-- <div>Sector</div> -->
                    <!-- <input class="set-profile w-[100%] h-[35px]" v-model="firstname" required/> -->
                    <select class="set-profile w-[100%] h-[35px]" v-model="sector"  id="sector" name="sector">
                        <option value="private_company_employee">Private Company employee</option>
                        <option value="government">Government</option>
                        <option value="freelance">Freelance</option>
                        <option value="business_owner">Business Owner</option>
                    </select>
                </div>
    
                <div class="m-auto text-center mb-10">
                    <div class="text-left">ระดับงาน</div>
                    <!-- <div>Job Level</div> -->
                    <!-- <input class="set-profile w-[100%] h-[35px]" v-model="lastname" required/> -->
                    <select class="set-profile w-[100%] h-[35px]" v-model="job_level"  id="job_level" name="job_level">
                        <option value="employee">Employee</option>
                        <option value="first_line_manager">First line Manager</option>
                        <option value="management">Management</option>
                    </select>
                </div>
                <div class="m-auto text-center mb-10">
                    <div class="text-left">อายุงาน (ปี)</div>
                    <!-- <div>Job Level</div> -->
                    <input class="set-profile w-[100%] h-[35px]" type="number" v-model="peiod" required/>
                </div>
                <div class="title text-center mb-10 border rounded-xl border-gray-400">
                    <h4>งานอดิเรกและกิจกรรมยามว่าง</h4>
                </div>
                <div class="m-auto text-center mb-10">
                    <div class="text-left">งานอดิเรก</div> 
                    <!-- <div>Working Nature</div> -->
                    <select class="set-profile w-[100%] h-[35px]" v-model="hobby"  id="hobby" name="hobby">
                        <option value="collecting">Collecting: Physical / Record </option>
                        <option value="making">Making: Clothing / Cooking / Gardening / Modelling</option>
                        <option value="activities">Activities: Animal / Outdoor / Traveling</option>
                        <option value="play">Play: Fitness / Game / Sport</option>
                        <option value="arts">Arts: Dance / Music / Theater / Visual / Literary</option>
                    </select>
                    <!-- <input class="set-profile w-[100%] h-[35px]" type="email" v-model="email" required/> -->
                </div>
                <div class="m-auto text-center mb-10">
                    <div class="text-left">ช่วงเวลาพักผ่อน</div>
                    <!-- <div>Sector</div> -->
                    <!-- <input class="set-profile w-[100%] h-[35px]" v-model="firstname" required/> -->
                    <select class="set-profile w-[100%] h-[35px]" v-model="dealbreaker"  id="dealbreaker" name="dealbreaker">
                        <option value="irregular_hour">Irregular Hour</option>
                        <option value="physically_demanding">Physically Demanding</option>
                        <option value="relocation">Relocation</option>
                        <option value="shift_work">Shift Work</option>
                        <option value="mental_stress">Mental Stress</option>
                        <option value="benefit_balance">Benefit Balance</option>
                    </select>
                </div>
                <div class="m-auto text-center mb-10">
                    <div class="text-left">ระดับความเครียด</div>
                    <!-- <div>Job Level</div> -->
                    <div class="stree-icon mt-5 flex justify-between">
                        <div>
                            <img  src="../assets/anger.png" height="30" width="30"/>
                        </div>
                        <div>
                            <img  src="../assets/happy.png" height="30" width="30"/>
                        </div>
                    </div>
                    <input class="w-[100%] h-[35px]" type="range" min="1" max="100" v-model="stree_level" required/>
                    <div class="text-left">
                        stree value: {{ stree_level }}
                    </div>
                </div>
                <div class="m-auto text-center mb-10">
                    <div class="text-left mb-3">
                        <label>เป้าหมายการใช้ application sookyen</label>
                    </div>
                    <textarea class="set-profile w-[100%] h-[100px]" v-model="mh_goal"></textarea>
                </div>
            </div>
        </div>
        <div class="mb-[50px] mt-[50px] text-center">
            <button class="w-[200px] bg-blue-500 h-[50px] text-[20px] text-white rounded-lg">ยืนยัน</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Navbar from '../components/navbar/Navbar.vue';
import Menu from '../components/menu/Menu.vue';


export default {
    components:{
        Navbar,
        Menu
    },
    data(){
        return{
            birthday: "",  
            dealbreaker: "",  
            exisiting_silution: "",
            family: "",  
            firstname: "", 
            gender: "",  
            hobby: "",  
            job_level: "",  
            lastname: "",  
            mh_goal: "",  
            peiod: "",  
            personality_type: "",  
            sector: "",  
            stree_level: "",  
            working_nature: ""  
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
            console.log(authCheck.data)
            if(authCheck.data !== 'OK' ){
                this.$cookies.remove('hdt-token')
                this.$cookies.remove("hdt-user")
                alert("session expired.")
                this.$router.push("/login")
            }
        },

        async fetchUserProfile () {
            this.$store.state.loading = true
            const headerConf = {
                    headers:{
                        "access-token": this.$cookies.get("hdt-token")
                    }
                }

            try{
                const userProfileData = await axios.get("https://backend-hdt-updateprofile-zt27agut7a-as.a.run.app/api/getProfile", headerConf);
                    console.log("userProfileData =>", userProfileData.data)
                    if(userProfileData.data.status === 200){
                    this.birthday = userProfileData.data.data.birthday,  
                    this.dealbreaker = userProfileData.data.data.dealbreaker,  
                    this.exisiting_silution = userProfileData.data.data.exisiting_silution,
                    this.family = userProfileData.data.data.family,  
                    this.firstname = userProfileData.data.data.firstname, 
                    this.gender = userProfileData.data.data.gender,  
                    this.hobby = userProfileData.data.data.hobby,  
                    this.job_level = userProfileData.data.data.job_level,  
                    this.lastname = userProfileData.data.data.lastname,  
                    this.mh_goal = userProfileData.data.data.mh_goal,  
                    this.peiod = userProfileData.data.data.peiod,  
                    this.personality_type = userProfileData.data.data.personality_type,  
                    this.sector = userProfileData.data.data.sector,  
                    this.stree_level = userProfileData.data.data.stree_level,  
                    this.working_nature = userProfileData.data.data.working_nature 
                    this.$store.state.loading = false
                }else{
                    this.$store.state.loading = false
                    this.$cookies.remove('hdt-token')
                    this.$cookies.remove("hdt-user")
                    this.$router.push("/login")
                }

            }catch(err){
                this.$store.state.loading = false
                this.$cookies.remove('hdt-token')
                this.$cookies.remove("hdt-user")
                this.$router.push("/login")
            }
            
            
        }
    },
    beforeMount(){
        this.haddleAuth();
    },
    mounted(){
        this.fetchUserProfile();
    }
}
</script>

<style scoped>
.set-profile{
    text-indent: 10px;
    border-bottom: 2px solid rgb(165, 165, 165);
    background-color: #EFFAFF;
}

.set-profile:focus{
    outline: none;
}

.set-profile::placeholder{
    text-align: center;
}
</style>