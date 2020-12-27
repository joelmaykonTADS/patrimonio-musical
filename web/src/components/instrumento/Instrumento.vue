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
          :readonly="disabled"
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
          :readonly="disabled"
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
          :readonly="disabled"
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
          :readonly="disabled"
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
          :readonly="disabled"
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
          :readonly="disabled"
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
          :readonly="disabled"
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
          :readonly="disabled"
        ></v-combobox>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="notaFiscal"
          color="grey"
          label="Nota fiscal da compra ou doação"
          placeholder="Número da nota fiscal"
          outlined
          :readonly="disabled"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="valor"
          color="grey"
          label="Valor"
          placeholder="Valor da compra"
          outlined
          :readonly="disabled"
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
          :readonly="disabled"
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
          :readonly="disabled"
        ></v-combobox>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="observacoesDoacao"
          color="grey"
          label="Observações"
          placeholder="Descrição sobre a doação"
          outlined
          :readonly="disabled"
        ></v-text-field>
      </v-col>
    </v-row>   
    <v-row class="d-flex justify-center form-row-top">
      <v-col cols="3">
        <file-input
          label="Termo do instrumento"
          :file="arquivoTermo"
          @file="getFileTermo"
          :disabled="disabled"
        ></file-input>
      </v-col>
      <v-col cols="3">
        <file-input
          label="Nota fiscal"
          :file="arquivoNotaFiscal"
          @file="getFileNotaFiscal"
          :disabled="disabled"
        ></file-input
      ></v-col>
      <v-col cols="3">
        <file-input
          label="Documento extra"
          :file="arquivoExtra"
          @file="getFileExtra"
          :disabled="disabled"
        ></file-input
      ></v-col>
    </v-row>
    <v-row class="d-flex justify-center py-auto">
      <v-btn
        class="mr-2"
        outlined
        rounded
        dark
        color="purple lighten-2"
        @click="voltar()"
      >
        <v-icon>mdi-arrow-left</v-icon>
        Voltar
      </v-btn>
      <v-btn
        v-if="type === 'edit' && edit === false"
        color="blue darken-4 mr-2"
        outlined
        rounded
        dark
        @click="setEdit()"
      >
        <v-icon>mdi-pencil</v-icon>
        Editar
      </v-btn>
      <v-btn
        v-if="edit === true && type === 'edit'"
        class="mr-2"
        color="red darken-4"
        outlined
        rounded
        dark
        @click="excluir"
      >
        <v-icon>mdi-trash-can-outline</v-icon>
        Excluir
      </v-btn>
      <v-btn
        v-if="edit === true || type !== 'edit'"
        color="green darken-4 mr-2"
        outlined
        rounded
        dark
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
import FileInput from "@/components/instrumento/File.vue";

export default {
  components: {
    FileInput,
  },
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
      arquivoTermo: [],
      arquivoNotaFiscal: [],
      arquivoExtra: [],
    };
  },
  watch: {
    nome: function(newValue) {
      if (newValue) this.nome = this.capitalizeFirstLetter(newValue);
    },
    caracteristica: function(newValue) {
      if (newValue) this.caracteristica = this.capitalizeFirstLetter(newValue);
    },
    marca: function(newValue) {
      if (newValue) this.marca = this.capitalizeFirstLetter(newValue);
    },
    empresa: function(newValue) {
      if (newValue) this.empresa = this.capitalizeFirstLetter(newValue);
    },
    origemDoacao: function(newValue) {
      if (newValue) this.origemDoacao = this.capitalizeFirstLetter(newValue);
    },
    observacoes: function(newValue) {
      if (newValue) this.observacoes = this.capitalizeFirstLetter(newValue);
    },
    observacoesDoacao: function(newValue) {
      if (newValue)
        this.observacoesDoacao = this.capitalizeFirstLetter(newValue);
    },
  },
  async created() {
    if (this.type === undefined) {
      this.voltar();
    } else {
      await this.AtualizarFormulário();
      this.alterarInstrumento();
      this.disabled = this.readonly;
    }
  },
  methods: {
    setEdit() {
      this.disabled = false;
      this.edit = true;
    },
    async alterarInstrumento() {
      const instrumento = this.$store.state.instrumento;
      if (instrumento) {
        this.id = instrumento.id;
        this.nome = instrumento.nome;
        this.tombamento = instrumento.tombamento;
        this.caracteristica = instrumento.caracteristica;
        this.ano = instrumento.ano;
        this.marca = instrumento.marca;
        this.observacoes = instrumento.observacoes;
        this.componente =
          instrumento.componentes && instrumento.componentes.split(",");
        this.empresa = instrumento.empresa;
        this.origemDoacao = instrumento.origemDoacao;
        this.notaFiscal = instrumento.notaFiscal;
        this.observacoesDoacao = instrumento.observacoesDoacao;
        this.valor = instrumento.valor;
        this.data = instrumento.data && instrumento.data.substr(0, 10);
        this.origemDoacao = instrumento.origemDoacao;
        await this.download(instrumento.arquivoTermo).then((response) => {
          this.arquivoTermo = [this.convertFile(response.data, "termo.pdf")];
        });
        await this.download(instrumento.arquivoNotaFiscal).then((response) => {
          this.arquivoNotaFiscal = [
            this.convertFile(response.data, "notaFiscal.pdf"),
          ];
        });
        await this.download(instrumento.arquivoExtra).then((response) => {
          this.arquivoExtra = [this.convertFile(response.data, "extra.pdf")];
        });
      }
    },
    convertFile(file, fileName) {
      var sampleArr = this.base64ToArrayBuffer(file);
      const fileData = new File([sampleArr], fileName, {
        type: "application/pdf",
      });
      return fileData;
    },
    base64ToArrayBuffer(base64) {
      var binaryString = window.atob(base64);
      var binaryLen = binaryString.length;
      var bytes = new Uint8Array(binaryLen);
      for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
      }
      return bytes;
    },    
    capitalizeFirstLetter: (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    async download(url) {
      let response;
      await post(
        `file/download`,
        { url },
        { responseType: "arraybuffer" }
      ).then((item) => {
        if (item.status === 200) {
          response = item.data;
        }
      });
      return response;
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
      if (this.edit === true) {
        this.edit = false;
        this.disabled = true;
      } else {
        this.$store.commit("setInstrumento", []);
        this.$router.push("/instrumentos");
      }
    },
    excluir() {
      remove("instrumentos", this.id).then((response) => {
        response.status === 204 && this.$router.push("/instrumentos");
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
</style>
