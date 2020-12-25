<template>
  <v-container>
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
          v-model="componente"
          :items="componentes"
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
          rows="1"
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
          slot="activator"
          color="grey"
          type="date"
          label="Data da compra ou doação"
          placeholder="Data da compra ou doação"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-combobox
          v-model="origemDoacao"
          :items="origens"
          color="grey"
          label="origem da doação"
          placeholder="origem da doação"
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
      <v-col cols="3">
        <file label="Termo do instrumento" @file="getFileTermo"></file>
      </v-col>
      <v-col cols="3">
        <file label="Nota fiscal" @file="getFileNotaFiscal"></file
      ></v-col>
      <v-col cols="3">
        <file label="Documento extra" @file="getFileExtra"></file
      ></v-col>
    </v-row>
    <v-row class="d-flex justify-end py-auto">
      <!-- <v-speed-dial
        bottom
        absolute
        right
        class="pb-10"
        direction="top"
        open-on-hover
        transition="slide-y-reverse-transition"
      >
        <template v-slot:activator>
          <v-btn color="orange" dark fab>
            <v-icon> mdi-alert-circle-outline </v-icon>
          </v-btn>
        </template>
        <v-btn fab dark small color="purple  lighten-2" @click="voltar()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn
          id="salvar"
          v-if="type !== 'edit'"
          fab
          dark
          small
          color="green lighten-1"
          @click="salvar()"
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="red lighten-2"
          v-if="type === 'edit'"
          @click="deletar(id)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="indigo"
          v-if="type === 'edit'"
          @click="salvar()"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-speed-dial> -->
      <v-row class="d-flex justify-center py-auto">
        <v-btn class="mr-2" outlined rounded dark color="purple lighten-2" @click="voltar()">
          <v-icon>mdi-arrow-left</v-icon>
          Voltar
        </v-btn>
        <v-btn color="green darken-4 mr-2" outlined rounded dark @click="salvar">
          <v-icon>mdi-check</v-icon>
          Salvar
        </v-btn>
      </v-row>
    </v-row>
  </v-container>
</template>
<script>
import { get, post, remove, put } from "@/services/repository";
import File from "@/components/instrumento/File.vue";

export default {
  components: {
    File,
  },
  props: { instrumento: Object, type: String, readonly: Boolean },
  data() {
    return {
      id: "",
      nome: "",
      caracteristica: "",
      tombamento: "",
      ano: "",
      marca: "",
      componente: [],
      componentes: [],
      observacoes: "",
      origemDoacao: "",
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
      arquivoExtra: [],
      arquivoTermoAnexo: [],
    };
  },
  watch: {
    nome: function(newValue) {
      this.nome = this.capitalizeFirstLetter(newValue);
    },
    caracteristica: function(newValue) {
      this.caracteristica = this.capitalizeFirstLetter(newValue);
    },
    marca: function(newValue) {
      this.marca = this.capitalizeFirstLetter(newValue);
    },
    empresa: function(newValue) {
      this.empresa = this.capitalizeFirstLetter(newValue);
    },
    origemDoacao: function(newValue) {
      this.origemDoacao = this.capitalizeFirstLetter(newValue);
    },
    observacoes: function(newValue) {
      this.observacoes = this.capitalizeFirstLetter(newValue);
    },
    observacoesDoacao: function(newValue) {
      this.observacoesDoacao = this.capitalizeFirstLetter(newValue);
    },
  },
  async created() {
    await this.AtualizarFormulário();
    this.alterarInstrumento(this.instrumento);
  },
  methods: {
    async alterarInstrumento(instrumento) {
      if (instrumento) {
        console.log(instrumento);
        this.id = instrumento.id;
        this.nome = instrumento.nome;
        this.tombamento = instrumento.tombamento;
        this.caracteristica = instrumento.caracteristica;
        this.ano = instrumento.ano;
        this.marca = instrumento.marca;
        this.observacoes = instrumento.observacoes;
        this.componente = instrumento.componentes.split(",");
        this.empresa = instrumento.empresa;
        this.origemDoacao = instrumento.origemDoacao;
        this.notaFiscal = instrumento.notaFiscal;
        this.observacoesDoacao = instrumento.observacoesDoacao;
        this.valor = instrumento.valor;
        this.data = instrumento.data.substr(0, 10);
        this.origemDoacao = instrumento.origemDoacao;
        //const termo = await download(instrumento.arquivoTermo);
        //this.arquivoTermoAnexo = termo;
      }
    },
    capitalizeFirstLetter: (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    async upload(arquivo) {
      let file = new FormData();
      let response;
      file.append("file", arquivo);
      await post(`file/upload`, file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((item) => {
        if (item.status === 200) {
          response = item.data.url;
        }
      });
      return response;
    },
    async salvar() {
      let pathTermo, pathNotaFiscal, pathExtra;
      await this.upload(this.arquivoTermo[0]).then((response) => {
        pathTermo = response;
      });
      await this.upload(this.arquivoNotaFiscal[0]).then((response) => {
        pathNotaFiscal = response;
      });
      await this.upload(this.arquivoExtra[0]).then((response) => {
        pathExtra = response;
      });
      //Salvar os Paths dos arquivos no instrumento
      // Adicoinar status, localização e encarregado regional e Local responsáveis
      const instrumento = {
        nome: this.nome,
        caracteristica: this.caracteristica,
        tombamento: this.tombamento,
        ano: this.ano,
        marca: this.marca,
        aquisicao: "",
        naipe: "",
        componentes: this.componente.join(),
        observacoes: this.observacoes,
        empresa: this.empresa,
        notaFiscal: this.notaFiscal,
        valor: this.valor,
        data: this.data,
        origemDoacao: this.origemDoacao,
        observacoesDoacao: this.observacoesDoacao,
        arquivoNotaFiscal: pathNotaFiscal,
        arquivoTermo: pathTermo,
        arquivoExtra: pathExtra,
      };
      if (this.type !== "edit") {
        await post(`instrumentos`, instrumento).then(async (response) => {
          if (response.status == 200) this.voltar();
        });
      } else {
        await put(`instrumentos/${this.id}`, instrumento).then(
          async (response) => {
            if (response.status == 200) this.voltar();
          }
        );
      }
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
        { url: "componentes", lista: this.componentes, field: "nome" },
      ];

      lista_campos_formulario.forEach(async (campo) => {
        await get(campo.url).then((response) => {
          if (response.status == 200) {
            response.data.forEach((dado) => {
              campo.lista.push(dado[campo.field]);
              console.log(campo.lista);
            });
          }
        });
      });
    },
    getFileTermo(e) {
      this.arquivoTermo = e;
    },
    getFileNotaFiscal(e) {
      this.arquivoNotaFiscal = e;
    },
    getFileExtra(e) {
      this.arquivoExtra = e;
    },
    voltar() {
      this.$router.push("/instrumentos");
    },
    deletar(id) {
      remove("/instrumentos", id);
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
</style>
