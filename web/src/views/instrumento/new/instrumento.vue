<template>
  <layout-patrimonio modulo="Módulo Patrimônio" title="Cadastrar instrumento">
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
      title:""
    }
  },methods:{
    getTitle(value){
      console.log(value)
      this.title = value
    }
  }
};
</script>
