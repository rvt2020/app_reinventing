<template>
  <div>
    <ListarVehiculos />
  </div>
</template>

<script>
export default {
  name: "Comercial",
  components: {
    ListarVehiculos: () => //ListardeOC
      import("components/Comercial/Comercial/Ventas/ListaVehiculos")
  }
};
</script>

<style scoped></style>
