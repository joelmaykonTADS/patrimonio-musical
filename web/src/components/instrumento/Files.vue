<template>
  <v-hover>
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 3 : 1}`"
      class="mx-auto"
      height="200px"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
            {{ documento }}
          </div>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile>
          <img
            alt="user"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png"
          />
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
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
          >
          </file-pond>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-hover>
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
  props: {
    label: String,
    documento: String,
  },
  components: {
    FilePond,
  },
  data() {
    return {
      file: [],
      color: "grey darken-4",
    };
  },
  watch: {
    file: function() {
      console.log(this.file.length);
      if (this.file.length > 0) this.handleFilePondInit();
    },
  },
  methods: {
    // Fazer o upload para o firebase mas se não selecionar salvar deletar do firebase
    // Caso feche a página deletar do firebase
    handleFilePondInit: function() {
      const arquivo = this.$refs.pond.getFiles();
      this.color = "blue darken-4";
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
