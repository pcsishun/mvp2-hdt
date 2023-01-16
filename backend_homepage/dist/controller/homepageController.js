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
const datastore_1 = require("@google-cloud/datastore");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../../.env" });
const datastore = new datastore_1.Datastore();
const kind_tenan = process.env.KIND_TENANPROFILE || "profiletenan";
const kind_emo = process.env.KIND_EMO || "emotion";
function homepageController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userProfile = req.authData;
        const email = userProfile.decode.email;
        const tenan = userProfile.decode.tenan;
        console.log("my email=> ", email, "my tenan =>", tenan);
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
                console.log("test task tenan => ", taskTenan);
                if (taskTenan[0]) {
                    try {
                        console.log("kind_emo=> ", kind_emo);
                        const createEmotion = datastore.createQuery(kind_emo)
                            .filter("email", "=", email)
                            .filter("tenan", "=", tenan)
                            .filter("create_date", "<=", isDate)
                            .filter("create_date", ">=", before_Date);
                        const [taskData] = yield datastore.runQuery(createEmotion);
                        console.log("taskData => ", taskData);
                        // const imgBase64 =  wordCloudService(taskData)
                        // const replayData = {
                        //     wordCloud: imgBase64,
                        //     data:taskData
                        // }
                        const replayData = {
                            wordCloud: "test",
                            data: taskData
                        };
                        res.send(replayData);
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
    });
}
exports.default = homepageController;
