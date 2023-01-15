"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const loginController_1 = __importDefault(require("../controller/loginController"));
const testController_1 = __importDefault(require("../controller/testController"));
dotenv_1.default.config({ path: "../../.env" });
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT || 2298;
app.get("/test", testController_1.default);
app.post("/api/login", loginController_1.default);
app.listen(port, () => {
    console.log(`service data-sci listen on port ${port}`);
});
