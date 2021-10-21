<template>
  <div>
    <q-card style="width: 590px; max-width: 100vw;">
      <q-markup-table dense>
        <thead>
          <tr>
            <td class="text-left text-h6">Datos del Vehículo</td>
          </tr>
        </thead>
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
            <td class="text-left">Precio de Vehiculo</td>
            <td class="text-right">{{ info.resultado[0].nu_serveh }}</td>
          </tr>
          <tr>
            <td class="text-left">Moneda</td>
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
    ...mapActions("comercial", ["call_update_vehicu"])
  }
};
</script>

<style scoped></style>
