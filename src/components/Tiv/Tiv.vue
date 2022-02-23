<template>
  <div>
    <ListarTiv />
  </div>
</template>

<script>
export default {
  name: "Tiv",
  components: {
    ListarTiv: () => //Listado General de los TIV
      import("components/Tiv/Tiv/ParaTramite/ListaTiv")
  }
};
</script>

<style scoped></style>
