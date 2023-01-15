import {Datastore} from "@google-cloud/datastore"
import language from "@google-cloud/language"
import * as dotenv from 'dotenv'
dotenv.config({path:"../../.env"})

const datastore = new Datastore();
const kind = process.env.KIND || "emotion"

async function selfReportController(req:any, res:any) {
    const {token, email, tenan, data} = req.body;
    let warping;
    if(email && tenan){

        const setDate = new Date();
        const isDate = setDate.getFullYear()+"/"+(setDate.getMonth() + 1)+"/"+setDate.getDate()+" "+(setDate.getHours()+7)+":" + setDate.getMinutes()+":"+setDate.getSeconds()

        try{
            const taskKey = datastore.key([kind])
            const task = {
                key: taskKey,
                data:{
                    anger: data.anger,
                    email: data.email,
                    emo_arousal: data.emo_arousal?data.emo_arousal:null,
                    emo_valence: data.emo_valence?data.emo_valence:null,
                    face_emotion: data.face_emotion,
                    HR: data.HR,
                    HRV: data.HRV?data.HRV:null,
                    joy: data.joy,
                    move_step: data.move_step,
                    relax: data.relax,
                    sad: data.sad,
                    sentiment_score: data.sentiment_score,
                    sleep_score: data.sleep_score,
                    sum_emo_q: data.sum_emo_q?data.sum_emo_q:null,
                    tenan: data.tenan,
                    word: data.word,
                    create_date: isDate
                }
            }
            warping = {
                status:200,
                data: "insert success."
            }
            await datastore.save(task)
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
    }
    
}
export default selfReportController