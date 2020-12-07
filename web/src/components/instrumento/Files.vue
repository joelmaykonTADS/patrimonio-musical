<template>
  <v-container>
    <v-hover>
      <v-card
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 3 : 1}`"
        class="mx-auto"
        color="grey lighten-2"
      >
        <v-card-text>
          <v-row class="d-flex text-center">
            <v-col cols="12">
              <v-icon large color="grey darken-2"> mdi-cloud-upload </v-icon>
            </v-col>
          </v-row>
          <file-pond
            name="test"
            ref="pond"
            style="cursor: pointer"
            class-name="my-pond"
            accepted-file-types="application/pdf"
            :label-idle="label"
            v-model="file"
            v-bind:files="file"
            labelFileTypeNotAllowed="NÃO ACEITO"
            fileValidateTypeLabelExpectedTypes="É esperado um PDF"
            v-on:init="handleFilePondInit"
          >
          </file-pond>
        </v-card-text>
      </v-card>
    </v-hover>
  </v-container>
</template>

<script>
// Import FilePond
import vueFilePond from "vue-filepond";
// Import plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js";
import FilePondPluginFilePoster from "filepond-plugin-file-poster";

// Import styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css";
// Create FilePond component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginFilePoster
);
export default {
  props: { label: String },
  components: {
    FilePond,
  },
  data() {
    return {
      file: [],
    };
  },
  watch: {
    file: function () {
      this.file && this.handleFilePondInit();
    },
  },
  methods: {
    // Fazer o upload para o firebase mas se não selecionar salvar deletar do firebase
    // Caso feche a página deletar do firebase
    handleFilePondInit: function () {
      const arquivo = this.$refs.pond.getFiles();
      this.$emit("arquivo", arquivo);
    },
  },
};
</script>

<style>
.mouse-open {
  cursor: pointer;
}

/* the color of the focus ring */
.filepond--file-action-button:hover,
.filepond--file-action-button:focus {
  box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.9);
}

.filepond--root {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
</style>