<template>
  <v-container>
    <v-card elevation="0" align="center" class="grey lighten-4">
      <v-flex xs12 sm12 md12 lg12 d-flex>
        <v-flex xs6 sm6 md5 lg5 class="pt-5 pl-2 pb-2">
          <v-hover>
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-table-search"
              label="Pesquisar"
              placeholder="Digite sua busca aqui"
              solo
              elevation="2"
              color="grey darken-4"
              hide-details
            ></v-text-field>
          </v-hover>
        </v-flex>
        <v-flex xs6 sm6 md3 lg3 offset-md4 align-center class="pt-7 pl-4">
          <router-link
            :to="{
              name: 'IrmaoRegister',
              params: { type: 'register', readonly: false },
            }"
          >
            <v-btn color="teal darken-2" large class="white--text" elevation="0"
              ><v-icon>mdi-plus</v-icon><span class="font-weight-bold">Novo Irmao</span></v-btn
            >
          </router-link>
        </v-flex>
      </v-flex>
      <v-data-table
        :headers="headers"
        :items="irmaos"
        :search="search"
        item-key="codigo"
        :items-per-page="7"
        class="elevation-0 ml-1 grey--text text--darken-2 font-weight-bold"
        :loading="loading"
        loading-text="carregando... aguarde um momento"
      >
        <template v-slot:top>
          <v-toolbar flat class="grey lighten-4">
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="item">
          <btn-edit :irmao="item.item" />
          <!--btn-delete
          :student="item.item"
          @updateListStudents="getAllStudents()"
        /> -->
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
import { get } from "@/services/repository";
import BtnEdit from "@/components/irmao/EditIrmao";

export default {
  components: {
    BtnEdit,
  },
  data() {
    return {
      search: "",
      loading: true,
      pagination: {
        descending: true,
        page: 1,
        rowsPerPage: 5,
        totalItems: 0,
        rowsPerPageItems: [1, 5, 10, 20, 30],
      },
      headers: [
        {
          text: "Código no relatório",
          align: "center",
          value: "codigo",
          class:
            "grey lighten-4 grey--text text--darken-1 body-1 font-weight-bold pb-5",
          width: "1%",
        },
        {
          text: "Cidade",
          align: "center",
          value: "cidade",
          class:
            "grey lighten-4 grey--text text--darken-1 body-1 font-weight-bold pb-5",
          width: "1%",
        },
        {
          text: "Casa de oração",
          align: "center",
          class:
            "grey lighten-4 grey--text text--darken-1 body-1 font-weight-bold pb-5",
          width: "1%",
          value: "comum",
          sortable: false,
        },
        {
          text: "Encarregado regional",
          align: "center",
          class:
            "grey lighten-4 grey--text text--darken-1 body-1 font-weight-bold  pb-5",
          width: "1%",
          value: "encarregadoRegional",
          sortable: false,
        },
        {
          text: "Encarregado local",
          align: "center",
          class:
            "grey lighten-4 grey--text text--darken-1 body-1 font-weight-bold  pb-5",
          width: "1%",
          value: "encarregadoLocal",
          sortable: false,
        },
        {
          text: "Ação",
          align: "center",
          class:
            "grey lighten-4 grey--text text--darken-1 body-1 font-weight-bold  pb-5",
          width: "1%",
          value: "actions",
          sortable: false,
        },
      ],
      irmaos: [],
    };
  },
  async created() {
    await this.getIrmaos();
  },
  methods: {
    async getIrmaos() {
      this.overlay = true;
      await get("irmaos").then((response) => {
        if (response.status == 200) {
          this.Irmaos = response.data;
          this.loading = false;
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
.v-btn {
  text-transform: none;
  font-size: 15px;
}
</style>
