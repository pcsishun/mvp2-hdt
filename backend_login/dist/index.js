"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const datastore_1 = require("@google-cloud/datastore");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const datastore = new datastore_1.Datastore();
// app.enable('trust proxy');
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT || 2298;
const kind = process.env.KIND;
// console.log(port)
app.get("/test", (req, res) => {
    res.send("OK");
});
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    let warping;
    if (email && password) {
        try {
            const createQuery = datastore.createQuery(kind)
                .filter("email", "=", email)
                .limit(1);
            const [task] = datastore.runQuery(createQuery);
            res.send(task);
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
app.listen(port, () => {
    console.log(`service data-sci listen on port ${port}`);
});
