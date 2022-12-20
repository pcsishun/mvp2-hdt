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
const kind = process.env.KIND
// console.log(port)


app.get("/test", (req, res) => {
    res.send("OK")
});

app.post("/login",(req, res) => {
    const {email, password} = req.body
    let warping
    if(email && password){
        try{
            const createQuery = datastore.createQuery(kind)
            .filter("email","=", email)
            .limit(1)

            const [task]:any = datastore.runQuery(createQuery)
            
            res.send(task)
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

