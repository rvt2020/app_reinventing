<template>
  <div>
    <ListardeOC />
  </div>
</template>

<script>
export default {
  name: "Finanzas",
  components: {
    ListardeOC: () =>
      import("components/Finanzas/Factura/Emision/ListadodeOC")
  }
};
</script>

<style scoped></style>
