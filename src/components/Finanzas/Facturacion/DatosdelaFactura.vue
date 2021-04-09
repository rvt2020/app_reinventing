<template>
  <div>
    <div class="row">
      <div class="col"><u>Datos del Documento </u></div>
      
    </div>
    <!--    {{ info }}-->
    <q-card flat bordered>
      <q-markup-table dense>
        <tbody>
          <tr>
            <td class="text-left">Codigo</td>
            <td class="text-right">{{ info.operac[0].co_factur }}</td>
          </tr>
          <tr>
            <td class="text-left">Fecha Emisión</td>
            <td class="text-right">{{ info.operac[0].fe_emisio }}</td>
          </tr>
          <tr>
            <td class="text-left">Nro.Documento</td>
            <td class="text-right">{{ info.operac[0].nu_docume }}</td>
          </tr>
          <tr>
            <td class="text-left">Cliente</td>
            <td class="text-right">{{ info.operac[0].no_client }}</td>
          </tr>
          <tr>
            <td class="text-left">Tipo de Documento</td>
            <td class="text-right">{{ info.operac[0].no_docume }}</td>
          </tr>
          <tr>
            <td class="text-left">Base Imponible</td>
            <td class="text-right">{{ info.operac[0].im_basimp }}</td>
          </tr>
          <tr>
            <td class="text-left">IGV</td>
            <td class="text-right">{{ info.operac[0].im_totigv }}</td>
          </tr>
          <tr>
            <td class="text-left">Total</td>
            <td class="text-right">{{ info.operac[0].im_totfac }}</td>
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
  name: "DatosdelaFactura"
};
</script>

<style scoped></style>
