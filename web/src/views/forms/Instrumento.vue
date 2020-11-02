<template>
  <layout-patrimonio modulo="Módulo Patrimônio" title="Cadastro do instrumento">
    <form-instrumento
      :instrumento="instrumento"
      :type="type"
      :readonly="readonly"
    />
  </layout-patrimonio>
</template>
<script>
import LayoutPatrimonio from "@/components/layouts/Patrimonio";
import FormInstrumento from "@/components/forms/Instrumento";

export default {
  components: {
    LayoutPatrimonio,
    FormInstrumento,
  },
  props: {
    instrumento: Object,
    type: String,
    readonly: Boolean,
  },
};
</script>
