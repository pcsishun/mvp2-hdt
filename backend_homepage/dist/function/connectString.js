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
const axios_1 = __importDefault(require("axios"));
function connectString(arrayWord) {
    return __awaiter(this, void 0, void 0, function* () {
        let longText = "";
        for (let i = 0; i < arrayWord.length; i++) {
            longText = longText.concat(" ", arrayWord[i].word);
        }
        try {
            const payload = {
                word: longText
            };
            const base64 = yield axios_1.default.post("--", payload);
            if (base64) {
                return base64;
            }
            else {
                return "word not found";
            }
        }
        catch (err) {
            console.log("connect string function word cloud API error =>", err);
            return "word not found";
        }
    });
}
exports.default = connectString;
