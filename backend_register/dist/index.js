"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const datastore_1 = require("@google-cloud/datastore");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const datastore = new datastore_1.Datastore();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT || 2287;
const kind = process.env.KIND || "userprofile";
app.get("/test", (req, res) => {
    res.send("OK");
});
app.post("/api/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { birthday, create_date, dealbreaker, email, exisiting_silution, firstname, gender, hobby, job_level, lastname, mh_goal, password, peiod, personality_type, sector, stree_level, tenan, update_date, working_nature } = req.body;
    let warping;
    try {
        const taskKey = datastore.key([kind]);
        const task = {
            key: taskKey,
            data: {
                birthday: birthday,
                create_date: create_date,
                dealbreaker: dealbreaker,
                email: email,
                exisiting_silution: exisiting_silution,
                firstname: firstname,
                gender: gender,
                hobby: hobby,
                job_level: job_level,
                lastname: lastname,
                mh_goal: mh_goal,
                password: password,
                peiod: peiod,
                personality_type: personality_type,
                sector: sector,
                stree_level: stree_level,
                tenan: tenan,
                update_date: update_date,
                working_nature: working_nature
            }
        };
        yield datastore.save(task);
        warping = {
            status: 200,
            data: "Create user success"
        };
        res.send(warping);
    }
    catch (err) {
        warping = {
            status: 500,
            data: err
        };
        res.send(warping);
    }
}));
app.listen(port, () => {
    console.log(`service data-sci listen on port ${port}`);
});
