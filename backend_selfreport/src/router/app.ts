import express from "express"
import cors from "cors" 
import auth from "../middleware/auth"
import selfReportController from "../controller/selfReportController"
import testController from "../controller/testController"

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/test", testController);
app.post("/api/insertData",auth, selfReportController)

export default app
