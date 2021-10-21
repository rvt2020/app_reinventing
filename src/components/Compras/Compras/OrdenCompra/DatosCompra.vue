<template>
  <div>
    <q-card style="width: 600px; max-width: 120vw;">
      <q-markup-table dense>
        <thead>
          <tr>
            <td class="text-left text-h6">Datos de Orden de Compra</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">Nro. O/C</td>
            <td class="text-right">{{ info.resultado[0].co_ordcom }}</td>
          </tr>
          <tr>
            <td class="text-left">Identificador</td>
            <td class="text-right">{{ info.resultado[0].co_comart }}</td>
          </tr>
          <tr>
            <td class="text-left">Fecha Registro</td>
            <td class="text-right">{{ info.resultado[0].fe_ordcom }}</td>
          </tr>
          <tr>
            <td class="text-left">Proveedor</td>
            <td class="text-right">{{ info.resultado[0].no_provee }}</td>
          </tr>
          <tr>
            <td class="text-left">Moneda</td>
            <td class="text-right">{{ info.resultado[0].no_moneda }}</td>
          </tr>
          <tr>
            <td class="text-left">¿Con IGV?</td>
            <td class="text-right">{{ info.resultado[0].no_conigv }}</td>
          </tr>
          <tr>
            <td class="text-left">Importe</td>
            <td class="text-right">{{ info.resultado[0].im_pretot }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  name: "DatosVehiculo",
  methods: {
    ...mapActions("comercial", ["call_update_vehicu"])
  }
};
</script>

<style scoped></style>
