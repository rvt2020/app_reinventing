<template>
  <div>
    <div class="row">
      <div class="col"><u>Datos de la Factura </u></div>
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
            <td class="text-right">{{ info.operac[0].co_factur }}</td>
          </tr>
          <tr>
            <td class="text-left">Nro.Documento</td>
            <td class="text-right">{{ info.operac[0].nu_docume }}</td>
          </tr>
          <tr>
            <td class="text-left">Fecha Emisión</td>
            <td class="text-right">{{ info.operac[0].fe_emisio }}</td>
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
            <td class="text-left">Estado</td>
            <td class="text-right">{{ info.operac[0].no_estado }}</td>
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
            <td class="text-right">{{ info.operac[0].im_pretot }}</td>
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
  name: "DatosdelaOC",
  methods: {
    ...mapActions("finanzas", ["call_update_factur"]),
    async actualizar() {
      await this.call_update_factur({
        co_factur: this.co_factur,
        ti_estado: this.ti_estado
      });
    }
  }
};
</script>

<style scoped></style>
