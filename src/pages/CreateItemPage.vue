<template>
  <v-toolbar color="white" floating="sm">
    <v-btn icon size="29" @click="$router.back()">
      <v-icon color="grey-darken-2" size="29">mdi-chevron-left</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn icon size="29" @click="saveRecord(), $router.back()">
      <v-icon color="grey-darken-2" size="29">mdi-file-edit-outline</v-icon>
    </v-btn>
  </v-toolbar>

  <v-sheet
    class="px-2 rounded-t-xl"
    color="grey-lighten-4"
    height="100%"
    width="100%"
  >
    <div class="py-10 d-flex justify-center">
      <v-sheet
        class="primary-text rounded-xl mx-auto pa-4 d-flex align-end"
        color="grey-lighten-2"
        height="250"
      >
        <v-btn
          class="rounded-xl text-none"
          append-icon="mdi-share-outline"
          variant="tonal"
          color="rgba(51, 51, 51)"
          >Отправить
        </v-btn>
      </v-sheet>
    </div>

    <v-sheet class="ma-4 pa-4 rounded-xl" width="max" color="grey-lighten-2">
      <p class="primary-text">Основные параметры</p>

      <v-text-field
        v-model="record.type"
        class="text-field px-2"
        label="Тип объекта"
        variant="underlined"
        color="grey-darken-1"
        base-color="grey"
      ></v-text-field>

      <v-text-field
        v-model="record.title"
        class="text-field px-2"
        label="Название"
        variant="underlined"
        color="grey-darken-1"
        base-color="grey"
      ></v-text-field>

      <v-text-field
        v-model="record.model"
        class="text-field px-2"
        label="Модель"
        variant="underlined"
        color="grey-darken-1"
        base-color="grey"
      ></v-text-field>

      <v-text-field
        v-model="record.serialNumber"
        class="text-field px-2"
        label="Серийный номер"
        variant="underlined"
        color="grey-darken-1"
        base-color="grey"
      ></v-text-field>

      <v-text-field
        v-model="record.invNumber"
        class="text-field px-2"
        label="Инвентарный номер"
        variant="underlined"
        color="grey-darken-1"
        base-color="grey"
      ></v-text-field>

      <v-select
        v-model="record.status"
        clearable
        class="text-field px-2"
        label="Статус"
        :items="['В эксплуатации', 'В архиве', 'Сломан']"
        variant="underlined"
        color="grey-darken-1"
        base-color="grey-darken-1"
      ></v-select>

      <v-text-field
        v-model="record.user"
        class="text-field px-2"
        label="Пользователь"
        variant="underlined"
        color="grey-darken-1"
        base-color="grey"
      ></v-text-field>

      <v-text-field
        v-model="record.roomNumber"
        class="text-field px-2"
        label="№ кабинета"
        variant="underlined"
        color="grey-darken-1"
        base-color="grey"
      ></v-text-field>

      <v-text-field
        v-model="record.description"
        class="text-field px-2"
        label="Описание"
        variant="underlined"
        color="grey-darken-1"
        base-color="grey"
      ></v-text-field>
    </v-sheet>
  </v-sheet>
</template>

<script setup>
import { ref } from "vue";

import { useRoute } from "vue-router";

const route = useRoute();
const id = Number(route.params.id);

const record = ref({});

const saveRecord = () => {
  console.log(record.value);
  fetch(`http://127.0.0.1:8000/${record.value.id ? "update" : "create"}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record.value),
  });
};

const load = async (id) => {
  const result = await fetch(`http://localhost:8000/item?id=${id}`);
  record.value = await result.json();
};

if (id) {
  load(id);
}
</script>

<style></style>
