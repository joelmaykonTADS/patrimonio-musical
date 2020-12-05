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
        />
      </v-col>
      <v-col cols="3">
        <v-combobox
          v-model="caracteristica"
          :items="caracteristicas"
          color="grey"
          label="Característica"
          placeholder="Característica ou tonalidade"
          outlined
        />
      </v-col>
      <v-col cols="3">
        <v-combobox
          v-model="tombamento"
          :items="tombamentos"
          color="grey"
          maxlength="4"
          label="Tombamento"
          placeholder="Informe o número"
          outlined
        ></v-combobox>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center form-row-top">
      <v-col cols="3">
        <v-combobox
          v-model="ano"
          :items="anos"
          maxlength="4"
          color="grey"
          label="Ano"
          placeholder="Ano de fabricação"
          outlined
        />
      </v-col>
      <v-col cols="3">
        <v-combobox
          v-model="marca"
          :items="marcas"
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
    <v-row class="d-flex justify-center form-row-top">
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
    <v-row class="d-flex justify-center form-row-top">
      <v-col cols="3">
        <v-combobox
          v-model="empresa"
          :items="empresas"
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
    <v-row class="d-flex justify-center form-row-top">
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
    <v-row class="d-flex justify-center form-row-top">
      <v-col cols="9" class="text-center">
        <span class="body-1 font-weight-bold">Upload de documentos</span>
        <v-divider class="mt-3" />
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col cols="3">
        <upload label="Insira aqui o termo" />
      </v-col>
      <v-col cols="3">
        <upload label="Insira aqui a nota fiscal" />
      </v-col>
      <v-col cols="3">
        <upload label="insira aqui documento extra" />
      </v-col>
    </v-row>
    <v-row class="d-flex justify-end py-auto">
      <v-speed-dial
        bottom
        absolute
        right
        direction="top"
        open-on-hover
        transition="slide-y-reverse-transition"
      >
        <template v-slot:activator>
          <v-btn color="grey darken-3" dark fab>
            <v-icon> mdi-alert-circle-outline </v-icon>
          </v-btn>
        </template>
        <v-btn
          fab
          dark
          small
          color="red  lighten-1"
          @click="voltar()"
          v-if="type !== 'edit'"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn
          id="salvar"
          v-if="type !== 'edit'"
          fab
          dark
          small
          color="green lighten-1"
          @click="cadastrarInstrumento()"
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="indigo"
          v-if="type === 'edit'"
          @click="editStudents()"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn fab dark small color="red lighten-2" v-if="type === 'edit'">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-row>
  </v-container>
</template>
<script>
import { get, post } from "@/services/repository";
import upload from "@/components/instrumento/Files";

export default {
  components: { upload },
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
      arquivoTermo: [],
      arquivoNotaFiscal: [],
    };
  },
  watch: {
    arquivoNotaFiscal: function (value) {
      console.log(value);
    },
    nome: function (newValue) {
      this.nome = this.capitalizeFirstLetter(newValue);
    },
    caracteristica: function (newValue) {
      this.caracteristica = this.capitalizeFirstLetter(newValue);
    },
    marca: function (newValue) {
      this.marca = this.capitalizeFirstLetter(newValue);
    },
    empresa: function (newValue) {
      this.empresa = this.capitalizeFirstLetter(newValue);
    },
    origem: function (newValue) {
      this.origem = this.capitalizeFirstLetter(newValue);
    },
    observacoes: function (newValue) {
      this.observacoes = this.capitalizeFirstLetter(newValue);
    },
    observacoesDoacao: function (newValue) {
      this.observacoesDoacao = this.capitalizeFirstLetter(newValue);
    },
  },
  async created() {
    await this.AtualizarFormulário();
    this.alterarInstrumento(this.instrumento);
  },
  methods: {
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
    capitalizeFirstLetter: (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    async cadastrarInstrumento() {
      const dados = {
        instrumento: {
          nome: this.nome,
          caracteristica: this.caracteristica,
          tombamento: this.tombamento,
          ano: this.ano,
          marca: this.marca,
          aquisicao: "",
          naipe: "",
          componentes: this.componentes,
          observacoes: this.observacoes,
          empresa: this.empresa,
          notaFiscal: this.notaFiscal,
          valor: this.valor,
          data: this.data,
          origem: this.origem,
          observacoesDoacao: this.observacoesDoacao,
        },
        saveItem: "sim",
      };
      await post("instrumentos", dados).then(async (response) => {
        if (response.status == 200) this.voltar();
      });
    },

    async AtualizarFormulário() {
      const lista_campos_formulario = [
        { url: "nomes", lista: this.nomes, field: "nome" },
        { url: "caracteristicas", lista: this.caracteristicas, field: "nome" },
        { url: "tombamentos", lista: this.tombamentos, field: "numero" },
        { url: "anos", lista: this.anos, field: "numero" },
        { url: "marcas", lista: this.marcas, field: "nome" },
        { url: "empresas", lista: this.empresas, field: "nome" },
        { url: "origens", lista: this.origens, field: "nome" },
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
      this.$router.push("/instrumentos");
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
  margin-top: -40px;
}
</style>
