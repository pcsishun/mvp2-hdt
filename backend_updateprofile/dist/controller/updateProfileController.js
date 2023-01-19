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
const bcrypt_1 = __importDefault(require("bcrypt"));
const datastore = new datastore_1.Datastore();
const kindUserProfile = process.env.KIND_USER_PROFILE || "userprofile";
const hashRound = process.env.SALTROUNDS || 13;
const rounds = Number(hashRound);
function updateProfileController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { birthday, dealbreaker, exisiting_silution, family, firstname, gender, hobby, job_level, lastname, mh_goal, peiod, personality_type, sector, stree_level, working_nature, password } = req.body;
        const userProfile = req.authData;
        const email = userProfile.decode.email;
        const tenan = userProfile.decode.tenan;
        if (email && tenan) {
            try {
                const query = datastore.createQuery(kindUserProfile).filter("email", "=", email).limit(1);
                const [taskProfile] = yield datastore.runQuery(query);
                const setDate = new Date();
                const isDate = setDate.getFullYear() + "/" + (setDate.getMonth() + 1) + "/" + setDate.getDate() + " " + (setDate.getHours() + 7) + ":" + setDate.getMinutes() + ":" + setDate.getSeconds();
                const idSet = taskProfile[0][datastore.KEY]['id'];
                const id = parseInt(idSet);
                try {
                    const taskKey = datastore.key([kindUserProfile, id]);
                    if (password === "") {
                        const task = {
                            email: email,
                            tenan: tenan,
                            birthday: birthday,
                            dealbreaker: dealbreaker,
                            exisiting_silution: exisiting_silution,
                            family: family,
                            firstname: firstname,
                            gender: gender,
                            hobby: hobby,
                            job_level: job_level,
                            lastname: lastname,
                            mh_goal: mh_goal,
                            password: taskProfile[0].password,
                            peiod: peiod,
                            personality_type: personality_type,
                            sector: sector,
                            stree_level: stree_level,
                            working_nature: working_nature,
                            create_date: taskProfile[0].create_date,
                            update_date: isDate
                        };
                        const entity = {
                            key: taskKey,
                            data: task,
                        };
                        try {
                            yield datastore.update(entity);
                            const replyData = {
                                status: 200,
                                data: "update success."
                            };
                            res.send(replyData);
                        }
                        catch (err) {
                            const replyData = {
                                status: 500,
                                data: err
                            };
                            res.send(replyData);
                        }
                    }
                    else {
                        const hashPassword = yield bcrypt_1.default.hashSync(password, rounds);
                        const task = {
                            email: email,
                            tenan: tenan,
                            birthday: birthday,
                            dealbreaker: dealbreaker,
                            exisiting_silution: exisiting_silution,
                            family: family,
                            firstname: firstname,
                            gender: gender,
                            hobby: hobby,
                            job_level: job_level,
                            lastname: lastname,
                            mh_goal: mh_goal,
                            password: hashPassword,
                            peiod: peiod,
                            personality_type: personality_type,
                            sector: sector,
                            stree_level: stree_level,
                            working_nature: working_nature,
                            create_date: taskProfile[0].create_date,
                            update_date: isDate
                        };
                        const entity = {
                            key: taskKey,
                            data: task,
                        };
                        // console.log("entity is password => ", entity)
                        try {
                            yield datastore.update(entity);
                            const replyData = {
                                status: 200,
                                data: "update success."
                            };
                            res.send(replyData);
                        }
                        catch (err) {
                            const replyData = {
                                status: 500,
                                data: err
                            };
                            res.send(replyData);
                        }
                    }
                }
                catch (err) {
                    console.log("error create datastore.key ", err);
                    const replyData = {
                        status: 500,
                        data: err
                    };
                    res.send(replyData);
                }
            }
            catch (err) {
                console.log("error create query ", err);
                const replyData = {
                    status: 500,
                    data: err
                };
                res.send(replyData);
            }
        }
        else {
            const replyData = {
                status: 403,
                text: "unauthorized"
            };
            res.send(replyData);
        }
    });
}
exports.default = updateProfileController;
