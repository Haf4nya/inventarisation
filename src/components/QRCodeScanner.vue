<template>
  <div v-if="!initialized">Initializing...</div>
  {{ message }}
</template>

<script setup>
import {
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  defineProps,
  defineEmits,
} from "vue";
import { DBR } from "capacitor-plugin-dynamsoft-barcode-reader";

const props = defineProps([
  "license",
  "dceLicense",
  "torchOn",
  "runtimeSettings",
]);
const emit = defineEmits(["onScanned", "onPlayed"]);
const initialized = ref(false);
let currentHeight = 0;
let currentWidth = 0;
let frameReadListener;
let onPlayedListener;
let message = "";

const handleRotation = (result, orientation, rotation) => {
  let width, height;
  if (orientation == "portrait") {
    width = currentHeight;
    height = currentWidth;
  } else {
    width = currentWidth;
    height = currentHeight;
  }
  for (let i = 1; i < 5; i++) {
    let x = result["x" + i];
    let y = result["y" + i];
    let rotatedX;
    let rotatedY;

    switch (rotation) {
      case 0:
        rotatedX = x;
        rotatedY = y;
        break;
      case 90:
        rotatedX = width - y;
        rotatedY = x;
        break;
      case 180:
        rotatedX = width - x;
        rotatedY = height - y;
        break;
      case 270:
        rotatedX = height - y;
        rotatedY = width - x;
        break;
      default:
        rotatedX = x;
        rotatedY = y;
    }
    result["x" + i] = rotatedX;
    result["y" + i] = rotatedY;
  }
};

onMounted(async () => {
  try {
    console.log(props);
    let options = {};
    if (props.license) {
      options.license = props.license;
    }
    if (props.dceLicense) {
      options.dceLicense = props.dceLicense;
    }
    let result = await DBR.initialize(options); // To use your license: DBR.initialize({license: <your license>})
    message += "QRCodeScanner mounted ";
    message += result.success;

    if (result.success === true) {
      initialized.value = true;
      if (frameReadListener) {
        frameReadListener.remove();
      }
      if (onPlayedListener) {
        onPlayedListener.remove();
      }
      message += " frameReadListener ";
      frameReadListener = await DBR.addListener("onFrameRead", (scanResult) => {
        for (let index = 0; index < scanResult.results.length; index++) {
          const result = scanResult.results[index];
          if (scanResult.deviceOrientation && scanResult.frameOrientation) {
            handleRotation(
              result,
              scanResult.deviceOrientation,
              scanResult.frameOrientation
            );
          }
        }
        emit("onScanned", scanResult);
      });
      message += "onPlayedListener ";
      onPlayedListener = await DBR.addListener("onPlayed", (result) => {
        currentWidth = parseInt(result.resolution.split("x")[0]);
        currentHeight = parseInt(result.resolution.split("x")[1]);
        emit("onPlayed", result.resolution);
      });

      if (props.runtimeSettings) {
        message += "update runtime settings ";
        console.log(props.runtimeSettings);
        await DBR.initRuntimeSettingsWithString({
          template: props.runtimeSettings,
        });
      }
      message += "get all cameras";
      let camerasResult = await DBR.getAllCameras();
      message += camerasResult;
      if (camerasResult.cameras) {
        for (let index = 0; index < camerasResult.cameras.length; index++) {
          const cameraID = camerasResult.cameras[index];
          if (cameraID.toLowerCase().indexOf("founder") != -1) {
            console.log(cameraID);
            message += "select founder camera "; //the USB camera's name of the developer
            let selectionResult = await DBR.selectCamera({
              cameraID: cameraID,
            });
            console.log(selectionResult);
            break;
          }
        }
      }
      message += "Start scan ";
      await DBR.startScan();
    }
  } catch (error) {
    message += error;
  }
});

onBeforeUnmount(() => {
  if (frameReadListener) {
    frameReadListener.remove();
  }
  if (onPlayedListener) {
    onPlayedListener.remove();
  }
  DBR.stopScan();
  message += "QRCodeScanner unmount ";
});

watch(
  () => props.torchOn,
  (newVal) => {
    if (newVal === true) {
      DBR.toggleTorch({ on: true });
    } else {
      DBR.toggleTorch({ on: false });
    }
  }
);
</script>

<style scoped></style>
