import { Datastore } from "@google-cloud/datastore";
// import wordCloudService from "./wordCloudService"
import dotenv from "dotenv"
// import axios from "axios"
dotenv.config({path:"../../.env"})

const datastore = new Datastore();
const kind_tenan = process.env.KIND_TENANPROFILE || "profiletenan"
const kind_emo = process.env.KIND_EMO || "emotion"

async function homepageController(req:any, res:any) {
    const userProfile = req.authData
    const email = userProfile.decode.email
    const tenan = userProfile.decode.tenan
    // console.log("my email=> ", email, "my tenan =>", tenan)
    let warping
    if(email && tenan){
        try{
            const setDate = new Date();
            const isDate = setDate.getFullYear()+"/"+(setDate.getMonth() + 1)+"/"+setDate.getDate()+" "+(setDate.getHours()+7)+":" + setDate.getMinutes()+":"+setDate.getSeconds()
            const before_Date = setDate.getFullYear()+"/"+(setDate.getMonth() + 1)+"/"+(setDate.getDate() - 5)+" "+(setDate.getHours()+7)+":" + setDate.getMinutes()+":"+setDate.getSeconds()

            const createTenanQuery = datastore.createQuery(kind_tenan)
            .filter("email" , "=", email)
            .limit(1)

            const [taskTenan]:any  = await datastore.runQuery(createTenanQuery)
            if(taskTenan[0]){
                    const createEmotion = datastore.createQuery(kind_emo)
                    .filter("email", "=", email)
                    .filter("tenan", "=", tenan)
                    .filter("create_date", "<=", isDate)
                    .filter("create_date", ">=", before_Date)
                    .limit(5)

                    const [taskData]:any  = await datastore.runQuery(createEmotion)
                    let longText = "";
                    for(let i = 0; i < taskData[0].arrayOfanswer.length; i++){
                        longText = longText + " " + taskData[0].arrayOfanswer[i].answer
                    }
                    try{
                        const replyData = {
                            status:200,
                            text: longText,
                            data:taskData
                        }
                        res.send(replyData)
                    }catch(err){
                        warping = {
                            status: 500,
                            text: err
                        }
                        res.send(warping)
                    }

            }else{
                warping = {
                    status: 401,
                    text: "session expired."
                }
                res.send(warping)
            }
        }catch(err){
            warping = {
                status: 500,
                text: err
            }
        }
    }else{  
        warping = {
            status: 403,
            text: "unauthorized"
        }
        res.send(warping)
    }
}

export default homepageController