<template>
  <div>
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      title="Lista de Facturas Emitidas"
      :data="info"
      dense
      :filter="filter"
      :columns="columns"
      row-key="name"
      :pagination="initialPagination"
      virtual-scroll
      class="my-sticky-header-table"
    >
      <template v-slot:top-right>
        <q-btn color="primary" label="Facturar" @click="crearOC"></q-btn>
        <q-input
          class="q-pl-sm"
          dense
          filled
          debounce="300"
          v-model="filter"
          placeholder="Buscar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell="props">
        <q-td :props="props">
          {{ props.value }}
        </q-td>
      </template>

      <template v-slot:body-cell-no_factur="props">
        <q-td :props="props">
          <q-btn
            size="xs"
            color="primary"
            :label="`${props.row.no_factur}`"
            @click="generarOperacion(props.row)"
          />
        </q-td>
      </template>
      
      <template v-slot:body-cell-ver="props">
        <q-td :props="props">
          <q-btn
            size="xs"
            icon="visibility"
            color="info"
            @click="verarchivos(props.row)"
          />
        </q-td>
      </template>
      

      <template v-slot:body-cell-accion="props">
        <q-td :props="props">
          <div class="row q-gutter-xs">
            <div>
              <q-btn
                size="xs"
                icon="point_of_sale"
                color="green"
                label="Cobrar"
               @click="eliminar(props.row)"
              />
            </div>
          </div>
        </q-td>
      </template>
      
    </q-table>
    <div>
      <DialogCrear :tipo="tipo" :info="dataEdit" />
    </div>
    <q-dialog
      v-model="dialogDetalleOrden"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-up"
      full-height
      full-width
    >
      <DialogGenerarOperacion />
    </q-dialog>
    <q-dialog v-model="visor">
      <q-card>
        <div v-for="item in arcadjs">
          <a :href="item.url" target="_blank">{{ item.url }}</a>
        </div>

        <!--        {{ arcadjs }}-->
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { MixinDefault } from "../../../../mixins/mixin";
import { date } from "quasar";
let timeStamp = Date.now();

export default {
  props: {
    info: {
      type: Array,
      default: () => [],
    },
  },
  mixins: [MixinDefault],
  name: "Tabla",
  computed: {
    ...mapState("finanzas", ["dialogCrear", "dialogDetalleOrden"]),
    ...mapGetters("finanzas", ["get_inform_factur"])
  },
  //SUPUESTAMENTE AQUI VA COMPONENT
  components: {
    DialogGenerarOperacion: () => import("./DialogDetalleOrden"),
    DialogCrear: () => import("./NuevaOC")
    //Upload: () => import("./Upload")
  },
  data() {
    return {
      arcadjs: "",
      visor: false,
      data_visor: "",
      upload: false,
      filter: "",
      tipo: 1,
      orden: null,
      dataEdit: [],
      select_to_arca: {},
      maximizedToggle: false,
      initialPagination: {
        sortBy: "name",
        descending: true,
        page: 1,
        rowsPerPage: 1000
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "name",
          required: true,
          label: "Fecha",
          align: "left",
          field: row => row.fe_emisio,
          format: val => `${this.formatFecha(val)}`,
          sortable: true
        },
        {
          name: "co_docide",
          align: "center",
          label: "DNI/Ruc",
          field: "co_docide",
          sortable: true
        },
        {
          name: "no_client",
          label: "Cliente",
          field: "no_client",
          align: "left",
          sortable: true
        },
        { name: "no_factur", align: "center",label: "Código", field: "no_factur" },
        { name: "nu_docume", align: "center",label: "Nro.Documento", field: "nu_docume" },
        { name: "no_estado", align: "center",label: "Estado", field: "no_estado" },
        {
          name: "im_basimp",
          label: "Precio Neto",
          field: "im_basimp",
          align: "center",
          sortable: true
        },
        {
          name: "im_totigv",
          label: "IGV",
          field: "im_totigv",
          align: "right",
          sortable: true
        },
        {
          name: "im_pretot",
          label: "Total",
          field: "im_pretot",
          align: "right",
          sortable: true
        },
        {
          name: "ver",
          label: "Archivo",
          field: "ver",
          align: "center",
          sortable: true
        },
        
        {
          name: "accion",
          label: "Accion",
          field: "accion",
          align: "center",
          sortable: true
        }
      ]
    };
  },
  methods: {
    ...mapActions("finanzas", [
      "call_inform_factur",
      "call_listar_operac_encont",
      "call_listar_detall_factur",
      "call_delete_factur",
      "call_listar_factur",
      "call_update_factur",
      "call_listar_arcadj_factur"
    ]),
    async verarchivos(val) {
      try {
        let URLS = [];
        console.log(val);
        // co_ordcom
        const archivo = await this.call_listar_arcadj_factur({
          co_factur: val.co_factur
        });
        const array = archivo.operac;
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          console.log(element);
          const conteo = `${element.co_arcadj}`;
          const conteoNuevo = conteo.length;
          console.log("conteo", conteo.length);
          console.log("elemento", element);
          if (conteoNuevo > 7) {
            console.log(`${process.env.Imagen_URL}/files/${element.co_arcadj}`);
            URLS.push({
              url: `${process.env.Imagen_URL}/files/${element.co_arcadj}`
            });
          } else {
            console.log(
              `http://sistema.reinventing.com.pe/image?co_archiv=${element.co_arcadj}`
            );
            URLS.push({
              url: `http://sistema.reinventing.com.pe/image?co_archiv=${element.co_arcadj}`
            });
          }
        }
        this.arcadjs = URLS;
        this.visor = true;
      } catch (e) {
        console.log(e);
        this.$q.notify({
          message: "Intente en otro momento"
        });
      }
    },
    
    async crearOC() {
      console.log("Crear O/C");
      this.$store.commit("finanzas/dialogCrear", true);
    },
    async eliminar(val) {
      this.$q
        .dialog({
          title: "Confirmar",
          message: "¿Estas seguro de Cobrar?",
          cancel: true,
          persistent: true
        })
        .onOk(async () => {
          try {
            this.$q.loading.show();
            console.log("cobrar", val);
            const responseEliminar = await this.call_update_factur({
              co_factur: `${val.co_factur}`,
              ti_estado: 2
            });
            console.log(responseEliminar.res);
            if (responseEliminar.res === "ok") {
              await this.call_listar_factur({
                fe_regdes: "",
                fe_reghas: "",
                no_client: "",
                nu_factur: "",
                ti_estado: "",
                co_operac: "",
                ti_bandej: 0
              });
              this.$q.notify({
                message: `${responseEliminar.message}`
              });
            } else if (responseEliminar.res === "ko") {
              this.$q.notify({
                message: `${responseEliminar.message}`
              });
            } else {
              this.$q.notify({
                message: `Error Controlado`
              });
            }
            this.$q.loading.hide();
          } catch (e) {
            this.$q.loading.hide();
          }
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
      
      
      console.log("siempre se ejecuta");
    },
    async generarOperacion(val) {
      this.$q.loading.show();
      this.$store.commit("finanzas/documentoVenta", val.co_factur);
      await this.call_inform_factur({
        co_factur: `${val.co_factur}` 
      });
      await this.call_listar_operac_encont({
        co_factur: `${val.co_factur}`,
        no_client: "",
        co_plaveh: "",
        co_operac: ""
      });
      await this.call_listar_detall_factur({
        co_factur: `${val.co_factur}`
      });
      // await this.call_combo_cliente();
      // await this.call_lista_vehiculo_ingreso(val.co_aduana);
      console.log(val);
      this.$q.notify({
        message: `${val.co_factur}`
      });
      this.$store.commit("finanzas/dialogDetalleOrden", true);
      this.$q.loading.hide();
    }

  }
  
};
</script>