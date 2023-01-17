"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const testController_1 = __importDefault(require("../controller/testController"));
const updateProfileController_1 = __importDefault(require("../controller/updateProfileController"));
const getProfileController_1 = __importDefault(require("../controller/getProfileController"));
const auth_1 = __importDefault(require("../middleware/auth"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/test", testController_1.default);
app.get("/api/getProfile", auth_1.default, getProfileController_1.default);
app.post("/api/updateProfile", auth_1.default, updateProfileController_1.default);
exports.default = app;
