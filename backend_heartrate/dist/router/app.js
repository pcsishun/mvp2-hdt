"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express = require("express");
const http = require('http');
const cors = require("cors");
const socketIO = require("socket.io");
const { testController } = require("../controller/testController");
const { rppg } = require("../controller/heartrate/heatReteController");
require("dotenv").config();
const app = express();
const server = http.Server(app);
exports.server = server;
app.use(cors());
app.use(express.json());
app.get("/test", testController);
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:8800",
    }
});
io.on('connection', (client) => {
    client.on('client-data', (message) => {
        const bpm = rppg(message.signal, message.targetFps, message.timestamps, message.windowSize, message.rescan);
        console.log("bpm => ", bpm);
        io.emit("server-data", bpm);
    });
});
