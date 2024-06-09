<template>
  <div>
    <QRCodeScanner
      license="DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ=="
      :torchOn="torchOn"
      :runtimeSettings="runtimeSettings"
      @onScanned="onScanned"
      @onPlayed="onPlayed"
    ></QRCodeScanner>
    <v-btn @click="toggleFlash" class="mt-10">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn @click="close" class="mt-10">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
  </div>
  <svg :viewBox="viewBox" class="overlay" v-if="sharedStates.continuousScan">
    <polygon
      v-bind:key="'polygon' + index"
      v-for="(barcodeResult, index) in barcodeResults"
      :points="getPointsData(barcodeResult)"
      class="barcode-polygon"
    />
    <text
      v-bind:key="'text' + index"
      v-for="(barcodeResult, index) in barcodeResults"
      :x="barcodeResult.x1"
      :y="barcodeResult.y1"
      fill="red"
      font-size="25"
    >
      {{ barcodeResult.barcodeText }}
    </text>
  </svg>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { states } from "../states";
import QRCodeScanner from "../components/QRCodeScanner.vue";
import { useRouter } from "vue-router";

const torchOn = ref(false);
const viewBox = ref("0 0 1280 720");
const barcodeResults = ref([]);
const sharedStates = states;
const runtimeSettings = ref("");
let frameWidth = 1280;
let frameHeight = 720;

if (sharedStates.QRCodeOnly) {
  runtimeSettings.value =
    '{"ImageParameter":{"BarcodeFormatIds":["BF_QR_CODE"],"Description":"","Name":"Settings"},"Version":"3.0"}';
} else {
  runtimeSettings.value =
    '{"ImageParameter":{"BarcodeFormatIds":["BF_ALL"],"Description":"","Name":"Settings"},"Version":"3.0"}';
}

const router = useRouter();
let scanned = false;

const onScanned = (result) => {
  console.log("onScanned");
  console.log(result);
  if (
    result.results.length > 0 &&
    scanned === false &&
    sharedStates.continuousScan === false
  ) {
    scanned = true;
    sharedStates.barcodeResults = result.results;
    router.back();
  } else {
    if (result.deviceOrientation === "portrait") {
      viewBox.value = "0 0 " + frameHeight + " " + frameWidth;
    } else {
      viewBox.value = "0 0 " + frameWidth + " " + frameHeight;
    }
    barcodeResults.value = result.results;
  }
};

const onPlayed = (resolution) => {
  const width = resolution.split("x")[0];
  const height = resolution.split("x")[1];
  frameWidth = parseInt(width);
  frameHeight = parseInt(height);
};

const getPointsData = (tr) => {
  let pointsData = tr.x1 + "," + tr.y1 + " ";
  pointsData = pointsData + tr.x2 + "," + tr.y2 + " ";
  pointsData = pointsData + tr.x3 + "," + tr.y3 + " ";
  pointsData = pointsData + tr.x4 + "," + tr.y4;
  return pointsData;
};

const toggleFlash = () => {
  torchOn.value = !torchOn.value;
  console.log("toggleFlash");
  console.log(torchOn.value);
};

const close = () => {
  router.back();
};

onMounted(() => {
  console.log(sharedStates.QRCodeOnly);
  console.log(sharedStates.continuousScan);
  console.log(sharedStates);
  //setTimeout(goBack,2000);
});
</script>

<style scoped>
.barcode-polygon {
  fill: rgba(85, 240, 40, 0.5);
  stroke: green;
  stroke-width: 1;
}
.overlay {
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 998;
}
</style>
