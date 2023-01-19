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
const env_mangement_1 = __importDefault(require("../env_mangement"));
// import language from "@google-cloud/language"
// import * as dotenv from 'dotenv'
// dotenv.config({path:"../../.env"})
const envData = (0, env_mangement_1.default)();
const datastore = new datastore_1.Datastore();
const kind = process.env.KIND || "emotion";
function selfReportController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = req.body;
        const decodeData = req.authData;
        let warping;
        if (decodeData.decode.email && decodeData.decode.tenan && decodeData.token) {
            const setDate = new Date();
            const isDate = setDate.getFullYear() + "/" + (setDate.getMonth() + 1) + "/" + setDate.getDate() + " " + (setDate.getHours() + 7) + ":" + setDate.getMinutes() + ":" + setDate.getSeconds();
            // console.log("gen date")
            try {
                const taskKey = datastore.key([kind]);
                const task = {
                    key: taskKey,
                    data: {
                        email: decodeData.decode.email,
                        tenan: decodeData.decode.tenan,
                        arrayOfanswer: data.arrayOfanswer,
                        mainEmotion: data.mainEmotion,
                        weightMainEmotion: data.weightMainEmotion,
                        happyRange: data.happyRange,
                        powRange: data.powRange,
                        relaxRange: data.relaxRange,
                        relievedRange: data.relievedRange,
                        normalRange: data.normalRange,
                        disgustedRange: data.disgustedRange,
                        sadRange: data.sadRange,
                        fearRange: data.fearRange,
                        worryRange: data.worryRange,
                        angerRange: data.angerRange,
                        otherEmotionLabel: data.otherEmotionLabel,
                        otherRangeEmotion: data.otherRangeEmotion,
                        averagBpm: data.averagBpm,
                        create_date: isDate,
                        // isDay:setDate.getDate(),
                        // isMonth: setDate.getMonth() + 1,
                        // isYear: setDate.getFullYear(),
                        // isHours: setDate.getHours() + 7,
                        // isMinute: setDate.getMinutes(),
                        // isSecond: setDate.getSeconds()
                    }
                };
                yield datastore.save(task);
                warping = {
                    status: 200,
                    data: "insert success."
                };
                console.log("saved");
                res.send(warping);
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
                status: 403,
                data: "invalid user."
            };
            res.send(warping);
        }
    });
}
exports.default = selfReportController;
