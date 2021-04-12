<template>
  <q-page>
    <Logistica />
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  components: {
    Finanzas: () => import("components/Finanzas/Finanzas")
  }
};
</script>
