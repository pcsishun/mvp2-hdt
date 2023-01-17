import {Datastore} from "@google-cloud/datastore"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// import sentEnv from "../env_mangement"
// const envData = sentEnv();

const datastore = new Datastore();
const kindUserProfile:string = process.env.KIND_USER_PROFILE || "userprofile"
const kindTenan:string = process.env.KIND_TENAN || "profiletenan"
const tokenSign:string = process.env.SECRET_TOKEN || "oasdkf_)(*&@!_+#akodkasiodnidj+__)((*@!!osdf492384272340213--3402o4000---5002340291283===--++_)**&^%$$$%"
const Expires:string = process.env.EXPIRES || "7d"
// console.log(kind, kindTenan, tokenSign, Expires)

async function LoginController(req:any, res:any) {
    const {email, password} = req.body
    let warping
    if(email && password){
        try{
            const createQueryTenan = datastore.createQuery(kindTenan)
            .filter("email", "=", email)
            .limit(1)
            const [tenanTask]:any = await datastore.runQuery(createQueryTenan)
            // console.log("tenanTask ===> ", tenanTask)
            if(tenanTask[0]){
                try{
                    const createQuery =  datastore.createQuery(kindUserProfile)
                    .filter("email","=", email)
                    .limit(1)
                    const [task]:any = await datastore.runQuery(createQuery)
                    const hashPassword = task[0].password
                    const setEmail = task[0].email
                    const setTenan = task[0].tenan
                    const name = task[0].firstname;
                    if(setEmail && (await bcrypt.compare(password, hashPassword))){
                        const setData = {
                            email: setEmail,
                            username: name,
                            tenan: setTenan
                        }
                        
                        const genToken = jwt.sign(
                            setData, 
                            tokenSign, 
                            {
                                expiresIn: Expires,
                            }
                        );

                        const payload = {
                            status:200,
                            username:name,
                            token: genToken,
                        }

                        res.send(payload)

                    }else{
                        warping = {
                            status: 403,
                            data: "invalid username or password"
                        }
                        res.send(warping)
                    }   
                }catch(err){
                    warping = {
                        status: 500,
                        data: err
                    }   
                    res.send(warping)
                }
            }else{
                warping = {
                    status: 403,
                    data: "invalid username or password"
                }
                res.send(warping)
            }
        }catch(err){
            warping = {
                status: 500,
                data: err
            }
            res.send(err)
        }
    }else{
        warping = {
            status: 403,
            data: "invalid user"
        }
        res.send(warping)
    }
}

export default LoginController