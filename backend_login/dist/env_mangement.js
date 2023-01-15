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
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: "../.env" });
function sentEnv() {
    const payload = {
        PORT: process.env.PORT || 2298,
        SECRET_TOKEN: process.env.SECRET_TOKEN || "oasdkf_)(*&@!_+#akodkasiodnidj+__)((*@!!osdf492384272340213--3402o4000---5002340291283===--++_)**&^%$$$%",
        KIND_USER_PROFILE: process.env.KIND || "userprofile",
        KIND_TENAN: process.env.KIND_TENAN || "",
        EXPIRES: process.env.EXPIRES || "7dprofiletenan"
    };
    return payload;
}
exports.default = sentEnv;
