"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./router/app"));
const env_mangement_1 = __importDefault(require("./env_mangement"));
const envData = (0, env_mangement_1.default)();
const port = envData.PORT;
app_1.default.listen(port, () => {
    console.log(`service data-sci listen on port ${port}`);
});
