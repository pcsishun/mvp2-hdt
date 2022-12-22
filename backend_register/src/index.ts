import express from "express";
import cors from "cors";
import {Datastore} from "@google-cloud/datastore"
import dotenv from "dotenv"
dotenv.config()

const app = express();
const datastore = new Datastore();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 2287
const kind = process.env.KIND || "userprofile"
const tenanKind = process.env.KIND_TENAN || "profiletenan"

app.get("/test", (req, res) => {
    res.send("OK")
});

app.post("/api/register", async (req, res) => {
    const {
        birthday,
        create_date,
        dealbreaker,
        email,
        exisiting_silution,
        firstname,
        gender,
        hobby,
        job_level,
        lastname,
        mh_goal,
        password,
        peiod,
        personality_type,
        sector,
        stree_level,
        tenan,
        update_date,
        working_nature
    } = req.body   

    let warping

    try{
        const taskKey = datastore.key([kind])
        const taskTenanKey = datastore.key([tenanKind])

        const tenanTask = {
            key: taskTenanKey,
            data:{
                email: email,
                tenan: tenan
            }
        }

        const task = {
            key: taskKey,
            data:{
                birthday: birthday,
                create_date: create_date,
                dealbreaker: dealbreaker,
                email: email,
                exisiting_silution: exisiting_silution,
                firstname: firstname,
                gender: gender,
                hobby: hobby,
                job_level: job_level,
                lastname: lastname,
                mh_goal: mh_goal,
                password: password,
                peiod: peiod,
                personality_type: personality_type,
                sector: sector,
                stree_level: stree_level,
                tenan: tenan,
                update_date: update_date,
                working_nature: working_nature
            }
        }

        
        await datastore.save(task)
        await datastore.save(tenanTask)

        warping = {
            status: 200,
            data: "Create user success"
        }
        res.send(warping)
    }catch(err){
        warping = {
            status: 500,
            data: err
        }
        res.send(warping)
    }
})

app.listen(port, () => {
    console.log(`service data-sci listen on port ${port}`)
})

