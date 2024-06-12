<template>
  <v-sheet class="ma-4 pa-4 rounded-xl" width="max">
    <span color="rgba(51, 51, 51)"
      >Вы уверены, что хотите удалить этот элемент?</span
    >
    <div class="mt-4 d-flex flex-row-reverse">
      <v-btn color="rgba(51, 51, 51, 0.75)" variant="text" @click="closeDelete"
        >Нет</v-btn
      >
      <v-btn
        color="rgba(51, 51, 51, 0.75)"
        variant="text"
        @click="deleteItemConfirm(props.id)"
        >Да</v-btn
      >
    </div>
  </v-sheet>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const emit = defineEmits(["closeDelete"]);
const props = defineProps(["id"]);

const closeDelete = () => {
  emit("closeDelete");
};

const deleteItemConfirm = (id) => {
  fetch(`http://91.107.125.203:8000/deleteItem?id=${id}`)
    .then(() => {
      emit("successDelete", true);
      closeDelete();
    })
    .catch((error) => {
      console.error("Ошибка при удалении элемента:", error);
    });
};
</script>
