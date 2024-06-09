<template>
  <div class="secondary-text pl-6 mt-2 mb-1">
    <v-chip-group selected-class="selected" column v-model="status" mandatory>
      <v-chip
        class="unselected"
        v-for="tag in tags"
        :key="tag"
        :text="tag"
        :value="tag"
        @click="selectTag(tag)"
      >
      </v-chip>
    </v-chip-group>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
const tags = ["Все", "В эксплуатации", "Сломан", "В архиве"];
const emit = defineEmits(["filter"]);
const status = ref("Все");

const selectTag = (tag) => {
  status.value = tag;
  onFiltering();
};

const onFiltering = () => {
  console.log(status.value);
  emit("filter", { query: status.value });
};
</script>

<style>
.unselected {
  background-color: rgba(51, 51, 51, 0.05);
}

.selected {
  color: rgba(51, 51, 51);
  background-color: rgba(51, 51, 51, 0.22);
}
</style>
