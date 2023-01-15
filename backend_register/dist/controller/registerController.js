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
const datastore_1 = require("@google-cloud/datastore");
const dotenv = __importStar(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv.config({ path: "../../.env" });
const datastore = new datastore_1.Datastore();
const kind = process.env.KIND || "userprofile";
const tenanKind = process.env.KIND_TENAN || "profiletenan";
const saltRound = process.env.SALTROUNDS || 13;
const rounds = Number(saltRound);
function registerFunction(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { birthday, create_date, dealbreaker, email, hobby, exisiting_silution, firstname, family, gender, job_level, lastname, mh_goal, password, peiod, personality_type, sector, stree_level, tenan, update_date, working_nature } = req.body;
        let warping;
        const hashPassword = yield bcrypt_1.default.hashSync(password, rounds);
        try {
            const taskKey = datastore.key([kind]);
            const taskTenanKey = datastore.key([tenanKind]);
            const tenanTask = {
                key: taskTenanKey,
                data: {
                    email: email,
                    tenan: tenan
                }
            };
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
                    family: family,
                    job_level: job_level,
                    lastname: lastname,
                    mh_goal: mh_goal,
                    password: hashPassword,
                    peiod: peiod,
                    personality_type: personality_type,
                    sector: sector,
                    stree_level: stree_level,
                    tenan: tenan,
                    update_date: update_date,
                    working_nature: working_nature // 18 //
                }
            };
            yield datastore.save(task);
            yield datastore.save(tenanTask);
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
    });
}
exports.default = registerFunction;
