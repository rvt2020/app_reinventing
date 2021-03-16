<template>
  <div class="q-pa-xs">
    <q-markup-table
      dense
      color="primary"
      card-class=""
      table-class="text-grey-8"
      table-header-class="text-brown"
    >
      <thead class="bg-amber-1 text-brown">
        <tr>
          <th colspan="5">
            <div class="row no-wrap items-center">
              <div class="text-h6">Vehículo</div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="text-grey-8">
        <tr>
          <td class="text-left">Placa</td>
          <td class="text-right">{{ info[0].co_plaveh }}</td>
        </tr>
        <tr>
          <td class="text-left">Marca</td>
          <td class="text-right">{{ info[0].no_marveh }}</td>
        </tr>
        <tr>
          <td class="text-left">Modelo</td>
          <td class="text-right">{{ info[0].no_modveh }}</td>
        </tr>
        <tr>
          <td class="text-left">Versión</td>
          <td class="text-right">{{ info[0].no_verveh }}</td>
        </tr>
        <tr>
          <td class="text-left">Año</td>
          <td class="text-right">{{ info[0].nu_anomod }}</td>
        </tr>
        <tr>
          <td class="text-left">Color</td>
          <td class="text-right">{{ info[0].no_colveh }}</td>
        </tr>
        <tr>
          <td class="text-left">Chasis</td>
          <td class="text-right">{{ info[0].nu_serveh }}</td>
        </tr>
        <tr>
          <td class="text-left">Motor</td>
          <td class="text-right">{{ info[0].nu_motveh }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Array,
      default: [
        function() {
          return [
            {
              co_operac: "",
              no_operac: "",
              fe_regist: "",
              co_perreg: "",
              no_perreg: "",
              ti_estope: "",
              no_estope: "",
              im_serint: "",
              im_serext: "",
              im_totmat: "",
              im_totser: ""
            }
          ];
        }
      ]
    },
    titulo: {
      type: String
    },
    hideheader: {
      type: Boolean
    },
    hidebottom: {
      type: Boolean
    }
  },
  name: "Tabla"
};
</script>

<style scoped></style>
