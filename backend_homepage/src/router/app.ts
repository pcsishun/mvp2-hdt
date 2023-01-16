import express from "express";
import cors from "cors";
import auth from '../middleware/auth'
import testController from "../controller/testController"
import homepageController from "../controller/homepageController"

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/test", testController);
app.get("/api/home", auth, homepageController)

export default app