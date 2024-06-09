<template>
  <div class="search-field-background d-flex flex-wrap">
    <v-text-field
      v-model="searchQuery"
      append-inner-icon="mdi-magnify "
      class="pt-6 mx-4 search-field"
      label="Поиск..."
      variant="outlined"
      rounded="pill"
      bg-color="white"
      color="grey-lighten-1"
      base-color="grey"
      @click:append-inner="onSearch"
    >
    </v-text-field>
    <v-btn
      class="clear-btn"
      variant="text"
      v-if="searchQuery"
      icon
      size="29"
      small
      @click="onClearSearch"
    >
      <v-icon class="primary-text">mdi-close-circle-outline</v-icon>
    </v-btn>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
const emit = defineEmits(["search"]);
const searchQuery = ref("");

const onSearch = () => {
  console.log(searchQuery.value);
  emit("search", { query: searchQuery.value });
};
const onClearSearch = () => {
  searchQuery.value = "";
  emit("search", { query: searchQuery.value });
};
</script>

<style>
.search-field-background {
  height: 75px;
  width: 750px;
}

.search-field {
  max-width: 450px;
}

.v-input__details {
  padding: 0px;
  min-height: 0px;
  font-size: 0px;
}

.v-messages {
  min-height: 0px;
  font-size: 0px;
}

.clear-btn {
  margin-top: 37px;
}
</style>
