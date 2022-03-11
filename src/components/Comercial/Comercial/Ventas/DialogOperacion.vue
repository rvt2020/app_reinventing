<template>
  <div class="col-xs-12 col-md-6 q-pa-xs">
    <q-card >
      <!--      {{ get_inform_ordcom }}-->
      <q-bar class="bg-primary text-white">
        NUEVA OPERACION - VENTA
        <q-space />
      </q-bar>
      
      <q-card-section>
        <!-- DATOS DEL VEHICULO -->  
        <div class="row">
          <div class="col-xs-12 col-md-4 q-pa-xs">
            <DatosVehiculo :info="get_inform_vehicu" />
          </div>
        </div>
        
        <!-- DATOS DEL CLIENTE -->
        <div class="row">
          <div class="col-xs-12 col-md-12 q-pa-xs">
              <q-card flat bordered class="my-card">
                <q-markup-table dense>
                  <thead>
                    <tr>
                      <td class="text-left text-h6">Datos del Cliente</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left">Nombres o Apellidos</td>
                      <td class="text-right">
                        <!--                        {{ clienteSelect }}-->
                        <q-select
                          v-if="seleccliente"
                          filled
                          dense
                          @input="buscarPersonas"
                          v-model="clienteSelect"
                          clearable
                          use-input
                          hide-selected
                          fill-input
                          input-debounce="0"
                          label="Buscar"
                          :options="options"
                          option-label="no_person"
                          emit-value
                          map-options
                          @filter="filterFn"
                        >
                          <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                No results
                              </q-item-section>
                            </q-item>
                          </template>
                          
                        </q-select>
                        <q-input v-else filled dense v-model="doc_ide">
                          <template v-slot:append>
                            <q-btn
                              round
                              dense
                              flat
                              icon="add"
                              @click="seleccliente = !seleccliente"
                            />
                          </template>
                        </q-input>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Apellido Paterno</td>
                      <td class="text-right">
                        <q-input filled dense v-model="ape_pat" />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Apellido Materno</td>
                      <td class="text-right">
                        <q-input filled dense v-model="ape_mat" />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Nombre del Cliente</td>
                      <td class="text-right">
                        <q-input filled dense v-model="nom_cli" />
                      </td>
                    </tr>
                    <tr>
                    <td class="text-left">Cónyuge</td>
                    <td class="text-right">
                      <q-select
                        filled
                        v-model="conyugeSelect"
                        clearable
                        use-input
                        hide-selected
                        fill-input
                        input-debounce="0"
                        label="Buscar"
                        :options="optionsc"
                        option-label="no_conyug"
                        emit-value
                        map-options
                        @filter="filterC"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </td>
                  </tr>
                  </tbody>
                </q-markup-table>
              </q-card>
            </div>
        </div>

        <!-- DATOS DEL VENDEDOR -->
        <div class="row">
          <div class="col-xs-12 col-md-12 q-pa-xs">
            <q-card flat bordered class="my-card">
              <q-markup-table dense>
                <thead>
                  <tr>
                    <td class="text-left text-h6">Vendedor</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-left">Nombres o Apellido</td>
                    <td class="text-right">
                      <q-select
                        filled
                        v-model="referidoSelect"
                        clearable
                        use-input
                        hide-selected
                        fill-input
                        input-debounce="0"
                        label="Buscar"
                        :options="optionsr"
                        option-label="no_referi"
                        emit-value
                        map-options
                        @filter="filterR"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-card>
          </div>
        </div>
        
        <!-- DATOS DE LA VENTA FINAL  -->
        <div class="row">
          <div class="col-xs-12 col-md-12 q-pa-xs">
              <q-card flat bordered class="my-card">
                <q-markup-table dense>
                  <thead>
                    <tr>
                      <td class="text-left text-h6">Venta Final</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left">Tipo de Cambio (T.C)</td>
                      <td style="width: 150px;">
                        <q-input
                          dense
                          v-model="tip_cam"
                          filled
                          type="number"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Descuento Precio Venta por (T.DPV) : </td>
                      <td style="width: 150px;">
                        <q-select
                          filled
                          dense
                          v-model="co_dctven"
                          :options="get_catalogo_tctipdct.resultado"
                          option-label="no_tipdct"
                          option-value="co_tipdct"
                          emit-value
                          map-options
                        /> 
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Valor del Descuento (V.D) </td>
                      <td style="width: 150px;">
                        <q-input
                          dense
                          v-model="val_des"
                          filled
                          type="number"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Cuota Inicial por (T.C.I): </td>
                      <td style="width: 150px;">
                        <q-select
                          filled
                          dense
                          v-model="co_dctini"
                          :options="get_catalogo_tctipdct.resultado"
                          option-label="no_tipdct"
                          option-value="co_tipdct"
                          emit-value
                          map-options
                        /> 
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Valor Cuota Inicial (V.C.I)</td>
                      <td style="width: 150px;">
                        <q-input
                          dense
                          v-model="cuo_ini"
                          filled
                          type="number"
                        />
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </q-card>
            </div>
        </div>

        <!-- OPERACION  -->
        <div class="row">
          <div class="col-xs-12 col-md-12 q-pa-xs">
              <q-card flat bordered class="my-card">
                <q-markup-table dense>
                  <thead>
                    <tr>
                      <td class="text-left text-h6">Generar Operación</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left">Moneda </td>
                      <td style="width: 150px;">
                        <q-select
                          filled
                          dense
                          v-model="moneda"
                          :options="get_catalogo_tcmoneda.operac"
                          option-label="no_moneda"
                          option-value="co_moneda"
                          emit-value
                          map-options
                        /> 
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Trabajo </td>
                      <td style="width: 150px;">
                        <q-select
                          filled
                          dense
                          v-model="trabajo"
                          :options="get_catalogo_tctrabaj.resultado"
                          option-label="co_tiptra"
                          option-value="no_tiptra"
                          emit-value
                          map-options
                        /> 
                      </td>
                    </tr>
                    
                  </tbody>
                </q-markup-table>
              </q-card>
            </div>
        </div>
      </q-card-section>
      
      <q-separator />

      <q-card-actions align="center">
        <!-- BOTON 1 -->
        <q-btn
          :loading="loadboton" 
          outline
          size="md"
          color="positive"
          @click="registrar()"
          icon="done"
          label="Registrar"
        />
        <!-- BOTON 2 -->
        <q-btn outline label="Cancelar" color="red" @click="cancelar()" icon="cancel" />
        <q-btn outline label="Calcular" color="golden" @click="calcular()" icon="calculate" />
      </q-card-actions>
      
    </q-card>
    <q-card>
      <div class="row">
        <div class="col-xs-12 col-md-15 q-pa-xs">
            <TablaCalculo />
          </div>
      </div>
      
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
    DatosVehiculo: () => import("./DatosVehiculo"),
    TablaCalculo: () => import("./TablaCalculo"),
    TablaPrincipal: () => import("./Tabla")
  },
  computed: {
    ...mapState("comercial", ["dialogOperacion"]),
    ...mapGetters("personas", ["getPersonasFilter"]),
    ...mapGetters("comercial", ["get_inform_vehicu", "get_catalogo_tctipveh", "get_catalogo_tctipdct", "get_resultado_calculo", "get_catalogo_tctrabaj"]),
    ...mapGetters("operaciones", ["get_combo_cliente", "get_combo_referido", "get_combo_conyuge"]),
    ...mapGetters("tramites", ["get_catalogo_tcmoneda"])
    
  },
  name: "DialogOperacion",
  data() {
    return {
      model: null,
      oc: "",
      no_marveh: "",
      no_modveh: "",
      no_colveh: "",
      nu_anoveh: "",
      co_plaveh: "",
      doc_ide: "",
      ape_pat: "",
      ape_mat: "",
      nom_cli: "",
      cuo_ini: 0,
      cliente: "",
      operacion: "",
      moneda: 28,
      co_tipdct: null,
      co_dctven: 1,
      co_dctini: 1,
      val_des: 0,
      tip_cam: 4.0,
      clienteSelect: null,
      seleccliente: true,
      options: [],
      newoptions: [],
      
      referidoSelect: null,
      optionsr: [],
      newoptionsr: [],
      
      conyugeSelect: 0,
      optionsc: [],
      newoptionsc: [],
      
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
        "call_listar_vehicu", 
        "call_insert_operac_venta", 
        "call_catalogo_tctipdct", 
        "call_resultado_calculo",
        "call_listar_vehicu",
        "call_inform_vehicu",  
        "call_insert_calculo_venta",
        "call_resete_calcul",
        "call_catalogo_tctrabaj"
      ]),
    ...mapActions("operaciones", ["call_combo_cliente", "call_combo_referido", "call_combo_conyuge"]),
    ...mapActions("tramites", ["call_catalogo_tcmoneda"]),
    ...mapActions("personas", ["callPersonasFilter"]),  
    
    filterFn(val, update, abort) {
      let asd = [];
      for (let index = 0; index < this.newoptions.length; index++) {
        const element = this.newoptions[index];
        if (element.no_person) {
          asd.push(element);
        }
      }
      // console.log("asd", asd);
      update(() => {
        const needle = val.toLowerCase();
        // console.log(needle);
        this.options = asd.filter(
          v => v.no_person.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    
    filterR(val, update, abort) {
      let asd = [];
      for (let index = 0; index < this.newoptionsr.length; index++) {
        const elementr = this.newoptionsr[index];
        if (elementr.no_referi) {
          asd.push(elementr);
        }
      }
      // console.log("asd", asd);
      update(() => {
        const needle = val.toLowerCase();
        // console.log(needle);
        this.optionsr = asd.filter(
          (v) => v.no_referi.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    
    filterC(val, update, abort) {
      let asd = [];
      for (let index = 0; index < this.newoptionsc.length; index++) {
        const elementc = this.newoptionsc[index];
        if (elementc.no_conyug) {
          asd.push(elementc);
        }
      }
      // console.log("asd", asd);
      update(() => {
        const needle = val.toLowerCase();
        // console.log(needle);
        this.optionsc = asd.filter(
          (v) => v.no_conyug.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    
    async buscarPersonas() {
      this.doc_ide = this.clienteSelect.co_docide;
      this.ape_pat = this.clienteSelect.no_apepat;
      this.ape_mat = this.clienteSelect.no_apemat;
      this.nom_cli = this.clienteSelect.no_nombre;
    },
    
    //BOTÓN "REGISTRAR" : PARA GENERE LA OPERACIÓN
    async registrar() {
      this.loadboton = true;
      //this.$q.loading.show();
      //this.$store.commit("comercial/dialogOperacion", false);
      await this.call_catalogo_tctipdct();
      try {
        //SP QUE GENERA LA OPERACION
        if (this.conyugeSelect.co_conyug == undefined) {
           await this.call_insert_operac_venta({
            co_vehicu: this.get_inform_vehicu.resultado[0].co_vehicu,
            co_client: this.clienteSelect.co_person,
            co_usuari: this.$q.localStorage.getAll().UserDetalle.co_person,
            co_person: this.referidoSelect.co_referi,
            co_moneda: this.moneda,
            co_conyug: null
          });
 
        } else {
           await this.call_insert_operac_venta({
              co_vehicu: this.get_inform_vehicu.resultado[0].co_vehicu,
              co_client: this.clienteSelect.co_person,
              co_usuari: this.$q.localStorage.getAll().UserDetalle.co_person,
              co_person: this.referidoSelect.co_referi,
              co_moneda: this.moneda,
              co_conyug: this.conyugeSelect.co_conyug
            });
        }
        this.$q.notify({
            message: `Se regristró la operación correctamente`
          });
        this.$router.push(`/operaciones?id=5`);
        this.$router.go();
        this.loadboton = false;
        this.$q.loading.hide();
    
      } catch (error) {
        console.log(error);
        this.$q.notify({
          message: `${error}`,
        });
        this.loadboton = false;
      }
    },
    
    //BOTÓN "CALCULAR" : PARA QUE REALICE EL CÁLCULO.
    async calcular() {
      this.$q.loading.show();
      await this.call_insert_calculo_venta({
        im_preven: this.get_inform_vehicu.resultado[0].nu_serveh,
        co_vehicu: this.get_inform_vehicu.resultado[0].co_vehicu,
        va_tipcam: this.tip_cam,
        ti_desven: this.co_dctven,
        va_desven: this.val_des,
        ti_desini: this.co_dctini,
        va_cuoini: this.cuo_ini
      });
      await this.call_inform_vehicu({
        co_vehicu: this.get_inform_vehicu.resultado[0].co_vehicu 
      });
      await this.call_listar_vehicu();
      
      await this.call_resultado_calculo({
        co_vehicu: this.get_inform_vehicu.resultado[0].co_vehicu
      });

      await this.call_catalogo_tctipdct();
      await this.call_catalogo_tcmoneda();
      
      await this.call_combo_referido();
      this.optionsr = this.get_combo_referido.client;
      this.newoptionsr = this.get_combo_referido.client;
      
      await this.call_combo_conyuge();
      this.optionsc = this.get_combo_conyuge.client;
      this.newoptionsc = this.get_combo_conyuge.client;
      
      await this.call_combo_cliente();
      this.options = this.get_combo_cliente.client;
      this.newoptions = this.get_combo_cliente.client;
      this.$q.loading.hide();
      console.log("Calcular");
    },
    
    //BOTÓN "CANCELAR" : PARA QUE SE CIERRE LA VENTANA FLOTANTE
    async cancelar() {
      this.$q.loading.show();
      await this.call_resete_calcul({
        co_vehicu: this.get_inform_vehicu.resultado[0].co_vehicu 
      });
      this.$store.commit("comercial/dialogOperacion", false);
      this.$q.loading.hide();
    }
  },

  async created() {
    await this.call_catalogo_tctipdct();
    await this.call_catalogo_tcmoneda();
    
    await this.call_combo_referido();
    this.optionsr = this.get_combo_referido.client;
    this.newoptionsr = this.get_combo_referido.client;
    
    await this.call_combo_conyuge();
    this.optionsc = this.get_combo_conyuge.client;
    this.newoptionsc = this.get_combo_conyuge.client;
    
    await this.call_combo_cliente();
    this.options = this.get_combo_cliente.client;
    this.newoptions = this.get_combo_cliente.client;
    this.$q.loading.hide();
  }
};
</script>
<style scoped></style>
