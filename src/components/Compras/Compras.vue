<template>
  <div>
    <ListarCompras />
  </div>
</template>

<script>
export default {
  name: "Compras",
  components: {
    ListarCompras: () => //ListardeOC
      import("components/Compras/Compras/OrdenCompra/ListaCompras")
  }
};
</script>

<style scoped></style>
