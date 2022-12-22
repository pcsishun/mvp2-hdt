import express from "express";
import cors from "cors";
import {Datastore} from "@google-cloud/datastore"
import dotenv from "dotenv"
dotenv.config()

const app = express();
const datastore = new Datastore();

// app.enable('trust proxy');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 2298
const kind = process.env.KIND || "userprofile"
const kindTenan = process.env.KIND_TENAN || "profiletenan"


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
            if(tenanTask){
                try{
                    const createQuery =  datastore.createQuery(kind)
                    .filter("email","=", email)
                    .limit(1)
                    const [task]:any = await datastore.runQuery(createQuery)
                    res.send(task)
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
    console.log(`service data-sci listen on port ${port}`)
})

