<template>
  <q-page>
    <Logistica />
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  components: {
    Logistica: () => import("components/Logistica/Logistica")
  }
};
</script>
