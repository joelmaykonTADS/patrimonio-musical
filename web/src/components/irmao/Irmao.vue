<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="3">
        <v-text-field
          v-model="cep"
          color="grey"
          item-color="grey darken-2"
          label="Cep"
          placeholder="Informe o número"
          outlined
          :readonly="disabled"
        />
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="cidade"
          color="grey"
          label="Cidade"
          placeholder="Informe o nome"
          outlined
          :readonly="disabled"
        />
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="bairro"
          color="grey"
          label="Bairro"
          placeholder="Informe o nome"
          outlined
          :readonly="disabled"
        />
      </v-col>
    </v-row>    
    <v-row class="d-flex justify-center py-auto">
      <v-btn class="mr-2" large dark color="purple darken-2" elevation="0" @click="voltar()">
        <v-icon>mdi-arrow-left</v-icon>
        Voltar
      </v-btn>
      <v-btn
        v-if="type === 'edit' && edit === false"
        color="blue darken-2 mr-2"
        large
        dark
        @click="setEdit()"
        elevation="0"
      >
        <v-icon>mdi-pencil</v-icon>
        Editar
      </v-btn>
      <v-btn
        v-if="edit === true && type === 'edit'"
        class="mr-2"
        color="red lighten-1"
        large
        dark
        elevation="0"
        @click="excluir"
      >
        <v-icon>mdi-trash-can-outline</v-icon>
        Excluir
      </v-btn>
      <v-btn
        v-if="edit === true || type !== 'edit'"
        color="teal darken-2 mr-2"
        large
        dark
        elevation="0"
        @click="salvar"
      >
        <v-icon>mdi-check</v-icon>
        Salvar
      </v-btn>
    </v-row>
  </v-container>
</template>
<script>
import { post, remove, put } from "@/services/repository";

export default {
  props: { type: String, readonly: Boolean },
  inject: {
    theme: {
      default: { isDark: false },
    },
  },
  data() {
    return {
      disabled: this.readonly,
      edit: false,
      id: "",
      cep: "",
      cidade: "",
      bairro: ""      
    };
  },
  watch: {
    cidade: function(newValue) {
      if (newValue) this.cidade = this.capitalizeFirstLetter(newValue);
    },
    bairro: function(newValue) {
      if (newValue) this.bairro = this.capitalizeFirstLetter(newValue);
    }
  },
  async created() {
    if (this.type === undefined) {
      this.voltar();
    } else {
      await this.AtualizarFormulário();
      this.alterarIrmao();
      this.disabled = this.readonly;
    }
  },
  methods: {
    setEdit() {
      this.disabled = false;
      this.edit = true;
    },
    async alterarIrmao() {
      const irmao = this.$store.state.irmao;
      if (irmao) {
        this.id = irmao.id;
        this.cep = irmao.cep;
        this.cidade = irmao.cidade;
        this.bairro = irmao.bairro;      
      }
    },
    capitalizeFirstLetter: (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    async salvar() {
      const irmao = {
        cep: this.cep,
        cidade: this.cidade,
        bairro: this.bairro      
      };
      if (this.type !== "edit") {
        await post(`irmaos`, irmao).then(async (response) => {
          if (response.status == 200) this.voltar();
        });
      } else {
        await put(`irmaos/${this.id}`, irmao).then(async (response) => {
          if (response.status == 200) this.voltar();
        });
      }
    },
    voltar() {
      if (this.edit === true) {
        this.edit = false;
        this.disabled = true;
      } else {
        this.$store.commit("setIrmao", []);
        this.$router.push("/irmaos");
      }
    },
    excluir() {
      remove("irmaos", this.id).then((response) => {
        response.status === 204 && this.$router.push("/irmaos");
      });
    },
  },
};
</script>
<style>
/* This is for documentation purposes and will not be needed in your application */
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}

.form-row-top {
  margin-top: -30px;
}

.v-btn {
  text-transform: none;
  font-size: 15px;
}
</style>
