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
      import("components/Finanzas/Factura/ListadodeOC")
  }
};
</script>

<style scoped></style>
