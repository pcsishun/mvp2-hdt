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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_mangement_1 = __importDefault(require("../env_mangement"));
const envData = (0, env_mangement_1.default)();
const datastore = new datastore_1.Datastore();
const kindUserProfile = process.env.KIND_USER_PROFILE || "userprofile";
const kindTenan = process.env.KIND_TENAN || "profiletenan";
const tokenSign = process.env.SECRET_TOKEN || "oasdkf_)(*&@!_+#akodkasiodnidj+__)((*@!!osdf492384272340213--3402o4000---5002340291283===--++_)**&^%$$$%";
const Expires = process.env.EXPIRES || "7d";
// console.log(kind, kindTenan, tokenSign, Expires)
function LoginController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        let warping;
        if (email && password) {
            try {
                const createQueryTenan = datastore.createQuery(kindTenan)
                    .filter("email", "=", email)
                    .limit(1);
                const [tenanTask] = yield datastore.runQuery(createQueryTenan);
                // console.log("tenanTask ===> ", tenanTask)
                if (tenanTask[0]) {
                    try {
                        const createQuery = datastore.createQuery(kindUserProfile)
                            .filter("email", "=", email)
                            .limit(1);
                        const [task] = yield datastore.runQuery(createQuery);
                        const hashPassword = task[0].password;
                        const setEmail = task[0].email;
                        const setTenan = task[0].tenan;
                        if (setEmail && (yield bcrypt_1.default.compare(password, hashPassword))) {
                            const setData = {
                                email: setEmail,
                                tenan: setTenan
                            };
                            const genToken = jsonwebtoken_1.default.sign(setData, tokenSign, {
                                expiresIn: Expires,
                            });
                            const payload = {
                                status: 200,
                                token: genToken,
                            };
                            res.send(payload);
                        }
                        else {
                            warping = {
                                status: 403,
                                data: "invalid username or password"
                            };
                            res.send(warping);
                        }
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
                        data: "invalid username or password"
                    };
                    res.send(warping);
                }
            }
            catch (err) {
                warping = {
                    status: 500,
                    data: err
                };
                res.send(err);
            }
        }
        else {
            warping = {
                status: 403,
                data: "invalid user"
            };
            res.send(warping);
        }
    });
}
exports.default = LoginController;
