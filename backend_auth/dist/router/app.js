"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("../middleware/auth"));
const testController_1 = __importDefault(require("../controller/testController"));
const replyController_1 = __importDefault(require("../controller/replyController"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/test", testController_1.default);
app.get("/api/auth", auth_1.default, replyController_1.default);
exports.default = app;
