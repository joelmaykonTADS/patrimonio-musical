<template>
  <v-hover>
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 8 : 2}`"
      height="100px"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline">
            {{ documento }}
          </div>
          <v-row class="pl-3">
            <v-btn outlined rounded small
              ><v-icon>mdi-upload-outline</v-icon>upload</v-btn
            >
          </v-row>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile height="48">
          <img
            alt="user"
            contain
            src="https://coaph.com.br/novo/wp-content/uploads/2019/03/pdfs-512.png"
          />
        </v-list-item-avatar>
      </v-list-item>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    label: String,
    documento: String,
  },
  components: {},
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
