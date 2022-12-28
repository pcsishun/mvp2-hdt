import express from "express"
import cors from "cors"
import {Datastore} from "@google-cloud/datastore"
// import * as dotenv from 'dotenv'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config({path:"../.env"});


const app = express();
const datastore = new Datastore();

// app.enable('trust proxy');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 2298
const kind = process.env.KIND || "userprofile"
const kindTenan = process.env.KIND_TENAN || "profiletenan"
const tokenSign = process.env.SECRET_TOKEN || "--"
const Expires = process.env.EXPIRES || "1 day"

app.get("/test", (req, res) => {
    res.send("OK")
});

app.post("/api/login", async (req, res) => {
    const {email, password} = req.body
    let warping
    if(email && password){
        try{
            const createQueryTenan = datastore.createQuery(kindTenan)
            .filter("email", "=", email)
            .limit(1)
            const [tenanTask]:any = await datastore.runQuery(createQueryTenan)
            console.log("tenanTask ===> ", tenanTask)
            if(tenanTask){
                try{
                    const createQuery =  datastore.createQuery(kind)
                    .filter("email","=", email)
                    .limit(1)
                    
                    const [task]:any = await datastore.runQuery(createQuery)
                    console.log("task ===> ",task)
                    const hashPassword = task[0].password
                    const setEmail = task[0].email
                    const setTenan = task[0].tenan

                    console.log("hashPassword ===> ",hashPassword)
                    console.log("setEmail ===> ",setEmail)
                    console.log("setTenan ===> ",setTenan)

                    if(setEmail && (await bcrypt.compare(password, hashPassword))){
                        const setData = {
                            email: setEmail,
                            tenan: setTenan
                        }
                        const genToken = jwt.sign(setData, tokenSign, {
                            expiresIn: Expires,
                        });
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
})


app.listen(port, () => {
    console.log("tokenSign ==> ", tokenSign)
    console.log(`service data-sci listen on port ${port}`)
})

