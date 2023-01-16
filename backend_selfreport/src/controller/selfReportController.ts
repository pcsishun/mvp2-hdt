import {Datastore} from "@google-cloud/datastore"
import sentEnv from "../env_mangement" 
// import language from "@google-cloud/language"
// import * as dotenv from 'dotenv'
// dotenv.config({path:"../../.env"})
const envData = sentEnv();
const datastore = new Datastore();
const kind = process.env.KIND || "emotion"

async function selfReportController(req:any, res:any) {
    const {data} = req.body;
    const decodeData = req.authData;
    let warping;
    if(decodeData.decode.email && decodeData.decode.tenan && decodeData.token){
        const setDate = new Date();
        const isDate = setDate.getFullYear()+"/"+(setDate.getMonth() + 1)+"/"+setDate.getDate()+" "+(setDate.getHours()+7)+":" + setDate.getMinutes()+":"+setDate.getSeconds()
        // console.log("gen date")
        try{
            const taskKey = datastore.key([kind])
            const task = {
                key: taskKey,
                data:{
                    email: decodeData.decode.email,
                    tenan: decodeData.decode.tenan,
                    arrayOfanswer: data.arrayOfanswer,
                    mainEmotion: data.mainEmotion,
                    weightMainEmotion: data.weightMainEmotion,
                    happyRange: data.happyRange,
                    powRange: data.powRange,
                    relaxRange: data.relaxRange,
                    relievedRange: data.relievedRange,
                    normalRange: data.normalRange,
                    disgustedRange: data.disgustedRange,
                    sadRange: data.sadRange,
                    fearRange: data.fearRange,
                    worryRange: data.worryRange,
                    angerRange: data.angerRange,
                    otherEmotionLabel: data.otherEmotionLabel,
                    otherRangeEmotion: data.otherRangeEmotion,
                    averagBpm: data.averagBpm,
                    create_date: isDate,
                    // isDay:setDate.getDate(),
                    // isMonth: setDate.getMonth() + 1,
                    // isYear: setDate.getFullYear(),
                    // isHours: setDate.getHours() + 7,
                    // isMinute: setDate.getMinutes(),
                    // isSecond: setDate.getSeconds()
                }
            }
            
            await datastore.save(task)
            warping = {
                status:200,
                data: "insert success."
            }
            console.log("saved")
            res.send(warping)
        }catch(err){
            warping = {
                status: 500,
                data: err
            }
            res.send(warping)
        }
    }else{
        warping = {
            status:403,
            data: "invalid user."
        }
        res.send(warping)
    }
    
}
export default selfReportController