<template>
  <q-page>
    <Finanzas />
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  components: {
    Finanzas: () => import("components/Finanzas")
  }
};
</script>
