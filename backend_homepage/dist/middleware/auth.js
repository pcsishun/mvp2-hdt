"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const token = process.env.SECRET_TOKEN;
const verifyToken = (req, res, next) => {
    const getToken = req.headers['access-token'];
    if (getToken === undefined || getToken === null) {
        const payload = {
            error: true,
            text: "unauthorized please login again."
        };
        res.send(payload);
    }
    else {
        try {
            const decode = jsonwebtoken_1.default.verify(getToken, token);
            if (decode.iat >= decode.exp) {
                const payload = {
                    status: 401,
                    text: "session expired."
                };
                res.send(payload);
            }
            else {
                const replyText = {
                    decode: decode,
                    token: getToken
                };
                req.authData = replyText;
                next();
            }
        }
        catch (err) {
            const payload = {
                status: 401,
                text: "session expired."
            };
            res.send(payload);
        }
    }
};
exports.default = verifyToken;
