import express from "express"
import cors from "cors"
import * as dotenv from 'dotenv'
import registerFunction from "../controller/registerController"
import testController from "../controller/testController"

dotenv.config({path:"../../.env"})

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 2287

app.get("/test", testController);
app.post("/api/register",registerFunction);


export default app