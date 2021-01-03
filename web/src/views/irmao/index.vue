<template>
  <layout-patrimonio modulo="Gestão musical" title="Irmãos">
    <table-irmaos />
  </layout-patrimonio>
</template>
<script>
import LayoutPatrimonio from "@/components/layouts/Patrimonio";
import TableIrmaos from "@/components/irmao/IrmaoList";

export default {
  components: {
    LayoutPatrimonio,
    TableIrmaos,
  },
};
</script>
