<template>
  <layout-patrimonio modulo="Gestão musical" title="Cadastrar igreja">
    <form-igreja
      :igreja="igreja"
      :type="type"
      :readonly="readonly"
    />
  </layout-patrimonio>
</template>
<script>
import LayoutPatrimonio from "@/components/layouts/Patrimonio";
import FormIgreja from "@/components/igreja/Igreja";

export default {
  components: {
    LayoutPatrimonio,
    FormIgreja,
  },
  props: {
    igreja: Object,
    type: String,
    readonly: Boolean,
  },data() {
    return {
      title:""
    }
  },methods:{
    getTitle(value){
      this.title = value
    }
  }
};
</script>
