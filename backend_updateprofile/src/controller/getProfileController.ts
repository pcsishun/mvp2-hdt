import {Datastore} from "@google-cloud/datastore"
import dotenv from "dotenv"
dotenv.config({path:"../../.env"})

const datastore = new Datastore();
const kindUserProfile = process.env.KIND_USER_PROFILE || "userprofile"

async function getProfileController(req:any, res:any) {
    const userProfile = req.authData
    const email = userProfile.decode.email
    const tenan = userProfile.decode.tenan
    if(email && tenan){
            
        const query = datastore.createQuery(kindUserProfile)
        .select([
                "birthday", // 
                "dealbreaker",
                "exisiting_silution",
                "family",
                "firstname", // 
                "gender", // 
                "hobby",
                "job_level",
                "lastname", // 
                "mh_goal",
                "peiod",
                "personality_type",
                "sector",
                "stree_level",
                "working_nature"
            ])
            .filter("email","=", email)
            .limit(1)

            try{
                const [taskProfile]:any = await datastore.runQuery(query)
                const replyData = {
                    status:200,
                    data: taskProfile
                }
                res.send(replyData)
            }catch(err){
                const replyData = {
                    status: 500,
                    data: err
                }
                res.send(replyData)
            }
    }else{
        const replyData = {
            status: 403,
            text: "unauthorized"
        }
        res.send(replyData)
    }
}

export default getProfileController