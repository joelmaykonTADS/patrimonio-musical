<template>
  <v-file-input
    v-model="files"
    color="grey darken-3"
    counter
    :label="label"
    multiple
    :loading="loading"
    placeholder="Insira o anexo"
    prepend-icon=""
    truncate-length="10"
    outlined
    @click:append-outer="download(files)"
    :append-outer-icon="type === 'edit'?'mdi-file-download-outline':''"
    :messages="messages"
    accept="application/pdf"
    :show-size="1000"
    :disabled="disabled"
  >
    <template v-slot:selection="{ index, text }">
      <v-chip v-if="index < 2" color="grey darken-3" dark label>
        {{ text }}
      </v-chip>
      <span
        v-else-if="index === 2"
        class="overline grey--text text--darken-3 mx-2"
      >
        +{{ files.length - 2 }} File(s)
      </span>
    </template>
  </v-file-input>
</template>
<script>
export default {
  name: "file",
  props: {
    label: String,
    disabled: Boolean,
    file: Array,
    type:String
  },
  data() {
    return {
      files: [],
      loading: this.disabled,
      messages: "Buscando ...",
    };
  },
  created(){
    console.log(this.disabled)
  },
  watch: {
    files: function() {
      if (this.files.length > 0) {
        this.fileInit();
        this.loading = false;
        this.messages = "";
      }
    },
    file: function() {
      this.files = this.file;
    },
  },
  methods: {
    fileInit() {
      this.$emit("file", this.files);
    },
    download(fileData) {
      var fileURL = URL.createObjectURL(fileData[0]);
      window.open(fileURL, "_blank");
    },
  },
};
</script>
