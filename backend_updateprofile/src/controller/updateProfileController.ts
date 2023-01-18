import {Datastore} from "@google-cloud/datastore"
import bcrypt from "bcrypt"

const datastore = new Datastore();
const kindUserProfile = process.env.KIND_USER_PROFILE || "userprofile"
const hashRound = process.env.SALTROUNDS || 13
const rounds = Number(hashRound)

async function updateProfileController(req:any, res:any) {
    const {
        birthday,
        dealbreaker,
        exisiting_silution,
        family,
        firstname,
        gender,
        hobby,
        job_level,
        lastname,
        mh_goal,
        peiod,
        personality_type,
        sector,
        stree_level,
        working_nature,
        password
    } = req.body

    const userProfile = req.authData
    const email = userProfile.decode.email
    const tenan = userProfile.decode.tenan
    
    if(email && tenan){
        if(password === ""){
            const transaction = datastore.transaction();
            const taskKey = datastore.key([kindUserProfile,email])
            try{    
                const [task] = await transaction.get(taskKey)
                task.birthday = birthday
                task.dealbreaker = dealbreaker
                task.exisiting_silution = exisiting_silution
                task.family = family
                task.firstname = firstname
                task.gender = gender
                task.hobby = hobby
                task.job_level = job_level
                task.lastname = lastname
                task.mh_goal = mh_goal
                task.peiod = peiod
                task.personality_type = personality_type
                task.sector = sector
                task.stree_level = stree_level
                task.working_nature = working_nature
                transaction.save({
                    key: taskKey,
                    data: task
                })
                await transaction.commit();
                const replyData = {
                    status:200,
                    data: "update success."
                }
                res.send(replyData)
            }catch(err){
                await transaction.rollback();
                const replyData = {
                    status:500,
                    data: err
                }
                res.send(replyData)
            }
        }else{
            const transaction = datastore.transaction();
            const taskKey = datastore.key([kindUserProfile,email])
            try{    
                const [task] = await transaction.get(taskKey)
                task.birthday = birthday
                task.dealbreaker = dealbreaker
                task.exisiting_silution = exisiting_silution
                task.family = family
                task.firstname = firstname
                task.gender = gender
                task.hobby = hobby
                task.job_level = job_level
                task.lastname = lastname
                task.mh_goal = mh_goal
                task.peiod = peiod
                task.personality_type = personality_type
                task.sector = sector
                task.stree_level = stree_level
                task.working_nature = working_nature
                task.password = await bcrypt.hashSync(password, rounds);
                transaction.save({
                    key: taskKey,
                    data: task
                })
                await transaction.commit();
                const replyData = {
                    status:200,
                    data: "update success."
                }
                res.send(replyData)
            }catch(err){
                await transaction.rollback();
                const replyData = {
                    status:500,
                    data: err
                }
                res.send(replyData)
            }
        }
        
    }else{
        const replyData = {
            status: 403,
            text: "unauthorized"
        }
        res.send(replyData)
    }
}

export default updateProfileController