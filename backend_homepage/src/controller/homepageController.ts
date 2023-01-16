import { Datastore } from "@google-cloud/datastore";
import wordCloudService from "./wordCloudService"
import dotenv from "dotenv"
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
            // console.log("test task tenan => ", taskTenan)
            if(taskTenan[0]){
                try{
                    // console.log("kind_emo=> ", kind_emo)
                    const createEmotion = datastore.createQuery(kind_emo)
                    .select([
                        'normalRange',
                        'sadRange', 
                        'fearRange', 
                        'angerRange', 
                        'relaxRange', 
                        'happyRange', 
                        'relievedRange', 
                        'powRange', 
                        'otherRangeEmotion',
                        'worryRange',
                        'disgustedRange',
                        'mainEmotion',
                        'averagBpm',
                        'arrayOfanswer'
                    ])
                    .filter("email", "=", email)
                    .filter("tenan", "=", tenan)
                    .filter("create_date", "<=", isDate)
                    .filter("create_date", ">=", before_Date)

                    const [taskData]:any  = await datastore.runQuery(createEmotion)
                    // console.log("taskData => ", taskData)
                    try{
                        const imgBase64 =  wordCloudService(taskData.arrayOfanswer)
                        const replyData = {
                            status:200,
                            wordCloud: imgBase64,
                            data:taskData
                        }
                        res.send(replyData)
                    }catch{
                        const replyData = {
                            status:200,
                            wordCloud:null,
                            data:taskData
                        }
                        res.send(replyData)
                    }
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