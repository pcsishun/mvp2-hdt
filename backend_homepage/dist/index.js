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
const auth_1 = __importDefault(require("./middleware/auth"));
const connectString_1 = __importDefault(require("./function/connectString"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const datastore = new datastore_1.Datastore();
// app.enable('trust proxy');
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT || 3300;
const kind_emo = process.env.KIND_EMO;
// const kind_userprofile = process.env.KIND_USERPROFILE
const kind_tenan = process.env.KIND_TENANPROFILE;
console.log(port);
app.get("/test", (req, res) => {
    res.send("OK");
});
app.post("/api/home", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, tenan } = req.body;
    let warping;
    if (email && tenan) {
        try {
            const setDate = new Date();
            const isDate = setDate.getFullYear() + "/" + (setDate.getMonth() + 1) + "/" + setDate.getDate() + " " + (setDate.getHours() + 7) + ":" + setDate.getMinutes() + ":" + setDate.getSeconds();
            const before_Date = setDate.getFullYear() + "/" + (setDate.getMonth() + 1) + "/" + (setDate.getDate() - 5) + " " + (setDate.getHours() + 7) + ":" + setDate.getMinutes() + ":" + setDate.getSeconds();
            const createTenanQuery = datastore.createQuery(kind_tenan)
                .filter("email", "=", email)
                .limit(1);
            const [taskTenan] = yield datastore.runQuery(createTenanQuery);
            if (taskTenan[0]) {
                try {
                    const createEmotion = datastore.createQuery(kind_emo)
                        .filter("email", "=", email)
                        .filter("tenan", "=", taskTenan.tenan)
                        .filter("create_date", ">=", isDate)
                        .filter("create_date", "<=", before_Date);
                    const [taskData] = yield datastore.runQuery(createEmotion);
                    const imgBase64 = (0, connectString_1.default)(taskData);
                    const replayData = {
                        wordCloud: imgBase64
                    };
                    res.send(taskData);
                }
                catch (err) {
                    warping = {
                        status: 500,
                        data: err
                    };
                    res.send(warping);
                }
            }
            else {
                warping = {
                    status: 401,
                    data: "invalid email."
                };
                res.send(warping);
            }
        }
        catch (err) {
            warping = {
                status: 500,
                data: err
            };
        }
    }
    else {
        warping = {
            status: 200,
            data: "missing email or tenan"
        };
        res.send(warping);
    }
}));
app.listen(port, () => {
    console.log(`service data-sci listen on port ${port}`);
});
