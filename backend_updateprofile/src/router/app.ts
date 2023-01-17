import express from "express";
import cors from "cors";
import testController from "../controller/testController"
import updateProfileController from "../controller/updateProfileController"
import getProfileController from "../controller/getProfileController";
import auth from "../middleware/auth"

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.get("/test",testController)
app.get("/api/getProfile", auth, getProfileController)
app.post("/api/updateProfile",auth,updateProfileController)


export default app 