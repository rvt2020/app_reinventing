<template>
  <div>
    <ListardeOC />
  </div>
</template>

<script>
export default {
  name: "Logistica",
  components: {
    ListardeOC: () =>
      import("components/Logistica/OrdenDeCompra/ListadodeOC/ListadodeOC")
  }
};
</script>

<style scoped></style>
