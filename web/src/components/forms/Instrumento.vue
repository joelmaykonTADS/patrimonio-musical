<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="3">
        <v-combobox
          v-model="nome"
          :items="nomes"
          color="grey"
          item-color="grey darken-2"
          label="Nome do instrumento"
          placeholder="Informe o nome"
          outlined
        ></v-combobox>
      </v-col>
      <v-col cols="3">
        <v-combobox
          v-model="caracteristica"
          :items="caracteristicas"
          color="grey"
          label="Característica"
          placeholder="Característica ou tonalidade"
          outlined
        ></v-combobox>
      </v-col>
      <v-col cols="3">
        <v-combobox
          v-model="tombamento"
          color="grey"
          label="Tombamento"
          placeholder="Informe o número"
          outlined
        ></v-combobox>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col cols="3">
        <v-combobox
          v-model="ano"
          color="grey"
          label="Ano"
          placeholder="Ano de fabricação"
          outlined
        ></v-combobox>
      </v-col>
      <v-col cols="3">
        <v-combobox
          v-model="marca"
          color="grey"
          label="Marca"
          placeholder="Marca do instrumento"
          outlined
        ></v-combobox>
      </v-col>
      <v-col cols="3">
        <v-combobox
          v-model="componentes"
          color="grey"
          label="Componentes"
          placeholder="Componentes do instrumento"
          outlined
          multiple
        ></v-combobox>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col cols="9">
        <v-textarea
          v-model="observacoes"
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
        <v-combobox
          v-model="empresa"
          color="grey"
          label="Empresa"
          placeholder="Empresa onde comprou"
          outlined
        ></v-combobox>
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
        <v-combobox
          v-model="origem"
          color="grey"
          label="Origem da doação"
          placeholder="Origem da doação"
          outlined
        ></v-combobox>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="observacoesDoacao"
          color="grey"
          label="Observações"
          placeholder="Descrição sobre a doação"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-end">
      <v-col cols="2">
        <v-btn color="grey darken-1" class="white--text" @click="BuscarNomes()"
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
          id="salvar"
          v-if="type !== 'edit'"
          color="grey darken-3"
          @click="cadastrarInstrumento()"
          class="white--text"
          >Salvar</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { salvar } from "@/services/instrumentos";
import { buscarNomes } from "@/services/nomes";
import { buscarCaracteristicas } from "@/services/caracteristicas";

export default {
  props: { instrumento: Object, type: String, readonly: Boolean },
  data() {
    return {
      id: "",
      nome: "",
      caracteristica: "",
      tombamento: "",
      ano: "",
      marca: "",
      componentes: "",
      observacoes: "",
      origem: "",
      notaFiscal: "",
      empresa: "",
      valor: "",
      data: "",
      observacoesDoacao: "",
      nomes: [],
      caracteristicas: [],
    };
  },
  async created() {
    await this.BuscarNomes();
    await this.BuscarCaracteristicas();
    if (this.instrumento) {
      this.alterarInstrumento(this.instrumento);
    }
  },
  methods: {
    alterarInstrumento(instrumento) {
      this.id = instrumento.id;
      this.nome = instrumento.nome;
      this.tombamento = instrumento.tombamento;
      this.caracteristica = instrumento.caracteristica;
      this.ano = instrumento.ano;
      this.marca = instrumento.marca;
      this.observacoes = instrumento.observacoes;
      this.componentes = instrumento.componentes;
    },
    async cadastrarInstrumento() {
      const instrumento = {
        nome: this.nome,
        caracteristica: this.caracteristica,
        tombamento: this.tombamento,
        ano: this.ano,
        marca: this.marca,
        componentes: this.componentes,
        observacoes: this.observacoes,
        empresa: this.empresa,
        notaFiscal: this.notaFiscal,
        valor: this.valor,
        data: this.data,
        origemDoacao: this.origem,
        observacoesDoacao: this.observacoesDoacao,
      };
      await salvar(instrumento).then((response) => {
        if (response.status == 200) this.voltar();
      });
    },
    async BuscarNomes() {
      await buscarNomes().then((response) => {
        if (response.status == 200) {
          response.data.forEach((element) => {
            this.nomes.push(element.nome);
          });
        }
      });
    },
    async BuscarCaracteristicas() {
      await buscarCaracteristicas().then((response) => {
        if (response.status == 200) {
          response.data.forEach((element) => {
            this.caracteristicas.push(element.nome);
          });
        }
      });
    },
    voltar() {
      this.$router.push("/instrumentos");
    },
  },
};
</script>
