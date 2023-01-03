import express from "express"
import cors from "cors"
import {Datastore} from "@google-cloud/datastore"
import * as dotenv from 'dotenv'
import bcrypt from "bcrypt"
dotenv.config({path:"../.env"})

const app = express();
const datastore = new Datastore();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 2287
const kind = process.env.KIND || "userprofile"
const tenanKind = process.env.KIND_TENAN || "profiletenan"
const saltRound = process.env.SALTROUNDS || 13
const rounds = Number(saltRound)

app.get("/test", (req, res) => {
    res.send("OK")
});

app.post("/api/register", async (req, res) => {
    const {
        birthday,
        create_date,
        dealbreaker,
        email,
        hobby,
        exisiting_silution,
        firstname,
        gender,
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
    const hashPassword = await bcrypt.hashSync(password, rounds);

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
                birthday: birthday, // 1 // 
                create_date: create_date, // 2 //
                dealbreaker: dealbreaker, // 3 //
                email: email, // 4
                exisiting_silution: exisiting_silution, // 5 //
                firstname: firstname, // 6 //
                gender: gender, // 7 //
                hobby: hobby,
                job_level: job_level, // 8 //
                lastname: lastname, // 9 //
                mh_goal: mh_goal, // 10 //
                password: hashPassword, // 11 //
                peiod: peiod, // 12 //
                personality_type: personality_type, // 13 //
                sector: sector, // 14 //
                stree_level: stree_level, // 15 //
                tenan: tenan, // 16 //
                update_date: update_date, // 17 //
                working_nature: working_nature // 18 //
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
    // console.log("rounds ==> ",rounds);
    // console.log("rounds type ===> ",typeof rounds);
    console.log(`service data-sci listen on port ${port}`)
})

