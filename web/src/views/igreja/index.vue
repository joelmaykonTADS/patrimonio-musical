<template>
  <layout-patrimonio modulo="Gestão musical" title="Igrejas">
    <table-igreja />
  </layout-patrimonio>
</template>
<script>
import LayoutPatrimonio from "@/components/layouts/Patrimonio";
import TableIgreja from "@/components/igreja/IgrejaList";

export default {
  components: {
    LayoutPatrimonio,
    TableIgreja,
  },
};
</script>
