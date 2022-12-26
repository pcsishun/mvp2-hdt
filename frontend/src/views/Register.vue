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
                    <input class="set-profile w-[100%] h-[35px]" v-model="personality" required/>
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
                    <div class="text-left">หน่วยงาน</div>
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
                    <input class="set-profile w-[100%] h-[35px]" type="number" v-model="lastname" required/>
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
                    <select class="set-profile w-[100%] h-[35px]" v-model="dealBreaker"  id="dealbreaker" name="dealbreaker">
                        <option value="private_company_employee">Irregular Hour</option>
                        <option value="government">Physically Demanding</option>
                        <option value="freelance">Relocation</option>
                        <option value="business_owner">Shift Work</option>
                        <option value="business_owner">Mental Stress</option>
                        <option value="business_owner">Benefit Balance</option>
                    </select>
                </div>
                <!-- <div class="m-auto text-center mb-10">
                    <div class="text-left">ตำแหน่งงาน</div> -->
                    <!-- <div>Job Level</div> -->
                    <!-- <input class="set-profile w-[100%] h-[35px]" v-model="lastname" required/> -->
                    <!-- <select class="set-profile w-[100%] h-[35px]" v-model="position"  id="job_level" name="job_level">
                        <option value="employee">Employee</option>
                        <option value="first_line_manager">First line Manager</option>
                        <option value="management">Management</option>
                    </select> -->
                <!-- </div> -->
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
                    <input class="w-[100%] h-[35px]" type="range" min="1" max="100" v-model="streeValue" required/>
                    <div class="text-left">
                        stree value: {{ streeValue }}
                    </div>
                </div>
                <div class="m-auto text-center mb-10">
                    <div class="text-left mb-3">
                        <label>เป้าหมายการใช้ application sookyen</label>
                    </div>
                    <textarea class="set-profile w-[100%] h-[100px]" v-model="mhGoal"></textarea>
                </div>
            </div>

            <div v-if="step === 3">
                <div class="title text-center mb-10">
                    สมัครสมาชิกสำเสร็จคลิกปุ่มด้านล่างเพื่อทำการ login เข้าระบบ
                </div>
                <div class="m-auto text-center mb-10">
                    
                </div>
            </div>

        </div>
        <div class="error-show w-[80%] mt-5 m-auto text-center" v-if="isError !== ''">
            <div>
                {{isError}}
            </div>
        </div>
        <div class="btn-next text-center mt-10 pb-5">
            <button v-if="step === 0" class="set-btn-next w-[60%] rounded-lg" @click="haddleStep_1()">ถัดไป</button>
            <button v-if="step === 1" class="set-btn-next w-[60%] rounded-lg" @click="haddleStep_2()">ถัดไป</button>
            <button v-if="step === 2" class="set-btn-next w-[60%] rounded-lg" @click="haddleRegister()">บันทึก</button>
            <button v-if="step === 3" class="set-btn-next w-[60%] rounded-lg" @click="haddleRedict()">กลับสู่หน้า login</button>
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
            step:2,
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
            position: "",
            streeValue: 50,
            mhGoal: ""
        }
    },
    methods:{
        haddleStep_1(){
            const setEmail = this.email.trim();
            const setFirstname = this.firstname.trim();
            const setLastname = this.lastname.trim();
            const setPersonality = this.personality.trim();

            if(this.step === 0){
                if(setEmail !== "" && setFirstname !== "" && setLastname !== "" && setPersonality !== ""){
                    this.step += 1;
                    this.isError = "";
                }else{
                    this.isError = "email, firstname, lastname, gender, birthdate must not be empty."
                }
            }
        },

        haddleStep_2(){
            const setGender = this.gender.trim();
            const setBirthDate = this.birthDate.trim();
            const setWorkingNature = this.workingNature.trim();
            const setSector = this.sector.trim();
            const setJobLevel = this.jobLevel.trim();

            if(setGender !== "" && setBirthDate !== "" && setWorkingNature !== "" && setSector !== "" && setJobLevel !== ""){
                this.step += 1;
                this.isError = "";
            }else{
                this.isError = "gender, birthdate, working natire, sector, birthdate must not be empty."
            }
        },
        
        haddleRegister(){
            
            const setHobby = this.hobby.trim();
            // const setPosition = this.position.trim();
            const setMhGoal = this.mhGoal.trim();
            console.log("setHobby", setHobby);
            // console.log("setPosition", setPosition)
            console.log("setMhGoal", setMhGoal)

            if(setHobby !== ""  && setMhGoal !== ""){
                // register POST API //
                this.isError = "";
                this.step += 1;
                alert("สมัครสมาชิกสำเร็จ");
            }else{
                this.isError = "hobby, joblevel, mhgoal must not be empty"
            }
        },

        haddleRedict(){
            
            this.$router.push("/login");
            this.step = 0;
        }
    },
    mounted(){
        
    }
}
</script>

<style scoped>

/*.container-register{
    background-image: url('../assets/register_phone.jpg');
    background-size: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    color: white;
}*/


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