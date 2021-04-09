<template>
  <div>
    <ListardeFactura />
  </div>
</template>

<script>
export default {
  name: "Facturacion",
  components: {
    ListardeOC: () =>
      import("components/Facturacion/Facturacion/ListadodeFacturas/ListadodeFactura")
  }
};
</script>

<style scoped></style>
