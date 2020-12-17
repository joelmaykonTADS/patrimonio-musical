<template>
  <v-card
    cslot-scope="{ hover }"
    :class="`elevation-${hover ? 3 : 1}`"
    class="mx-auto"
    height="200px"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          {{documento}}
        </div>
        <v-list-item-title class="headline mb-1">
          Termo {{ tombamento }}
        </v-list-item-title>
      </v-list-item-content>

      <v-list-item-avatar tile>
        <img
          alt="user"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png"
        />
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        color="indigo"
        rounded
        :href="link"
        target="_blank"
        :disabled="disabled"
      >
        Visualizar
        <v-icon left>mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    file: Array,
    tombamento: String,
    documento:String
  },
  data() {
    return {
      link: "",
      disabled: true,
    };
  },
  watch: {
    file: function() {
      this.link = this.file[0].url;
      this.disabled = false;
    },
  },
};
</script>

<style></style>
