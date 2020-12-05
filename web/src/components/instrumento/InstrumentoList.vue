<template>
  <v-container>
    <v-card elevation="0"  align="center">
      <v-flex xs12 sm12 md12 lg12 d-flex>
        <v-flex xs6 sm6 md8 lg8 class="pt-5 pl-2">
          <v-hover>
            <v-text-field
              v-model="search"
              append-icon="mdi-table-search"
              label="Pesquisar"
              placeholder="Digite sua busca aqui"
              outlined
              color="grey darken-4"
              hide-details
            ></v-text-field>
          </v-hover>
        </v-flex>
        <v-flex xs6 sm6 md3 lg3 offset-md1 align-center class="pt-5 pl-4">
          <router-link
            :to="{
              name: 'InstrumentoRegister',
              params: { type: 'register', readonly: false },
            }"
          >
            <v-btn color="grey" class="white--text"
              >Cadastrar instrumento</v-btn
            >
          </router-link>
        </v-flex>
      </v-flex>
      <v-data-table
        :headers="headers"
        :items="instrumentos"
        :search="search"
        item-key="tombamento"
        :items-per-page="7"
        class="elevation-0"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="instrumentos">
          <v-row>
            <v-col>
          <v-btn fab small :instrumento="instrumentos">
            <v-icon dark color="blue lighten-1"> mdi-pencil </v-icon>
          </v-btn>         
            </v-col>
            <v-col>
          <v-btn fab small :instrumento="instrumentos">
            <v-icon dark color="red lighten-1"> mdi-delete </v-icon></v-btn
          >
            </v-col>
          </v-row>
          <!-- <btn-edit :student="item.item" />
        <btn-delete
          :student="item.item"
          @updateListStudents="getAllStudents()"
        /> -->
        </template>
      </v-data-table>
      <v-overlay :value="overlay" :absolute="true">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-card>
  </v-container>
</template>
<script>
import { get } from "@/services/repository";

export default {
  data() {
    return {
      overlay: false,
      search: "",
      pagination: {
        descending: true,
        page: 1,
        rowsPerPage: 5,
        totalItems: 0,
        rowsPerPageItems: [1, 5, 10, 20, 30],
      },
      headers: [
        {
          text: "Tombamento",
          align: "center",
          value: "tombamento",
          class: "grey white--text body-2",
          width: "1%",
        },
        {
          text: "Instrumento",
          align: "center",
          value: "nome",
          class: "grey white--text",
          width: "1%",
        },
        {
          text: "Ton/Característica",
          align: "center",
          class: "grey white--text",
          width: "1%",
          value: "caracteristica",
          sortable: false,
        },
        {
          text: "Status",
          align: "center",
          class: "grey white--text",
          width: "1%",
          value: "",
          sortable: false,
        },
        {
          text: "Encarregado Regional/Local",
          align: "center",
          class: "grey white--text",
          width: "1%",
          value: "",
          sortable: false,
        },
        {
          text: "localização",
          align: "center",
          class: "grey white--text",
          width: "1%",
          value: "",
          sortable: false,
        },
        {
          text: "Açoes",
          align: "center",
          class: "grey white--text",
          width: "1%",
          value: "actions",
          sortable: false,
        },
      ],
      instrumentos: [],
    };
  },
  async created() {
    await this.getInstrumentos();
  },
  methods: {
    async getInstrumentos() {
      this.overlay = true;
      await get("instrumentos").then((response) => {
        if (response.status == 200) {
          this.instrumentos = response.data;
          this.overlay = false;
        }
      });
    },
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>