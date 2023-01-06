import express from "express";
import cors from "cors";
import {Datastore} from "@google-cloud/datastore"
import dotenv from "dotenv"
import auth from './middleware/auth'
import connectString from "./function/connectString";
dotenv.config()

const app = express();
const datastore = new Datastore();

// app.enable('trust proxy');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3300
const kind_emo = process.env.KIND_EMO
// const kind_userprofile = process.env.KIND_USERPROFILE
const kind_tenan = process.env.KIND_TENANPROFILE
console.log(port)


app.get("/test", (req, res) => {
    res.send("OK")
});

app.post("/api/home", auth,async (req, res) => {
    const {email, tenan} = req.body

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
                try{
                    const createEmotion = datastore.createQuery(kind_emo)
                    .filter("email", "=", email)
                    .filter("tenan", "=", taskTenan.tenan)
                    .filter("create_date", ">=", isDate)
                    .filter("create_date", "<=", before_Date)

                    const [taskData]:any  = await datastore.runQuery(createEmotion)
                    const imgBase64 =  connectString(taskData)
                    const replayData = {
                        wordCloud: imgBase64,
                        data:taskData
                    }
                    res.send(replayData)
                }catch(err){
                    warping = {
                        status: 500,
                        data: err
                    }
                    res.send(warping)
                }
            }else{
                warping = {
                    status: 401,
                    data: "invalid email."
                }
                res.send(warping)
            }
        }catch(err){
            warping = {
                status: 500,
                data: err
            }
        }
    }else{  
        warping = {
            status: 200,
            data: "missing email or tenan"
        }
        res.send(warping)
    }
})

app.listen(port, () => {
    console.log(`service data-sci listen on port ${port}`)
})

