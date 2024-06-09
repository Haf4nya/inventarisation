<template>
  <v-card class="rail-menu">
    <v-layout>
      <v-navigation-drawer permanent rail absolute="absolute">
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-clipboard-list-outline"
            value="dashboard"
          ></v-list-item>

          <v-list-item
            prepend-icon="mdi-file-multiple-outline"
            value="messages"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="">
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup></script>

<style scoped>
.rail-menu {
  height: 100%;
}
</style>
