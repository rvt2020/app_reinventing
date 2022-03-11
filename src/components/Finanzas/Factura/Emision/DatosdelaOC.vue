<template>
  <div>
    <div class="row">
      <div class="col"><u>Datos de la Factura </u></div>
      
    </div>
    <!--    {{ info }}-->
    <q-card flat bordered>
      <q-markup-table dense>
        <tbody>
          <tr>
            <td class="text-left">Operaciones</td>
            <td class="text-left">{{ info.operac[0].co_operac }}</td>
          </tr>
         <tr>
            <td class="text-left">Código</td>
            <td class="text-left">{{ info.operac[0].co_factur }}</td>
          </tr>
          <tr>
            <td class="text-left">Nro.Documento</td>
            <td class="text-left">
              <q-input v-model="info.operac[0].nu_docume" />
            </td>
          </tr>
          <tr> 
            <td class="text-left">Fecha Emisión</td>
            <td class="text-left">{{ info.operac[0].fe_emisio }}</td>
          </tr>
          <tr>
            <td class="text-left">Cliente</td>
            <td class="text-left">{{ info.operac[0].no_client }}</td>
          </tr>
          <tr>
            <td class="text-left">Tipo de Documento</td>
            <td class="text-left">{{ info.operac[0].no_docume }}</td>
          </tr>
          <tr>
            <td class="text-left">Estado</td>
            <td class="text-left">{{ info.operac[0].no_estado }}</td>
          </tr>
          <tr>
            <td class="text-left">Base Imponible</td>
            <td class="text-left">{{ info.operac[0].im_basimp }}</td>
          </tr>
          <tr>
            <td class="text-left">IGV</td>
            <td class="text-left">{{ info.operac[0].im_totigv }}</td>
          </tr>
          <tr>
            <td class="text-left">Total</td>
            <td class="text-left">{{ info.operac[0].im_pretot }}</td>
          </tr>
          <tr>
            <td class="text-left">Documento</td>
            <td class="text-left">
              <q-uploader
                auto-upload
                :url="urlimagen"
                label="Adjuntar Archivo"
                color="primary"
                text-color="black"
                no-thumbnails
                class="full-width"
                @uploaded="uploaded"
                />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>
    <div class="row">
        <div class="col-xs-2 col-md-2 q-pa-xs">
        <q-btn color="green" @click="actualizar" label="Actualizar" />
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  computed: {
    foo: {
      get() {
        return this.dataEdit;
      },
      set(value) {
        this.$store.commit("main/foo", value);
      }
    },
    urlimagen() {
      return `${process.env.Imagen_URL}/upload`;
    }
  },
  name: "DatosdelaOC",
  data() {
    return {
      options2: this.getMaterialesCategorias,
      tipo: 1,
      dataEdit: [],
      co_factur: "",
      nu_docume: "",
      no_emisor: "enviacorreos@reinventing.com.pe",
      no_recept: [
        "jose.bobadilla@reinventing.com.pe",
        "julio.mazuelos@reinventing.com.pe",
        "ada.mazuelos@reinventing.com.pe",
        "norma.cortavitarte@reinventing.com.pe",
        "jose.mazuelos@reinventing.com.pe",
        "joseph.carrion@reinventing.com.pe",
        "viviana.castro@reinventing.com.pe",
        "ericka.alvarado@reinventing.com.pe"
        ],
      no_asunto: "Factura Emitida - Venta de Autos y Motos",
      no_mensaj: "Se procedió con la emisión de la factura",
      no_client: `${this.info.operac[0].no_client}`,
      nu_docume: `${this.info.operac[0].nu_docume}`,
      co_operac: `${this.info.operac[0].co_operac}`
    };
  },
  methods: {
    ...mapActions("finanzas", [
      "call_update_factur_docume",
      "call_listar_operac_encont",
      "call_manten_produc_factur",
      "call_listar_detall_factur",
      "call_inform_factur",
      "call_catalogo_entfin",
      "call_catalogo_tipdoc",
      "call_amorti_factur",
      "call_listar_factur"
    ]),
    ...mapActions("correos", ["call_envia_correo"]),
    
    uploaded(files) {
      console.log("subio");
      console.log(files);
      const response = JSON.parse(files.xhr.response).name;
      this.$q.notify({
        message: response
      });
      console.log(response);
      this.$store.commit("example/arcadj", response);
    },
    
    async cerrar() {
      this.$q.loading.show();
      await this.call_listar_factur({
        fe_regdes: "",
        fe_reghas: "",
        no_client: "",
        nu_factur: "",
        ti_estado: "Por Cobrar",
        co_operac: "",
        ti_bandej: 2
      });
      this.$store.commit("finanzas/dialogDetalleOrden", false);
      this.$q.loading.hide();
    },

    async actualizar() {
      console.log("Entra");
      this.loadboton = true;

      await this.call_update_factur_docume({
        co_factur: `${this.info.operac[0].co_factur}`,
        nu_docume: `${this.info.operac[0].nu_docume}`,
        co_arcadj: `${this.$store.state.example.arcadj}`
      });

      if (this.info.operac[0].co_operac != 0) {
        await this.call_envia_correo(
          {
              "de": this.no_emisor,
              "para": this.no_recept,
              "asunto": this.no_asunto,
              "mensaje": this.no_mensaj,
              "html": `
                Buen día.<br><br>
                Se ha realizado la facturación Nro. ${this.info.operac[0].nu_docume} del cliente  ${this.no_client}.<br><br>
                La Operación es : OP00${this.co_operac} <br><br>
                Gracias`
            }
        );
      }

      await this.call_listar_factur({
            fe_regdes: "",
            fe_reghas: "",
            no_client: "",
            nu_factur: "",
            ti_estado: "Por Cobrar",
            co_operac: "",
            ti_bandej: 2
            });
      this.$store.commit("finanzas/dialogCrear", false);
      this.cerrar();
      // }
    }

  }
};
</script>

<style scoped></style>
