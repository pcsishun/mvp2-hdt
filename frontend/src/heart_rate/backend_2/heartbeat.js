import store from "../store"
// import socketIOClient from 'socket.io-client'

// const END_POINT = "http://localhost:3459" 
// const socket = socketIOClient(END_POINT); 

const RESCAN_INTERVAL = 1000;
const MSEC_PER_SEC = 1000;
const DEFAULT_FPS = 20;
const LOW_BPM = 42; // at backend 
const HIGH_BPM = 240; // at backend 
const SEC_PER_MIN = 60; // at backend 

// Simple rPPG implementation in JavaScript
// - Code could be improved given better documentation available for opencv.js
export class Heartbeat {
  constructor(webcamId, canvasId, classifierPath, targetFps, windowSize, rppgInterval) {
    this.webcamId = webcamId;
    this.canvasId = canvasId;
    this.classifierPath = classifierPath;
    this.streaming = false;
    this.faceValid = false;
    this.targetFps = targetFps;
    this.windowSize = windowSize;
    this.rppgInterval = rppgInterval;
  }
  // Start the video stream
  async startStreaming() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: {exact: this.webcamVideoElement.width},
          height: {exact: this.webcamVideoElement.height}
        },
        audio: false
      });
    } catch (e) {
      // console.log(e);
    }
    if (!this.stream) {
      throw new Error('Could not obtain video from webcam.');
    }
    // Set srcObject to the obtained stream
    this.webcamVideoElement.srcObject = this.stream;
    // Start the webcam video stream
    this.webcamVideoElement.play();
    this.streaming = true;
    return new Promise(resolve => {
      // Add event listener to make sure the webcam has been fully initialized.
      this.webcamVideoElement.oncanplay = () => {
        resolve();
      };
    });
  }
  // Create file from url
  async createFileFromUrl(path, url) {
    let request = new XMLHttpRequest();
    
    let Url = "https://backend-hdt-haaracscade-zt27agut7a-as.a.run.app/api/haaracscade"
    request.open('GET', Url, true)
    request.responseType = 'arraybuffer';
    console.log("request ==> ", request)
    request.send();
    return new Promise(resolve => {
      request.onload = () => {
        if (request.readyState === 4) {
          if (request.status === 200) {
            let data = new Uint8Array(request.response);
            cv.FS_createDataFile('/', path, data, true, false, false);
            resolve();
          } else {
            // console.log('Failed to load ' + Url + ' status: ' + request.status);
          }
        }
      };
    });
  }
  // Initialise the demo 
  async init() {
    this.webcamVideoElement = document.getElementById("webcam")
    // ทำการแตกไฟล์
    try {
      // console.log("webcamVideoElement")
      await this.startStreaming();
      this.webcamVideoElement.width = this.webcamVideoElement.videoWidth;
      this.webcamVideoElement.height = this.webcamVideoElement.videoHeight;
      this.frameRGB = new cv.Mat(this.webcamVideoElement.height, this.webcamVideoElement.width, cv.CV_8UC4);
      this.lastFrameGray = new cv.Mat(this.webcamVideoElement.height, this.webcamVideoElement.width, cv.CV_8UC1);
      this.frameGray = new cv.Mat(this.webcamVideoElement.height, this.webcamVideoElement.width, cv.CV_8UC1);
      this.cap = new cv.VideoCapture(this.webcamVideoElement);
      // Set variables 
      this.signal = []; // 120 x 3 raw rgb values
      this.timestamps = []; // 120 x 1 timestamps
      this.rescan = []; // 120 x 1 rescan bool
      this.face = new cv.Rect();  // Position of the face
      // Load face detector 
      this.classifier = new cv.CascadeClassifier();
      let faceCascadeFile = "haarcascade_frontalface_alt.xml";
      if (!this.classifier.load(faceCascadeFile)) {
        await this.createFileFromUrl(faceCascadeFile, this.classifierPath);
        this.classifier.load(faceCascadeFile)
      }

      // console.log("this.processFrame.bind =>", this.processFrame.bind)
      this.scanTimer = setInterval(this.processFrame.bind(this),
        MSEC_PER_SEC/this.targetFps);
      // wss here // 
      // setInterval(() => {

      //   const warpPayload = {
      //     signal: this.signal,
      //     targetFps: this.targetFps,
      //     timestamps: this.timestamps,
      //     windowSize: this.windowSize,
      //     rescan: this.rescan,
      //   }

      //   socket.emit('client-data', warpPayload)
      // }, this.rppgInterval);
      // // console.log("rppgInterval ==> ",this.rppgInterval)
      // console.log("this.rppg.bind(this) =>", this.rppg.bind(this))
      this.rppgTimer = setInterval(this.rppg.bind(this), this.rppgInterval);
    } catch (e) {
      console.log(e);
    }
  }

  // Add one frame to raw signal
  processFrame() {
    try {
      if (!this.frameGray.empty()) {
        this.frameGray.copyTo(this.lastFrameGray); // Save last frame
      }
      this.cap.read(this.frameRGB); // Save current frame
      let time = Date.now()
      let rescanFlag = false;
      cv.cvtColor(this.frameRGB, this.frameGray, cv.COLOR_RGBA2GRAY);
      // Need to find the face
      if (!this.faceValid) {
        this.lastScanTime = time;
        this.detectFace(this.frameGray);
      }
      // Scheduled face rescan
      else if (time - this.lastScanTime >= RESCAN_INTERVAL) {
        this.lastScanTime = time
        this.detectFace(this.frameGray);
        rescanFlag = true;
      }
      // Update the signal
      if (this.faceValid) {
        // Shift signal buffer
        while (this.signal.length > this.targetFps * this.windowSize) {
          this.signal.shift();
          this.timestamps.shift();
          this.rescan.shift();
        }
        // Get mask
        let mask = new cv.Mat();
        mask = this.makeMask(this.frameGray, this.face);
        let means = cv.mean(this.frameRGB, mask);
        mask.delete();
        // Add new values to raw signal buffer
        this.signal.push(means.slice(0, 3));
        this.timestamps.push(time);
        this.rescan.push(rescanFlag);
      }
      // Draw face
      cv.rectangle(this.frameRGB, new cv.Point(this.face.x, this.face.y),
        new cv.Point(this.face.x+this.face.width, this.face.y+this.face.height),
        [0, 255, 0, 255]);
      // Apply overlayMask
      // this.frameRGB.setTo([255, 0, 0, 255], this.overlayMask);
      cv.imshow(this.canvasId, this.frameRGB);
    } catch (e) {
      console.log("Error capturing frame:");
      console.log(e);
    }
  }

  // Run face classifier
  detectFace(gray) {
    let faces = new cv.RectVector();
    this.classifier.detectMultiScale(gray, faces, 1.1, 3, 0);
    if (faces.size() > 0) {
      this.face = faces.get(0);
      this.faceValid = true;
    } else {
      // console.log("No faces");
      document.getElementById("set-signal").innerHTML = "ไม่พบใบหน้า";
      // this.invalidateFace();
      // return "No faces"
    }
    faces.delete();
  }
  // Make ROI mask from face
  makeMask(frameGray, face) {
    let result = cv.Mat.zeros(frameGray.rows, frameGray.cols, cv.CV_8UC1);
    let white = new cv.Scalar(255, 255, 255, 255);
    let pt1 = new cv.Point(Math.round(face.x + 0.3 * face.width),
      Math.round(face.y + 0.1 * face.height));
    let pt2 = new cv.Point(Math.round(face.x + 0.7 * face.width),
      Math.round(face.y + 0.25 * face.height));
    cv.rectangle(result, pt1, pt2, white, -1);
    return result;
  }

  // wss backend //
 // Compute rppg signal and estimate HR
  rppg() {
    // Update fps
    let fps = this.getFps(this.timestamps);
    // If valid signal is large enough: estimate
    if (this.signal.length >= this.targetFps * this.windowSize) {
      // Work with cv.Mat from here
      let signal = cv.matFromArray(this.signal.length, 1, cv.CV_32FC3,
        [].concat.apply([], this.signal));
      
        // Filtering
      // this.denoise(signal, this.rescan);
      // this.standardize(signal);
      // this.detrend(signal, fps);
      // this.movingAverage(signal, 3, Math.max(Math.floor(fps/6), 2));

      // HR estimation
      signal = this.selectGreen(signal);
      // Draw time domain signal

      // Calculate band spectrum limits
      let low = Math.floor(signal.rows * LOW_BPM / SEC_PER_MIN / fps);
      let high = Math.ceil(signal.rows * HIGH_BPM / SEC_PER_MIN / fps);
      if (!signal.empty()) {
        // Mask for infeasible frequencies
        let bandMask = cv.matFromArray(signal.rows, 1, cv.CV_8U,
          new Array(signal.rows).fill(0).fill(1, low, high+1));
        let result = cv.minMaxLoc(signal, bandMask);
        bandMask.delete();
        // Infer BPM
        let bpm = result.maxLoc.y * fps / signal.rows * SEC_PER_MIN;
        bpm = (bpm >= 110)? 110: bpm
        // console.log("bpm => ", bpm)
        if(store.state.myRatebpm.length === 100){
          const  uniq = [...new Set(store.state.myRatebpm)];
          const setAverageBpm =  uniq.reduce((a, b) => a + b, 0) / uniq.length;
 
          document.getElementById("mean-bpm").innerHTML = "ประมาณการ bpm: "+parseInt(setAverageBpm)
          store.state.averageBpm = parseInt(setAverageBpm)
        }else if(store.state.myRatebpm.length < 100){
          store.state.myRatebpm.push(parseInt(bpm))
          document.getElementById("percent-finish").innerHTML = store.state.myRatebpm.length +"%"
        }
        document.getElementById("set-signal").innerHTML = "Bpm: "+Math.round(bpm);

      }
      signal.delete();
    } else { 
      document.getElementById("set-signal").innerHTML = "ขยับหน้าให้พอดีกับกล้องหรือปรับแสงให้มีความสว่างมากขึ้น";
    }
  }
  // Calculate fps from timestamps
  getFps(timestamps, timeBase=1000) {
    if (Array.isArray(timestamps) && timestamps.length) {
      if (timestamps.length == 1) {
        return DEFAULT_FPS;
      } else {
        let diff = timestamps[timestamps.length-1] - timestamps[0];
        return timestamps.length/diff*timeBase;
      }
    } else {
      return DEFAULT_FPS;
    }
  }
 
  // // TODO solve this more elegantly
  selectGreen(signal) {
    let rgb = new cv.MatVector();
    cv.split(signal, rgb);
    // TODO possible memory leak, delete rgb?
    let result = rgb.get(1);
    // console.log("get resut green => ",result)
    rgb.delete();
    return result;
  }
  


  // // remove noise // 
  // denoise(signal, rescan) {
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

  // standardize(signal) {
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

  // detrend(signal, lambda) {
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

  // movingAverage(signal, n, kernelSize) {
  //   for (var i = 0; i < n; i++) {
  //     cv.blur(signal, signal, {height: kernelSize, width: 1});
  //   }
  // }

}
