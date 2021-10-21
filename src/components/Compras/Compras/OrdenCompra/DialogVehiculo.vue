<template>
  <div class="col-xs-12 col-md-6 q-pa-xs">
    <q-card >
      <!--      {{ get_inform_ordcom }}-->
      <q-bar class="bg-primary text-white">
        NUEVO VEHÍCULO - COMPRA
      </q-bar>
      
      <!-- VENTANA 1 --> 
      <q-card-section>
        <!-- INFORMACIÓN DE LOS DATOS DE LA OC--> 
        <div class="row">
          <div class="col-xs-12 col-md-12 q-pa-xs">
            <DatosCompra :info="get_inform_compra_art" />
          </div>
        </div>
      </q-card-section>

      <!-- VENTANA 2 --> 
      <q-card-section>
        <!-- INFORMACIÓN DEL VEHICULO--> 
        <div class="col-12">
          <q-card style="width: 600px; max-width: 120vw;">
            <q-markup-table dense>
              <!-- TITULO DE FORMULARIO -->
              <thead>
                <tr>
                  <td class="text-left text-h6">Datos del Vehículo</td>
                </tr>
              </thead>
              <tbody>
                  <!-- TIPO DE VEHICULO -->
                  <tr>
                    <td class="text-left">Tipo Vehículo</td>
                    <td style="width: 300px;">
                      <q-select
                        filled
                        dense
                        v-model="tipvehicu"
                        :options="get_catalogo_tctipveh.resultado"
                        option-label="no_tipveh"
                        option-value="ti_vehicu"
                        emit-value
                        map-options
                      />    
                    </td>
                  </tr>
                  <!-- REGISTRO MARCA -->
                  <tr>
                    <td class="text-left">Marca</td>
                    <td style="width: 300px;">
                      <q-select
                        filled
                        dense
                        @input="traerModelos"
                        v-model="mar_veh"
                        :options="getMarcas"
                        option-label="no_marveh"
                        option-value="co_marveh"
                        emit-value
                        map-options
                      />    
                    </td>
                  </tr>
                  <!-- REGISTRO MODELO -->
                  <tr>
                    <td class="text-left">Modelo</td>
                    <td style="width: 300px;">
                      <q-select
                        filled
                        dense
                        v-model="mod_veh"
                        :options="getModelosFilterMarca"
                        option-label="no_modveh"
                        option-value="co_modveh"
                        emit-value
                        map-options
                      /> 
                    </td>
                  </tr>
                  <!-- REGISTRO AÑO -->
                  <tr>
                    <td class="text-left">Año</td>
                    <td style="width: 150px;">
                      <q-input
                        dense
                        ref="anio"
                        filled
                        v-model="anio"
                        maxlength="4"
                        type="number"
                        lazy-rules
                        :rules="[
                          (val) => (val && val.length > 0) || 'Campo obligatorio',
                        ]"
                      />
                    </td>
                  </tr>
                  <!-- REGISTRO COLOR -->
                  <tr>
                    <td class="text-left">Color</td>
                    <td style="width: 150px;">
                      <q-input
                        dense
                        ref="color"
                        filled
                        v-model="color"
                        lazy-rules
                        :rules="[
                          (val) => (val && val.length > 0) || 'Campo obligatorio',
                        ]"
                      />
                    </td>
                  </tr>
                  <!-- REGISTRO CHASIS -->
                  <tr>
                    <td class="text-left">Chasis</td>
                    <td style="width: 150px;">
                      <q-input
                        dense
                        ref="chasis"
                        filled
                        v-model="chasis"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) || 'Campo obligatorio',
                        ]"
                      />
                    </td>
                  </tr>
                  <!-- REGISTRO MOTOR -->
                  <tr>
                    <td class="text-left">Motor</td>
                    <td style="width: 150px;">
                      <q-input
                        dense
                        ref="Motor"
                        filled
                        v-model="motor"
                        lazy-rules
                        :rules="[
                          (val) => (val && val.length > 0) || 'Campo obligatorio',
                        ]"
                      />
                    </td>
                  </tr>
              </tbody>    
            </q-markup-table>
          </q-card>
        </div>
      </q-card-section>

      <!-- VENTANA 3 --> 
      <q-card-section>
        <!-- INFORMACIÓN DE LA FACTURA Y FECHA DE EMISIóN--> 
        <div class="col-12">
          <q-card style="width: 600px; max-width: 120vw;">
            <q-markup-table dense>
              <!-- TITULO DE FORMULARIO -->
              <thead>
                <tr>
                  <td class="text-left text-h6">Datos de  la Factura</td>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <!-- REGISTRO DE FECHA DE EMISIÓN -->
                    <td class="text-left">Fecha de Emisión</td>
                    <td style="width: 300px;">
                      <q-input
                        filled
                        dense
                        v-model="fechadeemision"
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              ref="qDateProxy"
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date v-model="fechadeemision" mask="YYYY-MM-DD">
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Close"
                                    color="primary"
                                    flat
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </td>
                  </tr>
                  <!-- REGISTRO NRO DE DOCUMENTO -->
                  <tr>
                    <td class="text-left">Número de Factura</td>
                    <td style="width: 150px;">
                      <q-input
                        dense
                        v-model="numerodocumento"
                        filled
                        type="text"
                        :rules="[
                          (val) => (val && val.length > 0) || 'Campo obligatorio',
                        ]"
                      />
                    </td>
                  </tr>
                  <!-- REGISTRO DE ADJUNTAR LA FACTURA  -->
                  <tr>
                    <td class="text-left">Adjunrar Factura</td>
                    <td style="width: 100px;">
                      <q-uploader
                        auto-upload
                        :url="urlimagen"
                        color="primary"
                        text-color="whrite"
                        no-thumbnails
                        class="full-width"
                        @uploaded="uploaded"
                      />
                    </td>
                  </tr>
                  
                  <tr>


                  </tr>
              </tbody>    
            </q-markup-table>
          </q-card>
        </div>
      </q-card-section>

      <!-- VENTANA 4 --> 
      <q-card-section>
        <!-- INFORMACIÓN DE LA MONEDA E IMPORTE A VENDER --> 
        <div class="col-12">
          <q-card style="width: 600px; max-width: 120vw;">
            <q-markup-table dense>
              <!-- TITULO DE FORMULARIO -->
              <thead>
                <tr>
                  <td class="text-left text-h6">Datos de la Venta</td>
                </tr>
              </thead>
              <tbody>
                  <!-- MONEDA A VENDER -->
                  <tr>
                    <td class="text-left">Moneda de Venta</td>
                    <td style="width: 300px;">
                      <q-select
                        filled
                        dense
                        v-model="co_moneda"
                        :options="get_catalogo_tcmoneda.resultado"
                        option-label="no_moneda"
                        option-value="co_moneda"
                        emit-value
                        map-options
                      />    
                    </td>
                  </tr>
                  
                  <!-- REGISTRO IMPORTE A VENDER -->
                  <tr>
                    <td class="text-left">Precio de Venta</td>
                    <td style="width: 150px;">
                      <q-input
                        dense
                        v-model="precioventa"
                        filled
                        type="number"
                      />
                    </td>
                  </tr>
              </tbody>    
            </q-markup-table>
          </q-card>
        </div>
      </q-card-section>
    
      <!-- BOTONES -->
      <q-card-actions align="center">
        <!-- BOTON 1 -->
        <q-btn
          :loading="loadboton" 
          outline
          size="md"
          color="positive"
          @click="registrar()"
          icon="check"
          label="Registrar"
        />
        <!-- BOTON 2 -->
        <q-btn outline label="Cancelar" color="red" @click="cancelar()" />
      </q-card-actions>
      
    </q-card>
    
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { MixinDefault } from "../../../../mixins/mixin";
import { date } from "quasar";
let timeStamp = Date.now();

export default {
  components: {
    DatosCompra: () => import("./DatosCompra")
  },
  computed: {
    ...mapState("comercial", ["dialogVehiculo"]),
    ...mapGetters("comercial", ["get_catalogo_tctipdct","get_inform_compra_art", "get_catalogo_tctipveh", "get_catalogo_tcmoneda"]),
    ...mapGetters("marcas", ["getMarcas"]),
    ...mapGetters("modelos", ["getModelosFilter", "getModelosFilterMarca"]),
    
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
  name: "DialogVehiculo",
  data() {
    return {
      model: null,
      oc: "",
      mostrarFormulario: false,
      loadboton: false,
      tipvehicu: null,
      mar_veh: null,
      mod_veh: null,
      anio: null,
      color: "",
      chasis: "",
      motor: "",
      co_tipveh: "",
      co_moneda: null,
      fechadeemision: "",
      numerodocumento: "",
      precioventa: "",
      doc_ide: "",
      ape_pat: "",
      ape_mat: "",
      nom_cli: "",
      cliente: "",
      co_arcadj: null,
      operacion: "",
      clienteSelect: null,
      referidoSelect: null,
      seleccliente: true,
      optionsr: [],
      newoptionsr: [],
      options: [],
      newoptions: [],
      columns: [
        { name: "name", required: true, label: "Dessert (100g serving)", align: "left", field: row => row.name, format: val => `${val}`, sortable: true },
        {name: "calories", align: "center", label: "Calories", field: "calories", sortable: true },
        { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
        { name: "carbs", label: "Carbs (g)", field: "carbs" },
        { name: "protein", label: "Protein (g)", field: "protein" },
        { name: "sodium", label: "Sodium (mg)", field: "sodium" },
        { name: "calcium", label: "Calcium (%)", field: "calcium", sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: "iron", label: "Iron (%)", field: "iron", sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],
      data: [
        { name: "Frozen Yogurt", calories: 159, fat: 6.0, carbs: 24, protein: 4.0, sodium: 87, calcium: "14%", iron: "1%" },
        { name: "Ice cream sandwich", calories: 237, fat: 9.0, carbs: 37, protein: 4.3, sodium: 129, calcium: "8%", iron: "1%" },
        { name: "Eclair", calories: 262, fat: 16.0, carbs: 23, protein: 6.0, sodium: 337, calcium: "6%", iron: "7%" },
        { name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3, sodium: 413, calcium: "3%", iron: "8%" },
        { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9, sodium: 327, calcium: "7%", iron: "16%" },
        { name: "Jelly bean", calories: 375, fat: 0.0, carbs: 94, protein: 0.0, sodium: 50, calcium: "0%", iron: "0%" },
        { name: "Lollipop", calories: 392, fat: 0.2, carbs: 98, protein: 0, sodium: 38, calcium: "0%", iron: "2%" },
        { name: "Honeycomb", calories: 408, fat: 3.2, carbs: 87, protein: 6.5, sodium: 562, calcium: "0%", iron: "45%" },
        { name: "Donut", calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: "2%", iron: "22%" },
        { name: "KitKat", calories: 518, fat: 26.0, carbs: 65, protein: 7, sodium: 54, calcium: "12%", iron: "6%" }
      ]
    }; 
  },
  methods: {
    ...mapActions("comercial", [
        "call_listar_compra_vehicu", 
        "call_catalogo_tctipveh", 
        "call_catalogo_tcmoneda", 
        "call_insert_vehven",
        "call_catalogo_tctipdct"
        ]),
    ...mapActions("marcas", ["callMarcas"]),
    ...mapActions("modelos", ["callModelosFilter", "callModelosFilterMarca"]),
    
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
    
    async traerModelos(val) {
      console.log("Buscando modelos");
      await this.callModelosFilterMarca(val);
    },
    //BOTÓN "REGISTRAR" : PARA GENERE LA OPERACIÓN
    async registrar() {
      this.loadboton = true;
      this.$q.loading.show();
      this.$store.commit("comercial/dialogVehiculo", false);
      await this.callMarcas("all");
      await this.call_catalogo_tctipveh();
      await this.call_catalogo_tcmoneda();
      try {
        //SP QUE GENERA LA OPERACION
        const responseService = await this.call_insert_vehven({
          co_ordcom: this.get_inform_compra_art.resultado[0].co_ordcom,
          co_comart: this.get_inform_compra_art.resultado[0].co_comart,
          co_modveh: this.mod_veh,
          nu_anomod: this.anio,
          nu_serveh: this.chasis,
          nu_motveh: this.motor,
          no_colveh: this.color,
          ti_vehicu: this.tipvehicu,
          fe_emisio: this.fechadeemision,
          nu_docume: this.numerodocumento,
          co_moneda: this.co_moneda,
          im_preven: this.precioventa,
          co_arcadj: `${this.$store.state.example.arcadj}`
        });
        
        //console.log("responseService", responseService);
        if (responseService.res == "ok") {
          this.loadboton = false;
          this.onResert();
          this.$q.notify({
            message: responseService.message
          });
          await this.call_listar_factur({
            fe_regdes: "",
            fe_reghas: "",
            no_client: "",
            nu_factur: "",
            ti_estado: "",
            co_operac: "",
            ti_bandej: 0
          });
        } else if (responseService.res == "ko") {
          this.loadboton = false;
          this.$q.notify({
            message: `${responseService.message} - verifique los campos`
          });
        }
        this.$q.loading.hide();
      } catch (error) {
        console.log(error);
        this.$q.notify({
          message: `${error}`,
        });
        this.loadboton = false;
        this.$q.loading.hide();
      }
    },
    
    ////BOTÓN "CANCELAR" : PARA QUE SE CIERRE LA VENTANA FLOTANTE
    async cancelar() {
      this.$q.loading.show();
      this.$store.commit("comercial/dialogVehiculo", false);
      this.$q.loading.hide();
    }
  },

  async created() {
    await this.callMarcas("all");
      this.$q.loading.hide();
  }
};
</script>
<style scoped></style>
