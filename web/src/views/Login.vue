<template>
  <div><v-btn @click="signIn" elevation="0">entrar</v-btn></div>
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
