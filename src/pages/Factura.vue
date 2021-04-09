<template>
  <q-page>
    <Factura />
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  components: {
    Facturacion: () => import("components/Facturacion/Facturaciones")
  }
};
</script>
