<template>
  <layout-patrimonio modulo="Módulo Patrimônio" title="Lista de instrumentos">
    <table-instrumento />
  </layout-patrimonio>
</template>
<script>
import LayoutPatrimonio from "@/components/layouts/Patrimonio";
import TableInstrumento from "@/components/instrumento/InstrumentoList";

export default {
  components: {
    LayoutPatrimonio,
    TableInstrumento,
  },
};
</script>
