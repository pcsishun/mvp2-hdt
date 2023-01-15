// server // 
import express from "express"
import cors from "cors"
import dotenv from 'dotenv'

// controller // 
import LoginController from "../controller/loginController"
import testController from "../controller/testController"

// env //
dotenv.config({path:"../../.env"});

// router setup //
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());



// router // 
app.get("/test",testController)
app.post("/api/login",LoginController)

export default app

// server listen //
