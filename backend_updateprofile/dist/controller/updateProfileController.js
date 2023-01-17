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
            if (password === "") {
                const transaction = datastore.transaction();
                const taskKey = datastore.key([kindUserProfile, email]);
                try {
                    const [task] = yield transaction.get(taskKey);
                    task.birthday = birthday;
                    task.dealbreaker = dealbreaker;
                    task.exisiting_silution = exisiting_silution;
                    task.family = family;
                    task.firstname = firstname;
                    task.gender = gender;
                    task.hobby = hobby;
                    task.job_level = job_level;
                    task.lastname = lastname;
                    task.mh_goal = mh_goal;
                    task.peiod = peiod;
                    task.personality_type = personality_type;
                    task.sector = sector;
                    task.stree_level = stree_level;
                    task.working_nature = working_nature;
                    transaction.save({
                        key: taskKey,
                        data: task
                    });
                    yield transaction.commit();
                    const replyData = {
                        status: 200,
                        data: "update success."
                    };
                    res.send(replyData);
                }
                catch (err) {
                    yield transaction.rollback();
                    const replyData = {
                        status: 500,
                        data: err
                    };
                    res.send(replyData);
                }
            }
            else {
                const transaction = datastore.transaction();
                const taskKey = datastore.key([kindUserProfile, email]);
                try {
                    const [task] = yield transaction.get(taskKey);
                    task.birthday = birthday;
                    task.dealbreaker = dealbreaker;
                    task.exisiting_silution = exisiting_silution;
                    task.family = family;
                    task.firstname = firstname;
                    task.gender = gender;
                    task.hobby = hobby;
                    task.job_level = job_level;
                    task.lastname = lastname;
                    task.mh_goal = mh_goal;
                    task.peiod = peiod;
                    task.personality_type = personality_type;
                    task.sector = sector;
                    task.stree_level = stree_level;
                    task.working_nature = working_nature;
                    task.password = yield bcrypt_1.default.hashSync(password, rounds);
                    transaction.save({
                        key: taskKey,
                        data: task
                    });
                    yield transaction.commit();
                    const replyData = {
                        status: 200,
                        data: "update success."
                    };
                    res.send(replyData);
                }
                catch (err) {
                    yield transaction.rollback();
                    const replyData = {
                        status: 500,
                        data: err
                    };
                    res.send(replyData);
                }
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
