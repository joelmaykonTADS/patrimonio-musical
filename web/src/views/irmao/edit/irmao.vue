<template>
  <layout-patrimonio modulo="Gestão musical" title="Editar irmão">
    <form-irmao
      :irmao="irmao"
      :type="type"
      :readonly="readonly"
    />
  </layout-patrimonio>
</template>
<script>
import LayoutPatrimonio from "@/components/layouts/Patrimonio";
import FormIrmao from "@/components/irmao/Irmao";

export default {
  components: {
    LayoutPatrimonio,
    FormIrmao,
  },
  props: {
    irmao: Object,
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
