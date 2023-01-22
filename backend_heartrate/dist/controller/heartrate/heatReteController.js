"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rppg = void 0;
const cv = require("./opencv.js");
const DEFAULT_FPS = 20;
const LOW_BPM = 42; // at backend 
const HIGH_BPM = 240; // at backend 
const SEC_PER_MIN = 60; // at backend 
let arrayBpm = [];
function rppg(signal, targetFps, timestamps, windowSize, rescan) {
    // Update fps
    let fps = getFps(timestamps);
    // console.log("signal.length",signal.length)
    // console.log("fps => ", fps)
    // console.log("targetFps => ", targetFps)
    // console.log("windowSize => ", windowSize)
    // console.log("targetFps * windowSize => ", targetFps * windowSize)
    // If valid signal is large enough: estimate
    if (signal.length >= targetFps * windowSize) {
        // Work with cv.Mat from here,
        let setSignal = cv.matFromArray(signal.length, 1, cv.CV_32FC3, [].concat.apply([], signal));
        // Filtering
        // denoise(setSignal, rescan);
        // standardize(setSignal);
        // detrend(setSignal, fps);
        // movingAverage(setSignal, 3, Math.max(Math.floor(fps / 6), 2));
        // HR estimation
        setSignal = selectGreen(setSignal);
        // Draw time domain signal
        // this.overlayMask.setTo([0, 0, 0, 0]);
        // Calculate band spectrum limits
        let low = Math.floor(setSignal.rows * LOW_BPM / SEC_PER_MIN / fps);
        let high = Math.ceil(setSignal.rows * HIGH_BPM / SEC_PER_MIN / fps);
        if (!setSignal.empty()) {
            // Mask for infeasible frequencies
            let bandMask = cv.matFromArray(setSignal.rows, 1, cv.CV_8U, new Array(setSignal.rows).fill(0).fill(1, low, high + 1));
            // Identify feasible frequency with maximum magnitude
            let result = cv.minMaxLoc(setSignal, bandMask);
            bandMask.delete();
            // Infer BPM
            let bpm = result.maxLoc.y * fps / setSignal.rows * SEC_PER_MIN;
            bpm = (bpm >= 110) ? 110 : bpm;
            if (arrayBpm.length >= 100) {
                const uniq = [...new Set(arrayBpm)];
                const setAverageBpm = uniq.reduce((a, b) => a + b, 0) / uniq.length;
                const payload = {
                    bpm: Math.round(bpm),
                    percent: arrayBpm.length,
                    averangeBpm: Math.round(setAverageBpm)
                };
                return payload;
            }
            else {
                arrayBpm.push(Math.round(bpm));
                const payload = {
                    bpm: Math.round(bpm),
                    percent: arrayBpm.length,
                    averangeBpm: null
                };
                return payload;
            }
        }
        setSignal.delete();
    }
    else {
        console.log("bpm => ", "ขยับหน้าให้พอดีกับกล้องหรือปรับแสงให้มีความสว่างมากขึ้น");
        return "ขยับหน้าให้พอดีกับกล้องหรือปรับแสงให้มีความสว่างมากขึ้น";
    }
}
exports.rppg = rppg;
function getFps(timestamps, timeBase = 1000) {
    if (Array.isArray(timestamps) && timestamps.length) {
        if (timestamps.length == 1) {
            return DEFAULT_FPS;
        }
        else {
            let diff = timestamps[timestamps.length - 1] - timestamps[0];
            return timestamps.length / diff * timeBase;
        }
    }
    else {
        return DEFAULT_FPS;
    }
}
function selectGreen(signal) {
    let rgb = new cv.MatVector();
    cv.split(signal, rgb);
    // TODO possible memory leak, delete rgb?
    let result = rgb.get(1);
    // console.log("get resut green => ",result)
    rgb.delete();
    return result;
}
