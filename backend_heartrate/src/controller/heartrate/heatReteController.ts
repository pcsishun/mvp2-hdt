const cv = require("./opencv.js")

const DEFAULT_FPS = 20;
const LOW_BPM = 42; // at backend 
const HIGH_BPM = 240; // at backend 
const SEC_PER_MIN = 60; // at backend 
let arrayBpm:any = []

function rppg(signal:any, targetFps: number, timestamps: any, windowSize: number, rescan: any) {
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
    let setSignal = cv.matFromArray(signal.length, 1, cv.CV_32FC3,
      [].concat.apply([], signal));

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
      let bandMask = cv.matFromArray(setSignal.rows, 1, cv.CV_8U,
        new Array(setSignal.rows).fill(0).fill(1, low, high + 1));
      // Identify feasible frequency with maximum magnitude
      let result = cv.minMaxLoc(setSignal, bandMask);
      bandMask.delete();
      // Infer BPM
      let bpm:number = result.maxLoc.y * fps / setSignal.rows * SEC_PER_MIN;
      bpm = (bpm >= 110) ? 110 : bpm
      if(arrayBpm.length >= 100){
        const uniq:any =  [...new Set(arrayBpm)];
        const setAverageBpm =  uniq.reduce((a:number, b:number) => a + b, 0) / uniq.length;
        const payload = {
          bpm: Math.round(bpm),
          percent: arrayBpm.length,
          averangeBpm:Math.round(setAverageBpm)
        }
        return payload
      }else{
        arrayBpm.push(Math.round(bpm))
        const payload = {
          bpm: Math.round(bpm),
          percent: arrayBpm.length,
          averangeBpm: null
        }
        return payload
      }
      
    }
    setSignal.delete()
  } else {
    console.log("bpm => ", "ขยับหน้าให้พอดีกับกล้องหรือปรับแสงให้มีความสว่างมากขึ้น")
    return "ขยับหน้าให้พอดีกับกล้องหรือปรับแสงให้มีความสว่างมากขึ้น"
  }
}


function getFps(timestamps: any, timeBase = 1000) {
  if (Array.isArray(timestamps) && timestamps.length) {
    if (timestamps.length == 1) {
      return DEFAULT_FPS;
    } else {
      let diff = timestamps[timestamps.length - 1] - timestamps[0];
      return timestamps.length / diff * timeBase;
    }
  } else {
    return DEFAULT_FPS;
  }
}

function selectGreen(signal: any) {
  let rgb = new cv.MatVector();
  cv.split(signal, rgb);
  // TODO possible memory leak, delete rgb?
  let result = rgb.get(1);
  // console.log("get resut green => ",result)
  rgb.delete();
  return result;
}


// function denoise(signal:any, rescan:any) {
//   let diff = new cv.Mat();
//   cv.subtract(signal.rowRange(1, signal.rows), signal.rowRange(0, signal.rows-1), diff);
//   for (var i = 1; i < signal.rows; i++) {
//     if (rescan[i] == true) {
//       let adjV = new cv.MatVector();
//       let adjR = cv.matFromArray(signal.rows, 1, cv.CV_32FC1,
//         new Array(signal.rows).fill(0).fill(diff.data32F[(i-1)*3], i, signal.rows));
//       let adjG = cv.matFromArray(signal.rows, 1, cv.CV_32FC1,
//         new Array(signal.rows).fill(0).fill(diff.data32F[(i-1)*3+1], i, signal.rows));
//       let adjB = cv.matFromArray(signal.rows, 1, cv.CV_32FC1,
//         new Array(signal.rows).fill(0).fill(diff.data32F[(i-1)*3+2], i, signal.rows));
//       adjV.push_back(adjR); adjV.push_back(adjG); adjV.push_back(adjB);
//       let adj = new cv.Mat();
//       cv.merge(adjV, adj);
//       cv.subtract(signal, adj, signal);
//       adjV.delete(); adjR.delete(); adjG.delete(); adjB.delete();
//       adj.delete();
//     }
//   }
//   diff.delete();
// }

// function standardize(signal:any) {
//   let mean = new cv.Mat();
//   let stdDev = new cv.Mat();
//   let t1 = new cv.Mat();
//   cv.meanStdDev(signal, mean, stdDev, t1);
//   let means_c3 = cv.matFromArray(1, 1, cv.CV_32FC3, [mean.data64F[0], mean.data64F[1], mean.data64F[2]]);
//   let stdDev_c3 = cv.matFromArray(1, 1, cv.CV_32FC3, [stdDev.data64F[0], stdDev.data64F[1], stdDev.data64F[2]]);
//   let means = new cv.Mat(signal.rows, 1, cv.CV_32FC3);
//   let stdDevs = new cv.Mat(signal.rows, 1, cv.CV_32FC3);
//   cv.repeat(means_c3, signal.rows, 1, means);
//   cv.repeat(stdDev_c3, signal.rows, 1, stdDevs);
//   cv.subtract(signal, means, signal, t1, -1);
//   cv.divide(signal, stdDevs, signal, 1, -1);
//   mean.delete(); stdDev.delete(); t1.delete();
//   means_c3.delete(); stdDev_c3.delete();
//   means.delete(); stdDevs.delete();
// }


// function detrend(signal:any, lambda:any) {
//   let h = cv.Mat.zeros(signal.rows-2, signal.rows, cv.CV_32FC1);
//   let i = cv.Mat.eye(signal.rows, signal.rows, cv.CV_32FC1);
//   let t1 = cv.Mat.ones(signal.rows-2, 1, cv.CV_32FC1)
//   let t2 = cv.matFromArray(signal.rows-2, 1, cv.CV_32FC1,
//     new Array(signal.rows-2).fill(-2));
//   let t3 = new cv.Mat();
//   t1.copyTo(h.diag(0)); t2.copyTo(h.diag(1)); t1.copyTo(h.diag(2));
//   cv.gemm(h, h, lambda*lambda, t3, 0, h, cv.GEMM_1_T);
//   cv.add(i, h, h, t3, -1);
//   cv.invert(h, h, cv.DECOMP_LU);
//   cv.subtract(i, h, h, t3, -1);
//   let s = new cv.MatVector();
//   cv.split(signal, s);
//   cv.gemm(h, s.get(0), 1, t3, 0, s.get(0), 0);
//   cv.gemm(h, s.get(1), 1, t3, 0, s.get(1), 0);
//   cv.gemm(h, s.get(2), 1, t3, 0, s.get(2), 0);
//   cv.merge(s, signal);
//   h.delete(); i.delete();
//   t1.delete(); t2.delete(); t3.delete();
//   s.delete();
// }

// function movingAverage(signal:any, n:number, kernelSize:any) {
//   for (var i = 0; i < n; i++) {
//     cv.blur(signal, signal, {height: kernelSize, width: 1});
//   }
// }

export {rppg}