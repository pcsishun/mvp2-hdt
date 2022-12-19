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

const port = process.env.PORT || 3322


app.get("/test", (req, res) => {
    res.send("OK")
});


app.listen(port, () => {
    console.log(`service dashboard listen on port ${port}`)
})

