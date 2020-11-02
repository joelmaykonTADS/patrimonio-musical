<template>
  <v-card elevation="0">
    <v-flex xs12 sm12 md12 lg12 d-flex>
      <v-flex xs6 sm6 md8 lg8 class="pt-5 pl-2">
        <v-hover>
          <v-text-field
            v-model="search"
            append-icon="mdi-table-search"
            label="Pesquisar"
            placeholder="Digite sua busca aqui"
            outlined
            class="text--pink"
            color="grey darken-4"
            hide-details
          ></v-text-field>
        </v-hover>
      </v-flex>
      <v-flex xs6 sm6 md3 lg3 offset-md1 align-center class="pt-5 pl-4">
        <btn-register />
      </v-flex>
    </v-flex>
    <v-data-table
      :headers="headers"
      :items="students"
      :search="search"
      class="elevation-0"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="item">
        <btn-edit :student="item.item" />
        <btn-delete
          :student="item.item"
          @updateListStudents="getAllStudents()"
        />
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import BtnDelete from "@/components/buttons/delete/alerts/Instrumento";
import BtnRegister from "@/components/buttons/register/Instrumento";
import BtnEdit from "@/components/buttons/edit/Instrumento";
import axios from "axios";
const http = axios;
const url = process.env.VUE_APP_URL_API;
export default {
  components: {
    BtnDelete,
    BtnRegister,
    BtnEdit,
  },
  data() {
    return {
      search: "",
      pagination: {
        descending: true,
        page: 1,
        rowsPerPage: -1,
        totalItems: 0,
        rowsPerPageItems: [1, 2, 4, 8, 16],
      },
      headers: [
        {
          text: "Registro acadêmico",
          align: "left",
          value: "RA",
          class: "grey black--text",
          width: "1%",
        },
        {
          text: "Nome",
          align: "left",
          value: "name",
          class: "grey black--text",
          width: "1%",
        },
        {
          text: "CPF",
          align: "left",
          class: "grey black--text",
          width: "1%",
          value: "CPF",
          sortable: false,
        },
        {
          text: "Ações",
          align: "center",
          class: "grey black--text",
          width: "1%",
          value: "actions",
          sortable: false,
        },
      ],
      students: [],
    };
  },
  async created() {
    await this.getAllStudents();
  },
  methods: {
    async getAllStudents() {
      await http.get(`${url}/students`).then((response) => {
        if (response.status == 200) this.students = response.data;
      });
    },
  },
};
</script>
