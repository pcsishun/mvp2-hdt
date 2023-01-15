"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const datastore_1 = require("@google-cloud/datastore");
// import language from "@google-cloud/language"
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: "../../.env" });
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
                        create_date: isDate
                    }
                };
                warping = {
                    status: 200,
                    data: "insert success."
                };
                yield datastore.save(task);
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
        }
    });
}
exports.default = selfReportController;
