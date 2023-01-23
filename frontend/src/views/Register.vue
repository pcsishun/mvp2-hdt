<template>
    <div class="container-register">    
        <div class=" mt-[50px] mb-5">
            <img class="m-auto" src="../assets/logo.png" height="100" width="100"/>
        </div>
        <div class="set-username ml-[10px] mr-[10px] rounded-lg">
            <div v-if="step === 0"> 
                <div class="title text-center mb-10">
                    <h4>ข้อมูลบุคคลทั้วไป</h4>
                </div>
                <div class="m-auto text-center mb-10">
                    <div class="text-left">อีเมล</div>
                    <input class="set-profile w-[100%] h-[35px]" type="email" v-model="email" required/>
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
                    <select class="set-profile w-[100%] h-[35px]" v-model="personality"  id="personality" name="personality">
                        <option value="นักวิเคราะห์: INTJ / INTP / ENTJ / ENTP">นักวิเคราะห์: INTJ / INTP / ENTJ / ENTP</option>
                        <option value="นกการฑูต: INFJ / INFP / ENFJ / ENFP">นกการฑูต: INFJ / INFP / ENFJ / ENFP</option>
                        <option value="ผู้เผ้ายาม: ISTJ / ISFJ / ESTJ / ESFJ">ผู้เผ้ายาม: ISTJ / ISFJ / ESTJ / ESFJ</option>
                        <option value="นักสำรวจ: ISTP / ISFP / ESTP / ESFP">นักสำรวจ: ISTP / ISFP / ESTP / ESFP</option>
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
                    <select class="set-profile w-[100%] h-[35px]" v-model="familySet"  id="family" name="family">
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
                            <div class="">
                                <input class=" w-[20px] h-[20px]" type="radio" name="gender" value="ชาย" v-model="gender" required/>
                            </div>
                            <label>ชาย</label>
                        </div>
                        <div class="set-gender">
                            <div class="">
                                <input class="ml-3 w-[20px] h-[20px]" type="radio" name="gender" value="หญิง" v-model="gender" required/>
                            </div>
                            <label>หญิง</label>
                        </div>
                        <div class="set-gender">
                            <div class="">
                                <input class="ml-3 w-[20px] h-[20px]" type="radio" name="gender" value="เพศทางเลือก" v-model="gender" required/>
                            </div>
                            <label>ทางเลือก</label>
                        </div>
                    </div>
                    <div class="m-auto text-center mb-10">
                        <div class="text-center">วันเกิด</div>
                        <input class="set-profile w-[100%] h-[35px]" type="date" v-model="birthDate" required/>
                    </div>
                </div>
                <div class="set-password m-auto text-center mb-10">
                    <div class="text-left">รหัส</div>
                    <input class="set-profile w-[100%] h-[35px]" type="password" v-model="setPassword" />
                </div>
                <div class="con-password m-auto text-center mb-10">
                    <div class="text-left">ยืนยันรหัส</div>
                    <input class="set-profile w-[100%] h-[35px]" type="password" v-model="conPassword" />
                </div>
            </div>

            <div v-if="step === 1">
                <div class="title text-center mb-10">
                    <h4>ลักษณะงาน</h4>
                </div>
                <div class="m-auto text-center mb-10">
                    <div class="text-left">สายงาน</div> 
                    <!-- <div>Working Nature</div> -->
                    <select class="set-profile w-[100%] h-[35px]" v-model="workingNature"  id="working_nature" name="working_nature">
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
                    <select class="set-profile w-[100%] h-[35px]" v-model="jobLevel"  id="job_level" name="job_level">
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
            </div>

            <div v-if="step === 2">
                <div class="title text-center mb-10">
                    <h4>งานอดิเรกและกิจกรรมยามว่าง</h4>
                </div>
                <div class="m-auto text-center mb-10">
                    <div class="text-left">งานอดิเรก</div> 
                    <!-- <div>Working Nature</div> -->
                    <select class="set-profile w-[100%] h-[35px]" v-model="hobby"  id="hobby" name="hobby">
                        <option value="Collecting: Physical / Record">Collecting: Physical / Record </option>
                        <option value="Making: Clothing / Cooking / Gardening / Modelling">Making: Clothing / Cooking / Gardening / Modelling</option>
                        <option value="Activities: Animal / Outdoor / Traveling">Activities: Animal / Outdoor / Traveling</option>
                        <option value="Play: Fitness / Game / Sport">Play: Fitness / Game / Sport</option>
                        <option value="Arts: Dance / Music / Theater / Visual / Literary">Arts: Dance / Music / Theater / Visual / Literary</option>
                    </select>
                    <!-- <input class="set-profile w-[100%] h-[35px]" type="email" v-model="email" required/> -->
                </div>
                <div class="m-auto text-center mb-10">
                    <div class="text-left">ช่วงเวลาพักผ่อน</div>
                    <!-- <div>Sector</div> -->
                    <!-- <input class="set-profile w-[100%] h-[35px]" v-model="firstname" required/> -->
                    <select class="set-profile w-[100%] h-[35px]" v-model="dealBreaker"  id="dealbreaker" name="dealbreaker">
                        <option value="irregular_hour">Irregular Hour</option>
                        <option value="physically_demanding">Physically Demanding</option>
                        <option value="relocation">Relocation</option>
                        <option value="shift_work">Shift Work</option>
                        <option value="mental_stress">Mental Stress</option>
                        <option value="benefit_balance">Benefit Balance</option>
                    </select>
                </div>
                <!-- <div class="m-auto text-center mb-10">
                    <div class="text-left">ระดับความเครียด</div>
                    <div class="stree-icon mt-5 flex justify-between">
                        <div>
                            <img  src="../assets/anger.png" height="30" width="30"/>
                        </div>
                        <div>
                            <img  src="../assets/happy.png" height="30" width="30"/>
                        </div>
                    </div>
                    <input class="w-[100%] h-[35px]" type="range" min="1" max="100" v-model="streeValue" required/>
                    <div class="text-left">
                        stree value: {{ streeValue }}
                    </div>
                </div> -->
                <div class="m-auto text-center mb-10">
                    <div class="text-left mb-3">
                        <label>เป้าหมายการใช้ application sookyen</label>
                    </div>
                    <textarea class="set-profile w-[100%] h-[100px]" v-model="mhGoal"></textarea>
                </div>
            </div>

            <div v-if="step === 3">
                <div class="title text-center mb-10" v-if="isError === ''">
                    สมัครสมาชิกสำเสร็จคลิกปุ่มด้านล่างเพื่อทำการ login เข้าระบบ
                </div>
                <div class="title text-center mb-10 text-red-700" v-if="isError !== ''">
                    {{ isError }}
                </div>
            </div>

 
        </div>
        <div class="error-show w-[80%] mt-5 m-auto text-center" v-if="isError !== ''">
            <div>
                {{isError}}
            </div>
        </div>
        <div class="btn-next text-center mt-10 pb-5 flex justify-center">
            <div class="ml-3 mr-3">
                <button v-if="step !== 0" class="set-btn-next w-[130px] rounded-lg" @click="backStep()">ย้อนกลับ</button>
            </div>
            <div class="ml-3 mr-3">
                <button v-if="step === 0" class="set-btn-next w-[130px] rounded-lg" @click="haddleStep_1()">ถัดไป</button>
                <button v-if="step === 1" class="set-btn-next w-[130px] rounded-lg" @click="haddleStep_2()">ถัดไป</button>
                <button v-if="step === 2" class="set-btn-next w-[130px] rounded-lg" @click="haddleRegister()">บันทึก</button>
                <button v-if="step === 3" class="set-btn-next w-[130px] rounded-lg" @click="haddleRedict()">กลับสู่หน้า login</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    components:{
        
    },
    data(){
        return{
            step:0,
            setPassword: "",
            conPassword: "",
            isError:"",
            email:"",
            firstname:"",
            lastname:"",
            personality:"",
            gender:"",
            birthDate:"",
            workingNature:"",
            sector:"",
            jobLevel:"",
            hobby:"",
            dealBreaker: "",
            familySet: "",
            streeValue: null,
            mhGoal: "",
            serverError: "",
            peiod:0
        }
    },
    methods:{
        reloadDefaultVariable(){
            this.$store.state.answerAndEmotion = []
            this.$store.state.answerCard = ""
            this.$store.state.answerGoal1 = ""
            this.$store.state.answerGoal2 = ""
            this.$store.state.answerGoal3 = ""
            this.$store.state.isUseMic = false
            this.$store.state.isGoalCard = false  
            this.$store.state.clickGoalans = null
            this.$store.state.setMic = "mic"
            this.$store.state.isRecord = false
            this.$store.state.emotionSlide = "0"
            this.$store.state.weightEmotion = 0
            this.$store.state.averageBpm = 0
            this.$store.state.myRatebpm = []
            this.$store.state.happySubEmo = 0
            this.$store.state.powSubEmo = 0
            this.$store.state.relaxSubEmo = 0
            this.$store.state.nerSubEmo = 0
            this.$store.state.disSubEmo = 0
            this.$store.state.sadSubEmo = 0 
            this.$store.state.ferSubEmo = 0
            this.$store.state.anxSubEmo = 0
            this.$store.state.angSubEmo = 0
            this.$store.state.labelOtherEmo = ""
            this.$store.state.otherSubEmo = ""
        },
        backStep(){
            if(this.step < 0){
                this.step -= 1;
            }else{
                this.step = 0;
            }
        }, 
        haddleStep_1(){
            const setEmail = this.email.trim();
            const setFirstname = this.firstname.trim();
            const setLastname = this.lastname.trim();
            const setPersonality = this.personality.trim();
            const setGender = this.gender.trim();
            const setBirthDate = this.birthDate.trim();
            
            if(this.setPassword === this.conPassword){
                if(this.step === 0){
                    if(setGender !== "" && setEmail !== "" && setFirstname !== "" 
                    && setLastname !== "" && setPersonality !== "" && this.setPassword !== ""
                    && setBirthDate !== ""){
                        this.step += 1;
                        this.isError = "";
                    }else{
                        this.isError = "อีเมล, ชื่อ, นามสกุล, เพศ, วันเกิด, รหัสผ่าน และ บุคลิกภาพ ไม่สามารถเว้นว่างได้"
                    }
                }
            }else{
                this.isError = "ยืนยันรหัสผ่านไม่ถูกต้อง"
            }
        },

        haddleStep_2(){
            

            const setWorkingNature = this.workingNature.trim();
            const setSector = this.sector.trim();
            const setJobLevel = this.jobLevel.trim();
            if(setWorkingNature !== "" && setSector !== "" && setJobLevel !== "" ){
                this.step += 1;
                this.isError = "";
            }else{
                this.isError = "สายงาน, ประเภทงาน, ระดับยงาน และ อายุงาน ไม่สามารถเว้นว่างได้"
            }
        },
        
        async haddleRegister(){
            // console.log("haddle register")
            const setMhGoal = this.mhGoal.trim();
            if(this.hobby !== ""  && setMhGoal !== "" && this.dealBreaker !== ""){
                const setDate = new Date();
                const isDate = setDate.getFullYear()+"/"+(setDate.getMonth() + 1)+"/"+setDate.getDate()+" "+(setDate.getHours()+7)+":" + setDate.getMinutes()+":"+setDate.getSeconds() 
                // register POST API //
                const payload = {
                    birthday: this.birthDate,
                    create_date: isDate,
                    dealbreaker: this.dealBreaker,
                    email: this.email,
                    exisiting_silution: this.hobby,
                    firstname: this.firstname,
                    gender: this.gender,
                    hobby: this.hobby,
                    job_level:  this.jobLevel,
                    lastname: this.lastname,
                    family: this.familySet,
                    mh_goal: setMhGoal,
                    password: this.setPassword,
                    peiod: this.peiod,
                    personality_type: this.personality,
                    sector: this.sector,
                    stree_level: this.streeValue,
                    tenan: "N/A",
                    update_date: isDate,
                    working_nature: this.workingNature
                }
 
                try{
                    const registerRepley = await axios.post("https://backend-hdt-register-zt27agut7a-as.a.run.app/api/register", payload)
                    console.log(registerRepley.data)
                    if(registerRepley.data.status === 200){
                        alert("สมัครสมาชิกสำเร็จ")
                        // console.log("this.step ==> ",this.step)
                        this.isError = ""
                        this.step += 1
                    }else{
                        this.isError = registerRepley.data.data
                        this.step += 1
                    }
                }catch(err){
                    alert(err)
                }
                // end POST API //

            }else{
                this.isError = "งานอดิเรก, ช่วงเวลาพักผ่อน, เป้าหมาย sookyen ไม่สามารถเว้นว่างได้"
            }
        },

        haddleRedict(){
            
            this.$router.push("/login");
            this.step = 0;
        }
    },
    mounted(){
        this.reloadDefaultVariable()
    }
}
</script>

<style scoped>


.set-username{
    border: 1px solid grey;
    padding: 30px;
}


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

 
.set-gender{
    display: grid;
    grid-template-columns: 1fr 2fr;
}

.set-btn-next{
    background: rgb(106, 106, 106);
    color: white;
    height: 50px;
}

.error-show{
    color: red;
}
</style>