<template>
  <layout-patrimonio modulo="Módulo Patrimônio" :title="title">
    <form-instrumento
      :instrumento="instrumento"
      :type="type"
      :readonly="readonly"
    />
  </layout-patrimonio>
</template>
<script>
import LayoutPatrimonio from "@/components/layouts/Patrimonio";
import FormInstrumento from "@/components/instrumento/Instrumento";

export default {
  components: {
    LayoutPatrimonio,
    FormInstrumento,
  },
  props: {
    instrumento: Object,
    type: String,
    readonly: Boolean,
  },data() {
    return {
      title:"Cadastrar instrumento"
    }
  }
};
</script>
