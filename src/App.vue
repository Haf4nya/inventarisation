<template>
  <v-app style="z-index: 100">
    <router-view></router-view>
  </v-app>
</template>

<script setup></script>

<style>
@font-face {
  font-family: "aqum2";
  src: url("./fonts/aqum2.otf");
}

:root {
  --ion-font-family: "aqum2";
}

body {
  font-family: "aqum2";
}

.secondary-text {
  color: rgba(51, 51, 51, 0.6);
  font-family: "aqum2";
}

.primary-text {
  color: rgba(51, 51, 51);
  font-family: "aqum2";
  white-space: pre-line;
}
</style>
