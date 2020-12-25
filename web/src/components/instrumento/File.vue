<template>
  <v-file-input
    v-model="files"
    color="grey darken-3"
    counter
    :label="label"
    multiple
    placeholder="Insira o anexo"
    prepend-icon=""
    truncate-length="5"
    outlined
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
    disabled:Boolean
  },
  data: () => ({
    files: [],
  }),
  watch: {
    files: function() {
      if (this.files.length > 0) this.fileInit();
    },
  },
  methods: {
    fileInit() {
      this.$emit("file", this.files);
    },
  },
};
</script>
