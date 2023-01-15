import {Datastore} from "@google-cloud/datastore"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config({path:"../../.env"});

const datastore = new Datastore();
const kind = process.env.KIND || "userprofile"
const kindTenan = process.env.KIND_TENAN || "profiletenan"
const tokenSign = process.env.SECRET_TOKEN || "--"
const Expires = process.env.EXPIRES || "30 days"


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
                    const createQuery =  datastore.createQuery(kind)
                    .filter("email","=", email)
                    .limit(1)
                    const [task]:any = await datastore.runQuery(createQuery)
                    const hashPassword = task[0].password
                    const setEmail = task[0].email
                    const setTenan = task[0].tenan

                    if(setEmail && (await bcrypt.compare(password, hashPassword))){
                        const setData = {
                            email: setEmail,
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