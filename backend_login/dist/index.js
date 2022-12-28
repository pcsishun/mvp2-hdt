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
// import * as dotenv from 'dotenv'
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../.env" });
const app = (0, express_1.default)();
const datastore = new datastore_1.Datastore();
// app.enable('trust proxy');
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT || 2298;
const kind = process.env.KIND || "userprofile";
const kindTenan = process.env.KIND_TENAN || "profiletenan";
const tokenSign = process.env.SECRET_TOKEN || "--";
const Expires = process.env.EXPIRES || "1 day";
app.get("/test", (req, res) => {
    res.send("OK");
});
app.post("/api/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let warping;
    if (email && password) {
        try {
            const createQueryTenan = datastore.createQuery(kindTenan)
                .filter("email", "=", email)
                .limit(1);
            const [tenanTask] = yield datastore.runQuery(createQueryTenan);
            console.log("tenanTask ===> ", tenanTask);
            if (tenanTask) {
                try {
                    const createQuery = datastore.createQuery(kind)
                        .filter("email", "=", email)
                        .limit(1);
                    const [task] = yield datastore.runQuery(createQuery);
                    console.log("task ===> ", task);
                    const hashPassword = task[0].password;
                    const setEmail = task[0].email;
                    const setTenan = task[0].tenan;
                    console.log("hashPassword ===> ", hashPassword);
                    console.log("setEmail ===> ", setEmail);
                    console.log("setTenan ===> ", setTenan);
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
}));
app.listen(port, () => {
    console.log("tokenSign ==> ", tokenSign);
    console.log(`service data-sci listen on port ${port}`);
});
