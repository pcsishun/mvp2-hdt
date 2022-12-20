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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const datastore_1 = require("@google-cloud/datastore");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
const datastore = new datastore_1.Datastore();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT || 3396;
const kind = process.env.KIND || "emotion";
// const namespace = process.env.NAMESPACE || "emotion"
app.get("/test", (req, res) => {
    res.send("OK");
});
app.post("/api/insertData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, email, tenan, data } = req.body;
    let warping;
    if (token && email && tenan) {
        try {
            const taskKey = datastore.key([kind]);
            const task = {
                key: taskKey,
                data: {
                    anger: data.anger,
                    email: data.email,
                    emo_arousal: data.emo_arousal ? data.emo_arousal : null,
                    emo_valence: data.emo_valence ? data.emo_valence : null,
                    face_emotion: data.face_emotion,
                    HR: data.HR,
                    HRV: data.HRV ? data.HRV : null,
                    joy: data.joy,
                    move_step: data.move_step,
                    relax: data.relax,
                    sad: data.sad,
                    sentiment_score: data.sentiment_score,
                    sleep_score: data.sleep_score,
                    sum_emo_q: data.sum_emo_q ? data.sum_emo_q : null,
                    tenan: data.tenan,
                    word: data.word
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
}));
app.listen(port, () => {
    console.log(`service data-sci listen on port ${port}`);
});
