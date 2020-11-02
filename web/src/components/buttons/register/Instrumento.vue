<template>
  <router-link
    :to="{
      name: nameComponent,
      params: { type: type, readonly: readonly },
    }"
  >
    <v-btn color="grey" class="white--text">Cadastrar instrumento</v-btn>
  </router-link>
</template>
<script>
export default {
  data() {
    return {
      type: "register",
      readonly: false,
      nameComponent: "RegisterInstrumento",
    };
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
