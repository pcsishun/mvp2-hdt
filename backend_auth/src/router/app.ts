import express from "express";
import cors from "cors";
import auth from '../middleware/auth'
import testController from "../controller/testController"
import replyController from "../controller/replyController"

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/test", testController);
app.get("/api/auth", auth, replyController)

export default app