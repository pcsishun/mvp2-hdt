import {Datastore} from "@google-cloud/datastore"
import * as dotenv from 'dotenv'
import bcrypt from "bcrypt"
dotenv.config({path:"../../.env"})

const datastore = new Datastore();
const kind = process.env.KIND || "userprofile"
const tenanKind = process.env.KIND_TENAN || "profiletenan"
const saltRound = process.env.SALTROUNDS || 13
const rounds = Number(saltRound)

async function registerFunction(req:any, res:any) {
    const {
        birthday,
        create_date,
        dealbreaker,
        email,
        hobby,
        exisiting_silution,
        firstname,
        family,
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
                birthday: birthday,
                create_date: create_date,
                dealbreaker: dealbreaker,
                email: email,
                exisiting_silution: exisiting_silution,
                firstname: firstname, 
                gender: gender,
                hobby: hobby,
                family: family, 
                job_level: job_level,
                lastname: lastname,
                mh_goal: mh_goal,
                password: hashPassword,
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
}

export default registerFunction