<template>
  <div><v-btn @click="signIn">entrar</v-btn></div>
</template>
<script>
export default {
  methods: {
    signIn() {
      this.$router.push("/instrumentos");
    },
  },
};
</script>
