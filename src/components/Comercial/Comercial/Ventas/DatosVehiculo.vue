<template>
  <div>
    <div class="row">
      <div class="col"><u>Datos del Vehiculo </u></div>
      <div class="col text-right q-pa-xs">
        <!--<q-btn
          size="8px"
          @click="actualizar"
          color="primary"
          label="Actualizar"
        />--> 
      </div>
    </div>
    <!--    {{ info }}-->
    <q-card flat bordered>
      <q-markup-table dense>
        <tbody>
          <tr>
            <td class="text-left">Código</td>
            <td class="text-right">{{ info.resultado[0].co_vehicu }}</td>
          </tr>
          <tr>
            <td class="text-left">placa</td>
            <td class="text-right">{{ info.resultado[0].co_plaveh }}</td>
          </tr>
          <tr>
            <td class="text-left">Marca</td>
            <td class="text-right">{{ info.resultado[0].no_marveh }}</td>
          </tr>
          <tr>
            <td class="text-left">Modelo</td>
            <td class="text-right">{{ info.resultado[0].no_modveh }}</td>
          </tr>
          <tr>
            <td class="text-left">Versión</td>
            <td class="text-right">{{ info.resultado[0].no_verveh }}</td>
          </tr>
          <tr>
            <td class="text-left">Año</td>
            <td class="text-right">{{ info.resultado[0].nu_anofab }}</td>
          </tr>
          <tr>
            <td class="text-left">Color</td>
            <td class="text-right">{{ info.resultado[0].no_colveh }}</td>
          </tr>
          <tr>
            <td class="text-left">Chasis</td>
            <td class="text-right">{{ info.resultado[0].nu_serveh }}</td>
          </tr>
          <tr>
            <td class="text-left">Motor</td>
            <td class="text-right">{{ info.resultado[0].nu_motveh }}</td>
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
    ...mapActions("finanzas", ["call_update_factur"])
  }
};
</script>

<style scoped></style>
