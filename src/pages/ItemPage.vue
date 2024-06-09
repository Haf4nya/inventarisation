<template>
  <v-toolbar color="white" floating="sm">
    <v-btn icon size="29" @click="$router.back()">
      <v-icon color="grey-darken-2" size="29">mdi-chevron-left</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn icon size="29" v-bind="activatorProps">
      <v-icon
        @click="onDeleteItem(id), $router.back()"
        color="grey-darken-2"
        size="29"
        >mdi-trash-can-outline</v-icon
      >
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
          height="40"
          >Отправить
        </v-btn>
        <v-btn
          @click="onOpenUpdatePage(item.id)"
          class="ml-2 rounded-xl text-none"
          icon="mdi-file-edit-outline"
          variant="tonal"
          color="rgba(51, 51, 51)"
          height="40"
          width="40"
        >
        </v-btn>
      </v-sheet>
    </div>

    <v-sheet
      class="ma-4 pa-4 rounded-xl"
      width="max"
      color="grey-lighten-2"
      v-if="item"
    >
      <p class="primary-text">Основные параметры</p>

      <div class="d-flex justify-space-between pt-4">
        <p class="secondary-text">Тип объекта</p>
        <p class="primary-text pr-4">{{ item.type }}</p>
      </div>

      <div class="d-flex justify-space-between pt-2">
        <p class="secondary-text">Название</p>
        <p class="primary-text pr-4">{{ item.title }}</p>
      </div>

      <div class="d-flex justify-space-between pt-2">
        <p class="secondary-text">Модель</p>
        <p class="primary-text pr-4">{{ item.model }}</p>
      </div>

      <div class="d-flex justify-space-between pt-2">
        <p class="secondary-text">Серийный номер</p>
        <p class="primary-text pr-4">{{ item.serialNumber }}</p>
      </div>

      <div class="d-flex justify-space-between pt-2">
        <p class="secondary-text">Инвентарный номер</p>
        <p class="primary-text pr-4">{{ item.invNumber }}</p>
      </div>

      <div class="d-flex justify-space-between pt-2">
        <p class="secondary-text">Статус</p>
        <p class="primary-text pr-4">{{ item.status }}</p>
      </div>

      <div class="d-flex justify-space-between pt-2">
        <p class="secondary-text">Пользователь</p>
        <p class="primary-text pr-4">{{ item.user }}</p>
      </div>

      <div class="d-flex justify-space-between pt-2">
        <p class="secondary-text">№ Кабинета</p>
        <p class="primary-text pr-4">{{ item.roomNumber }}</p>
      </div>
    </v-sheet>

    <v-sheet
      class="ma-4 pa-4 rounded-xl"
      width="max"
      color="grey-lighten-2"
      v-if="item"
    >
      <p class="primary-text">Описание</p>

      <div class="d-flex justify-space-between pt-4">
        <p class="primary-text pr-4">{{ item.description }}</p>
      </div>
    </v-sheet>
  </v-sheet>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

import { useRouter } from "vue-router";

const route = useRoute();
const id = route.params.id;
const item = ref();

const load = async (id) => {
  const result = await fetch(`http://localhost:8000/item?id=${id}`);
  item.value = await result.json();
};

load(id);

const router = useRouter();

const onOpenUpdatePage = (id) => {
  router.push({ name: "createItem", params: { id } });
};

const onDeleteItem = (id) => {
  item.value = fetch(`http://localhost:8000/deleteItem?id=${id}`);
};
</script>

<style></style>
