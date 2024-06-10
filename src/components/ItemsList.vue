<template>
  <search-field @search="onSearch" />

  <div class="d-flex justify-space-between mr-2">
    <filter-list @filter="onFiltering" />

    <div>
      <v-btn
        class="mt-6 mr-2"
        icon
        size="29"
        variant="text"
        @click="downloadPdf()"
      >
        <v-icon color="grey-darken-2" size="25">
          mdi-file-download-outline
        </v-icon>
      </v-btn>

      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ props }">
          <v-btn
            class="mt-6"
            icon
            size="29"
            v-bind="props"
            variant="text"
            @click="selectedId = 0"
          >
            <v-icon color="grey-darken-2" size="29">mdi-plus </v-icon>
          </v-btn>
        </template>
        <create-item
          :id="selectedId"
          @closeDialog="dialog = false"
          @successSave="load"
        />
      </v-dialog>
    </div>
  </div>

  <v-dialog v-model="dialogDelete" max-width="300px">
    <delete-item
      :id="selectedId"
      @closeDelete="dialogDelete = false"
      @successDelete="load"
    />
  </v-dialog>

  <v-data-table-virtual
    v-model:expanded="expanded"
    :headers="headers"
    :items="items"
    show-expand
    show-select
    hide-default-footer
    disable-pagination
    fixed-header
    v-model="selected"
  >
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length" class="expanded-row">
          Описание: {{ item.description }}
        </td>
      </tr>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <tr>
        <td>
          <v-icon class="me-2" size="small" @click="onEditItem(item.id)">
            mdi-pencil
          </v-icon>
          <v-icon size="small" @click="onDeleteItem(item.id)">
            mdi-delete
          </v-icon>
        </td>
      </tr>
    </template>
    <template v-slot:no-data> Нет данных </template>
  </v-data-table-virtual>
</template>

<script setup>
import searchField from "@/components/SearchField.vue";
import filterList from "@/components/FilterList.vue";
import CreateItem from "@/components/CreateItem.vue";
import DeleteItem from "@/components/DeleteItem.vue";
import { ref } from "vue";

const items = ref([]);
const searchQuery = ref();
const filter = ref();
const expanded = ref([]);
const dialog = ref(false);
const dialogDelete = ref(false);
const selectedId = ref();
const selected = ref([]);

const headers = [
  { title: "Инвентарный номер", align: "left", key: "invNumber" },
  { title: "Тип объекта", align: "left", key: "type" },
  { title: "Название", align: "left", key: "title" },
  { title: "Модель", align: "left", key: "model" },
  { title: "Серийный номер", align: "left", key: "serialNumber" },
  { title: "Статус", align: "left", key: "status" },
  { title: "Пользователь", align: "left", key: "user" },
  { title: "№ Кабинета", align: "left", key: "roomNumber" },
  {
    title: "Действия",
    align: "left",
    key: "actions",
    value: "actions",
    sortable: false,
  },
];

const load = () => {
  fetch(
    `http://localhost:8000/listItems?${
      searchQuery.value
        ? "searchQuery=" + searchQuery.value
        : filter.value
        ? "filter=" + filter.value
        : ""
    }`
  )
    .then((response) => response.json())
    .then((data) => (items.value = data));
};

const onSearch = (params) => {
  searchQuery.value = params.query;
  load();
};

const onFiltering = (params) => {
  filter.value = params.query;
  console.log(filter.value);
  load();
};

const onDeleteItem = (id) => {
  console.log(id);
  selectedId.value = id;
  dialogDelete.value = true;
};

const onEditItem = (id) => {
  console.log(id);
  selectedId.value = id;
  dialog.value = true;
};

const downloadPdf = async () => {
  try {
    const selectedIds = selected.value;

    const resp = await fetch(`http://127.0.0.1:8000/download`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: selectedIds }),
    });

    const base64string = await resp.text();

    const downloadLink = document.createElement("a");
    const fileName = `${"Файл"}.pdf`;

    downloadLink.href = `data:application/pdf;base64,${base64string}`;
    console.log(downloadLink.href);
    downloadLink.download = fileName;
    downloadLink.click();
  } catch (error) {
    console.error("Error fetching or processing the PDF:", error);
  }
};

load();
</script>

<style>
.expanded-row {
  background-color: rgba(237, 237, 237);
}

.v-data-table__td {
  color: rgba(51, 51, 51, 0.9);
}
</style>
