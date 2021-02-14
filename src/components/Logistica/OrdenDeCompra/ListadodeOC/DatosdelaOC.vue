<template>
  <div>
    <div class="row">
      <div class="col"><u>Datos de la OC </u></div>
      <div class="col text-right q-pa-xs">
        <q-btn
          size="8px"
          @click="actualizar"
          color="primary"
          label="Actualizar"
        />
      </div>
    </div>
    <!--    {{ info }}-->
    <q-card flat bordered>
      <q-markup-table dense>
        <tbody>
          <tr>
            <td class="text-left">Nro. O/C</td>
            <td class="text-right">{{ info.operac[0].co_ordcom }}</td>
          </tr>
          <tr>
            <td class="text-left">Fecha Registro</td>
            <td class="text-right">{{ info.operac[0].fe_ordcom }}</td>
          </tr>
          <tr>
            <td class="text-left">Proveedor</td>
            <td class="text-right">{{ info.operac[0].no_provee }}</td>
          </tr>
          <tr>
            <td class="text-left">Tipo de Compra</td>
            <td class="text-right">{{ info.operac[0].no_tippro }}</td>
          </tr>
          <tr>
            <td class="text-left">Moneda</td>
            <td class="text-right">{{ info.operac[0].no_moneda }}</td>
          </tr>
          <tr>
            <td class="text-left">¿Con IGV?</td>
            <td class="text-right">{{ info.operac[0].no_conigv }}</td>
          </tr>
          <tr>
            <td class="text-left">Importe</td>
            <td class="text-right">{{ info.operac[0].im_pretot }}</td>
          </tr>
          <tr>
            <td class="text-left">Tipo de Pago</td>
            <td class="text-right">{{ info.operac[0].ti_compra }}</td>
          </tr>
          <tr>
            <td class="text-left">Motivo Compra</td>
            <td class="text-right">{{ info.operac[0].no_motcom }}</td>
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
    ...mapActions("logisticas", ["call_update_ordcom"]),
    async actualizar() {
      await this.call_update_ordcom({
        nu_ordcom: this.nu_ordcom,
        co_provee: this.co_provee,
        co_tippro: this.co_tippro,
        co_moneda: this.co_moneda,
        ti_compra: this.ti_compra,
        no_motcom: this.no_motcom,
        co_conigv: this.co_conigv
      });
    }
  }
};
</script>

<style scoped></style>
