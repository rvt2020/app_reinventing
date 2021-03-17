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
              <div class="text-h6">Datos de Proforma</div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="text-grey-8">
        <tr>
          <td class="text-left">Operación</td>
          <td class="text-right">{{ info[0].no_operac }}</td>
        </tr>
        <tr>
          <td class="text-left">Fecha</td>
          <td class="text-right">{{ info[0].fe_regist }}</td>
        </tr>
        <tr>
          <td class="text-left">Neto</td>
          <td class="text-right">{{ info[0].im_totser }}</td>
        </tr>
        <tr>
          <td class="text-left">IGV</td>
          <td class="text-right">{{ info[0].im_basimp }}</td>
        </tr>
        <tr>
          <td class="text-left">Total</td>
          <td class="text-right">{{ info[0].im_totpag }}</td>
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
