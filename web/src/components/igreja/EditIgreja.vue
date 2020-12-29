<template>
  <router-link
    :to="{
      name: nameComponent,
      params: { type: type, readonly: readonly },
    }"
  >
    <v-btn text @click="setInstrumento" elevation="0">
      <v-icon small class="mr-2" color="grey darken-2"> mdi-eye </v-icon>
      <span class="grey--text text--darken-2 font-weight-bold">Visualizar</span></v-btn
    >
  </router-link>
</template>
<script>
export default {
  props: {
    igreja: Object,
  },
  data() {
    return {
      type: "edit",
      readonly: true,
      nameComponent: "IgrejaEdit",
    };
  },
  methods: {
    setInstrumento() {
      this.$store.commit("setIgreja", this.igreja);
    },
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}

.v-btn {
  text-transform: none;
  font-size: 15px;
}
</style>
