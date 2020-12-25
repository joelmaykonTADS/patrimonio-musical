<template>
  <router-link
    :to="{
      name: nameComponent,
      params: { instrumento: instrumento, type: type, readonly: readonly },
    }"
  >
    <v-btn text>
      <v-icon small class="mr-2"> mdi-pencil </v-icon>
      Editar</v-btn
    >
  </router-link>
</template>
<script>
export default {
  props: {
    instrumento: Object,
  },
  data() {
    return {
      type: "edit",
      readonly: true,
      nameComponent: "InstrumentoEdit",
    };
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>