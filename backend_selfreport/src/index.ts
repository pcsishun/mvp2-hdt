import express from "express";
import cors from "cors";
import {Datastore} from "@google-cloud/datastore"
import * as dotenv from 'dotenv'
dotenv.config()

const app = express();
const datastore = new Datastore();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3396
const kind = process.env.KIND || "emotion"
// const namespace = process.env.NAMESPACE || "emotion"

app.get("/test", (req, res) => {
    res.send("OK")
});

app.post("/api/insertData", async (req, res) => {
    const {token, email, tenan, data} = req.body;
    let warping;
    if(token && email && tenan){
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
                    word: data.word
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
    
})


app.listen(port, () => {
    console.log(`service data-sci listen on port ${port}`)
})

