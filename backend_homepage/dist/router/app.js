"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("../middleware/auth"));
const testController_1 = __importDefault(require("../controller/testController"));
const homepageController_1 = __importDefault(require("../controller/homepageController"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/test", testController_1.default);
app.get("/api/home", auth_1.default, homepageController_1.default);
exports.default = app;
