<template>
  <v-sheet class="ma-4 pa-4 rounded-xl" width="max">
    <div class="d-flex justify-space-between">
      <p class="primary-text">Основные параметры</p>
      <div>
        <v-btn class="mr-2" icon size="29" @click="saveRecord()" variant="text">
          <v-icon color="grey-darken-2" size="29">mdi-check </v-icon>
        </v-btn>
        <v-btn icon size="29" @click="closeDialog()" variant="text">
          <v-icon color="grey-darken-2" size="29">mdi-close </v-icon>
        </v-btn>
      </div>
    </div>

    <v-text-field
      v-model="record.type"
      class="text-field px-2 mb-1"
      label="Тип объекта"
      variant="underlined"
      color="grey-darken-1"
      base-color="grey"
    ></v-text-field>

    <v-text-field
      v-model="record.title"
      class="text-field px-2 mb-1"
      label="Название"
      variant="underlined"
      color="grey-darken-1"
      base-color="grey"
    ></v-text-field>

    <v-text-field
      v-model="record.model"
      class="text-field px-2 mb-1"
      label="Модель"
      variant="underlined"
      color="grey-darken-1"
      base-color="grey"
    ></v-text-field>

    <v-text-field
      v-model="record.serialNumber"
      class="text-field px-2 mb-1"
      label="Серийный номер"
      variant="underlined"
      color="grey-darken-1"
      base-color="grey"
    ></v-text-field>

    <v-text-field
      v-model="record.invNumber"
      class="text-field px-2 mb-1"
      label="Инвентарный номер"
      variant="underlined"
      color="grey-darken-1"
      base-color="grey"
    ></v-text-field>

    <v-select
      v-model="record.status"
      clearable
      class="text-field px-2 mb-1"
      label="Статус"
      :items="['В эксплуатации', 'В архиве', 'Сломан']"
      variant="underlined"
      color="grey-darken-1"
      base-color="grey-darken-1"
    ></v-select>

    <v-text-field
      v-model="record.user"
      class="text-field px-2 mb-1"
      label="Пользователь"
      variant="underlined"
      color="grey-darken-1"
      base-color="grey"
    ></v-text-field>

    <v-text-field
      v-model="record.roomNumber"
      class="text-field px-2 mb-1"
      label="№ кабинета"
      variant="underlined"
      color="grey-darken-1"
      base-color="grey"
    ></v-text-field>

    <v-text-field
      v-model="record.description"
      class="text-field px-2 mb-2"
      label="Описание"
      variant="underlined"
      color="grey-darken-1"
      base-color="grey"
    ></v-text-field>
  </v-sheet>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";

const props = defineProps(["id"]);
const record = ref({});
const emit = defineEmits(["closeDialog"]);

const closeDialog = () => {
  emit("closeDialog");
};

const saveRecord = () => {
  console.log(record.value);
  fetch(`http://91.107.125.203:8000/${record.value.id ? "update" : "create"}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record.value),
  })
    .then(() => {
      emit("successSave", record.value.id);
      closeDialog();
    })
    .catch((error) => {
      console.error("Ошибка при создании элемента:", error);
    });
};

const load = async (id) => {
  const result = await fetch(`http://91.107.125.203:8000/item?id=${id}`);
  record.value = await result.json();
};

if (props.id) {
  load(props.id);
} else {
  record.value = {};
}
</script>
