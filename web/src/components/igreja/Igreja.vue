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
    <v-row class="d-flex justify-center form-row-top">
      <v-col cols="6">
        <v-text-field
          v-model="rua"
          color="grey"
          item-color="grey darken-2"
          label="Rua/Avenida"
          placeholder="Informe o nome"
          outlined
          :readonly="disabled"
        />
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="numero"
          color="grey"
          label="Número"
          placeholder="Informe o número"
          outlined
          :readonly="disabled"
        />
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center form-row-top">
      <v-col cols="6">
        <v-text-field
          v-model="comum"
          color="grey"
          item-color="grey darken-2"
          label="Nome no relatório"
          placeholder="Informe o nome"
          outlined
          :readonly="disabled"
        />
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="codigo"
          color="grey"
          label="Código no relatório"
          placeholder="Informe o código"
          outlined
          :readonly="disabled"
        />
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center form-row-top">
      <v-col cols="9">
        <v-combobox
          v-model="encarregadoRegional"
          :items="encarregadosRegionais"
          color="grey"
          item-color="grey darken-2"
          label="Encarregado regional"
          placeholder="Informe o nome do irmão"
          outlined
          :readonly="disabled"
        />
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center form-row-top">
      <v-col cols="9">
        <v-combobox
          v-model="encarregadoLocal"
          :items="encarregadosLocais"
          color="grey"
          item-color="grey darken-2"
          label="Encarregado local"
          placeholder="Informe o nome do irmão"
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
import { get, post, remove, put } from "@/services/repository";

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
      bairro: "",
      rua: "",
      numero: "",
      comum: "",
      codigo: "",
      encarregadoRegional: "",
      encarregadoLocal: "",
      encarregadosRegionais: [],
      encarregadosLocais: [],
    };
  },
  watch: {
    cidade: function(newValue) {
      if (newValue) this.cidade = this.capitalizeFirstLetter(newValue);
    },
    bairro: function(newValue) {
      if (newValue) this.bairro = this.capitalizeFirstLetter(newValue);
    },
    rua: function(newValue) {
      if (newValue) this.rua = this.capitalizeFirstLetter(newValue);
    },
    comum: function(newValue) {
      if (newValue) this.comum = this.capitalizeFirstLetter(newValue);
    },
  },
  async created() {
    if (this.type === undefined) {
      this.voltar();
    } else {
      await this.AtualizarFormulário();
      this.alterarIgreja();
      this.disabled = this.readonly;
    }
  },
  methods: {
    setEdit() {
      this.disabled = false;
      this.edit = true;
    },
    async alterarIgreja() {
      const igreja = this.$store.state.igreja;
      if (igreja) {
        this.id = igreja.id;
        this.cep = igreja.cep;
        this.cidade = igreja.cidade;
        this.bairro = igreja.bairro;
        this.rua = igreja.rua;
        this.numero = igreja.numero;
        this.comum = igreja.comum;
        this.codigo = igreja.codigo;
        this.encarregadoRegional = igreja.encarregadoRegional;
        this.encarregadoLocal = igreja.encarregadoLocal;
      }
    },
    capitalizeFirstLetter: (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    async salvar() {
      const igreja = {
        cep: this.cep,
        cidade: this.cidade,
        bairro: this.bairro,
        rua: this.rua,
        numero: this.numero,
        comum: this.comum,
        codigo: this.codigo,
        encarregadoRegional: this.encarregadoRegional,
        encarregadoLocal: this.encarregadoLocal,
      };
      if (this.type !== "edit") {
        await post(`igrejas`, igreja).then(async (response) => {
          if (response.status == 200) this.voltar();
        });
      } else {
        await put(`igrejas/${this.id}`, igreja).then(async (response) => {
          if (response.status == 200) this.voltar();
        });
      }
    },

    async AtualizarFormulário() {
      const lista_campos_formulario = [
        { url: "nomes", lista: this.nomes, field: "nome" },
        { url: "caracteristicas", lista: this.caracteristicas, field: "nome" },
      ];

      lista_campos_formulario.forEach(async (campo) => {
        await get(campo.url).then((response) => {
          if (response.status == 200) {
            response.data.forEach((dado) => {
              campo.lista.push(dado[campo.field]);
            });
          }
        });
      });
    },
    voltar() {
      if (this.edit === true) {
        this.edit = false;
        this.disabled = true;
      } else {
        this.$store.commit("setIgreja", []);
        this.$router.push("/igrejas");
      }
    },
    excluir() {
      remove("igrejas", this.id).then((response) => {
        response.status === 204 && this.$router.push("/igrejas");
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
