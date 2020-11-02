<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="9">
        <v-text-field
          v-model="name"
          color="grey"
          label="Nome do aluno"
          placeholder="Informe o nome completo"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col cols="9">
        <v-text-field
          v-model="email"
          color="grey"
          label="E-mail do aluno"
          placeholder="Informe apenas um email"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col cols="9">
        <v-text-field
          v-model="ra"
          color="grey"
          label="RA"
          :readonly="readonly"
          placeholder="Informe o registro acadêmico"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col cols="9">
        <v-text-field
          v-model="cpf"
          color="grey"
          label="CPF"
          :readonly="readonly"
          placeholder="Informe o número do documento"
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
    return { id: "", name: "", email: "", ra: "", cpf: "" };
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
      const student = {
        name: this.name,
        email: this.email,
        RA: this.ra,
        CPF: this.cpf,
      };
      await http.post(`${url}/students`, student).then((response) => {
        if (response.status == 200) {
          console.log(response.data);
          this.$router.push("/list-students");
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
