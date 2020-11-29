<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="3">
        <v-combobox
          v-model="nome"
          :items="nomes"
          item-text="data"
          item-value="data"
          color="grey"
          item-color="grey darken-2"
          label="Nome do instrumento"
          placeholder="Informe o nome"
          outlined
        >
          <template v-slot:item="{ item }">
            {{ item.data }}
            <v-spacer></v-spacer>
            <v-list-item-action @click.stop>
              <v-btn icon @click="remove('nomes', 'nome', item.id, nomes)">
                <v-icon>{{ "mdi-delete" }}</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-combobox>
      </v-col>
      <v-col cols="3">
        <v-combobox
          v-model="caracteristica"
          :items="caracteristicas"
          item-text="data"
          item-value="data"
          color="grey"
          label="Característica"
          placeholder="Característica ou tonalidade"
          outlined
        ></v-combobox>
      </v-col>
      <v-col cols="3">
        <v-combobox
          v-model="tombamento"
          :items="tombamentos"
          item-text="data"
          item-value="data"
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
          :items="anos"
          item-text="data"
          item-value="data"
          color="grey"
          label="Ano"
          placeholder="Ano de fabricação"
          outlined
        ></v-combobox>
      </v-col>
      <v-col cols="3">
        <v-combobox
          v-model="marca"
          :items="marcas"
          item-text="data"
          item-value="data"
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
          :items="empresas"
          item-text="data"
          item-value="data"
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
          :items="origens"
          item-text="data"
          item-value="data"
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
import { get, post, remove } from "@/services/repository";

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
      tombamentos: [],
      anos: [],
      marcas: [],
      origens: [],
      empresas: [],
      editing: "",
      editingIndex: -1,
    };
  },
  watch: {
    nome: function (newValue) {
     
      this.nome = this.capitalizeFirstLetter(newValue.data);
    },
    caracteristica: function (newValue) {
      this.caracteristica = this.capitalizeFirstLetter(newValue.data);
    },
    marca: function (newValue) {
      this.marca = this.capitalizeFirstLetter(newValue.data);
    },
    empresa: function (newValue) {
      this.empresa = this.capitalizeFirstLetter(newValue.data);
    },
    origem: function (newValue) {
      this.origem = this.capitalizeFirstLetter(newValue.data);
    },
    observacoes: function (newValue) {
      this.observacoes = this.capitalizeFirstLetter(newValue.data);
    },
    observacoesDoacao: function (newValue) {
      this.observacoesDoacao = this.capitalizeFirstLetter(newValue.data);
    },
  },
  async created() {
    await this.AtualizarFormulário();
    this.alterarInstrumento(this.instrumento);
  },
  methods: {
    async remove(url, field, id, lista) {
      console.log(url, field, id, lista);
      await remove(url, id).then(async (response) => {
        if (response.status == 200) {
          await get(url).then((response) => {
            if (response.status == 200) {
              lista.lenght = 0;
              response.data.forEach((element) => {
                lista.push({ id: element.id, data: element[field] });
                console.log(lista)
              });
            }
          });
        }
      });
    },
    capitalizeFirstLetter: (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    alterarInstrumento(instrumento) {
      if (instrumento) {
        this.id = instrumento.id;
        this.nome = instrumento.nome;
        this.tombamento = instrumento.tombamento;
        this.caracteristica = instrumento.caracteristica;
        this.ano = instrumento.ano;
        this.marca = instrumento.marca;
        this.observacoes = instrumento.observacoes;
        this.componentes = instrumento.componentes;
        this.empresa = instrumento.empresa;
        this.origem = instrumento.origem;
      }
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
        origem: this.origem,
        observacoesDoacao: this.observacoesDoacao,
      };
      console.log(instrumento);
      await post("instrumentos", instrumento).then((response) => {
        if (response.status == 200) this.voltar();
      });
    },
    async AtualizarFormulário() {
      const lista = [
        { url: "nomes", lista: this.nomes, field: "nome" },
        { url: "caracteristicas", lista: this.caracteristicas, field: "nome" },
        { url: "tombamentos", lista: this.tombamentos, field: "numero" },
        { url: "anos", lista: this.anos, field: "numero" },
        { url: "marcas", lista: this.marcas, field: "nome" },
        { url: "empresas", lista: this.empresas, field: "nome" },
        { url: "origens", lista: this.origens, field: "nome" },
      ];
      lista.forEach(async (item) => {
        await get(item.url).then((response) => {
          if (response.status == 200) {
            response.data.forEach((element) => {
              item.lista.push({ id: element.id, data: element[item.field] });
            });
          }
        });
      });
    },

    voltar() {
      this.$router.push("/instrumentos");
    },
  },
};
</script>
