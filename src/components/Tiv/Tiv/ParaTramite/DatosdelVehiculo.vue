<template>
  <div>
    <q-card style="width: 600px; max-width: 120vw;">
      <q-markup-table dense>
        <thead>
          <tr>
            <td class="text-left text-h6">Vehículo a Documentar</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">Código</td>
            <td class="text-right">{{ info.resultado[0].co_vehicu }}</td>
          </tr>
          <tr>
            <td class="text-left">Placa</td>
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
            <td class="text-left">Año</td>
            <td class="text-right">{{ info.resultado[0].nu_anomod }}</td>
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
    ...mapActions("comercial", ["call_update_vehicu"])
  }
};
</script>

<style scoped></style>
