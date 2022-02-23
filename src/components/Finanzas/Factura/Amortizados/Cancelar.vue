<template>
  <div class="row">
    <div class="row">
      <div class="col"><u>Cancelar </u></div>
      <div class="col text-right q-pa-xs">
      </div>
    </div>

    <div class="col-xs-12 col-md-12 q-pa-x">
      <!--      {{ get_listar_produc_encont }}-->
      <q-card flat bordered>
        <div class="row">
          <div class="col-xs-12 col-md-12 q-pa-xs">
            <q-input
              autofocus
              dense
              disable
              filled
              v-model="documentoVenta"
              label="Código"
            />
          </div>
          <div class="col-xs-12 col-md-12 q-pa-xs">
            <q-input
              filled
              dense
              v-model="fechadepago"
              label="Fecha de Pago"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="fechadepago" mask="YYYY-MM-DD">
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
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-md-13 q-pa-xs">
            <q-select
                filled
                dense
                v-model="bancos"
                :options="get_catalogo_tctipdoc.operac"
                option-label="no_entfin"
                option-value="co_entfin"
                emit-value
                map-options
                label="Banco"
              />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-md-13 q-pa-xs">
            <q-select
              filled
              dense
              v-model="moneda"
              :options="get_catalogo_tcmonabo.operac"
              option-label="no_moneda"
              option-value="co_moneda"
              emit-value
              map-options
              label="Moneda"
              />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-md-13 q-pa-xs">
            <q-input
              autofocus
              dense
              filled
              v-model="cuentabanco"
              label="Número de Cuenta"
            />
          </div>
        </div>
        <div class="row">
           <div class="col-xs-12 col-md-13 q-pa-xs">
            <q-input
              autofocus
              dense
              filled
              v-model="detraccion"
              label="Detracción"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-md-13 q-pa-xs">
            <q-input
              autofocus
              dense
              filled
              v-model="monto"
              label="Cobrar"
            />
          </div>
        </div>
        <div class="col-12">
          <q-input
            v-model="observacion"
            filled
            dense
            label="Comentario / Observación"
            type="textarea"
          />
        </div>
        <div class="row">
           <div class="col-xs-2 col-md-2 q-pa-xs">
            <q-btn color="green" @click="Cobrar" label="Registrar" />
            
          </div>
          <div class="col-xs-2 col-md-2 q-pa-xs">
            <q-btn outline label="Cancelar" color="red" @click="cerrar" />
            
          </div>
          
        </div>
      </q-card>
    </div>
    
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "TablaProductosdelaOrden",
  computed: {
    ...mapState("finanzas", ["documentoVenta"]),
    ...mapGetters("finanzas", [
        "get_listar_operac_encont",
        "get_catalogo_tctipdoc",
        "get_catalogo_tcmonabo"
      ])
  },
  data() {
    return {
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 1000
        // rowsNumber: xx if getting data from a server
      },
      model: null,
      oc: "",
      categoria: "",
      subcategoria: "",
      producto: "",
      cliente: "",
      placa: "",
      bancos: "",
      fechadepago: "",
      moneda: 28,
      monto: "",
      cuentabanco: "",
      detraccion: 0,
      observacion: "",
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      columns: [
        {
          name: "name",
          required: true,
          label: "Documento",
          align: "left",
          field: row => row.co_factur,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "no_client", align: "left", label: "Cliente", field: "no_client", sortable: true
        },
        {
          name: "co_plaveh", align: "center", label: "Placa", field: "co_plaveh", sortable: true
        },
        {
          name: "no_marveh", align: "left", label: "Marca", field: "no_marveh", sortable: true
        },
        {
          name: "no_modveh", align: "left", label: "Modelo", field: "no_modveh", sortable: true
        },
        { 
          name: "co_operac", align: "left", label: "Operación", field: "co_operac" 
        },
        { 
          name: "im_basimp", align: "right", label: "S/.Total", field: "im_basimp" , sortable: true
        },
        { 
          name: "accion", label: "Accion", field: "accion" 
        }
      ],

      data: []
    };
  },
  methods: {
    ...mapActions("finanzas", [
      "call_listar_operac_encont",
      "call_manten_produc_factur",
      "call_listar_detall_factur",
      "call_inform_factur",
      "call_catalogo_monabo",
      "call_catalogo_entfin",
      "call_catalogo_tipdoc",
      "call_amorti_factur",
      "call_listar_factur"
    ]),

    async cerrar() {
      this.$q.loading.show();
      await this.call_listar_factur({
        fe_regdes: "",
        fe_reghas: "",
        no_client: "",
        nu_factur: "",
        ti_estado: "Amortizado",
        co_operac: "",
        ti_bandej: 3
      });
      this.$store.commit("finanzas/dialogDetalleOrden", false);
      this.$q.loading.hide();
    },

    async Cobrar() {
      console.log("Entra");
      this.loadboton = true;

      await this.call_amorti_factur({
        pn_regist: this.$q.localStorage.getAll().UserDetalle.co_person,
        co_factur: this.documentoVenta,
        fe_amorti: this.fechadepago,
        co_entfin: this.bancos,
        im_amorti: this.monto,
        im_detrac: this.detraccion,
        no_coment: "Para Cancelar",
        co_moneda: this.moneda,
        nu_cueban: this.cuentabanco,
        no_observ: this.observacion
      });
      
      await this.call_listar_factur({
            fe_regdes: "",
            fe_reghas: "",
            no_client: "",
            nu_factur: "",
            ti_estado: "",
            co_operac: "",
            ti_bandej: 3
        });
      this.$store.commit("finanzas/dialogCrear", false);
      this.cerrar();
      // }
    }
  }
};
</script>

<style scoped></style>
