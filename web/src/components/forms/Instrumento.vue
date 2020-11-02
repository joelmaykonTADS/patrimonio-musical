<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="3">
        <v-text-field
          v-model="nome"
          color="grey"
          label="Nome do instrumento"
          placeholder="Informe o nome"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="caracteristica"
          color="grey"
          label="Característica"
          placeholder="Característica ou tonalidade"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="tombamento"
          color="grey"
          label="Tombamento"
          placeholder="Informe o número"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col cols="3">
        <v-text-field
          v-model="ano"
          color="grey"
          label="Ano"
          placeholder="Ano de fabricação"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="marca"
          color="grey"
          label="Marca"
          placeholder="Marca do instrumento"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="componentes"
          color="grey"
          label="Componentes"
          placeholder="Componentes do instrumento"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col cols="9">
        <v-textarea
          v-model="descricao"
          color="grey"
          label="Observações"
          rows="2"
          placeholder="Descrição da situação do instrumento"
          outlined
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col cols="3">
        <v-text-field
          v-model="empresa"
          color="grey"
          label="Empresa"
          placeholder="Empresa onde comprou"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="notaFiscal"
          color="grey"
          label="Nota fiscal da compra ou doação"
          placeholder="Número da nota fiscal"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="valor"
          color="grey"
          label="Valor"
          placeholder="Valor da compra"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col cols="3">
        <v-text-field
          v-model="data"
          color="grey"
          label="Data da compra ou doação"
          placeholder="Data da compra ou doação"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="origem"
          color="grey"
          label="Origem da doação"
          placeholder="Origem da doação"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="descricaoDoacao"
          color="grey"
          label="Observações"
          placeholder="Descrição sobre a doação"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-end">
      <v-col cols="2">
        <v-btn color="grey darken-1" class="white--text" @click="voltar()"
          >Cancelar</v-btn
        >
      </v-col>
      <v-col cols="3">
        <v-btn
          v-if="type === 'edit'"
          color="grey darken-3"
          @click="editStudents()"
          class="white--text"
          >Editar</v-btn
        >
        <v-btn
          v-if="type !== 'edit'"
          color="grey darken-3"
          @click="registerStudents()"
          class="white--text"
          >Salvar</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
const http = axios;
const url = process.env.VUE_APP_URL_API;
export default {
  props: { instrumento: Object, type: String, readonly: Boolean },
  data() {
    return {
      id: "",
      nome: "",
      caracteristica: "",
      tombamento: "",
      ano: "",
      marca:"",
      descricao:""
    };
  },
  created() {
    if (this.student) {
      this.id = this.student.id;
      this.name = this.student.name;
      this.email = this.student.email;
      this.ra = this.student.RA;
      this.cpf = this.student.CPF;
    }
  },
  methods: {
    async registerStudents() {
      const instrumento = {
        nome: this.nome,
        caracteristica: this.caracteristica,
        tombamento: this.tombamento,
        ano: this.ano,
        marca:this.marca,
        descricao:this.descricao
      };
      await http.post(`${url}/instrumentos`, instrumento).then((response) => {
        if (response.status == 200) {
          console.log(response.data);
          this.$router.push("/instrumentos");
        }
      });
    },
    async editStudents() {
      const student = {
        name: this.name,
        email: this.email,
      };
      await http.put(`${url}/students/${this.id}`, student).then((response) => {
        if (response.status == 200) {
          console.log(response.data);
          this.$router.push("/instrumentos");
        }
      });
    },
    voltar() {
      this.$router.push("/instrumentos");
    },
  },
};
</script>
