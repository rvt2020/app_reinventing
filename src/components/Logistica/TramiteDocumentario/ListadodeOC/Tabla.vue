<template>
  <div>
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      title="Listado"
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
        <q-btn color="primary" label="Nuevo T/D" @click="crearOC"></q-btn>
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
      <template v-slot:body-cell-no_tradoc="props">
        <q-td :props="props">
          <q-btn
            size="xs"
            color="primary"
            :label="`${props.row.no_tradoc}`"
            @click="generarOperacion(props.row)"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-ca_arcadj="props">
        <q-td :props="props">
          <q-btn
            size="xs"
            icon="attachment"
            color="primary"
            @click="arcadj(props.row)"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-accion="props">
        <q-td :props="props">
          <div class="row q-gutter-xs">
            <div>
              <q-btn
                size="xs"
                round
                icon="visibility"
                color="info"
                @click="verarchivos(props.row)"
              />
            </div>
            <div>
              <q-btn
                size="xs"
                round
                icon="delete"
                color="red"
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
    <q-dialog v-model="upload">
      <q-card>
        <Upload @click="guardararcadj" />
      </q-card>
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
export default {
  mixins: [MixinDefault],
  props: {
    info: {
      type: Array
    }
  },
  computed: {
    ...mapState("tramites", ["dialogCrear", "dialogDetalleOrden"]),
    ...mapGetters("tramites", ["get_inform_tradoc"])
  },
  components: {
    DialogGenerarOperacion: () => import("./DialogDetalleOrden"),
    DialogCrear: () => import("./NuevaOC"),
    Upload: () => import("./Upload")
  },
  data() {
    return {
      arcadjs: "",
      visor: false,
      upload: false,
      filter: "",
      tipo: 1,
      orden: null,
      dataEdit: [],
      select_to_arca: {},
      maximizedToggle: false,
      initialPagination: {
        sortBy: "no_tradoc",
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
          field: row => row.fe_regist,
          format: val => `${this.formatFechaCorta(val)}`,
          sortable: true
        },
        {
          name: "co_docide",
          align: "center",
          label: "Ruc",
          field: "co_docide",
          sortable: true
        },
        {
          name: "no_razsoc",
          label: "Proveedor",
          field: "no_razsoc",
          sortable: true
        },
        {
          name: "no_tradoc",
          label: "Tramite Doc",
          field: "no_tradoc",
          sortable: true
        },
        { name: "no_estado", label: "Estado", field: "no_estado" },
        { name: "co_moneda", label: "Moneda", field: "co_moneda" },
        {
          name: "im_baseim",
          label: "Precio Neto",
          field: "im_baseim",
          sortable: true
        },
        {
          name: "im_pretot",
          label: "Precio Total",
          field: "im_pretot",
          sortable: true
        },
        {
          name: "ca_articu",
          label: "Cant. Produc.",
          field: "ca_articu",
          sortable: true
        },
        {
          name: "fe_solici",
          label: "Visado Solicitante",
          field: "fe_solici",
          sortable: true
        },
        {
          name: "fe_jefaut",
          label: "Visado Jefatura",
          field: "fe_jefaut",
          sortable: true
        },
        {
          name: "ca_arcadj",
          label: "Adjunto",
          field: "ca_arcadj",
          sortable: true
        },
        {
          name: "accion",
          label: "Accion",
          field: "accion",
          sortable: true
        }
      ]
    };
  },
  methods: {
    ...mapActions("tramites", [
      "call_inform_tradoc",
      "call_listar_produc_encont",
      "call_listar_detall_tradoc",
      "call_delete_tradoc",
      "call_listar_tradoc",
      "call_insert_arcadj",
      "call_listar_arcadj_tradoc"
    ]),
    async verarchivos(val) {
      try {
        let URLS = [];
        console.log(val);
        // co_tradoc
        const archivo = await this.call_listar_arcadj_tradoc({
          co_tradoc: val.co_tradoc
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
      this.$store.commit("tramites/dialogCrear", true);
    },
    async guardararcadj() {
      try {
        this.$q.loading.show();
        console.log("Se guardo");
        await this.call_insert_arcadj({
          co_tradoc: this.select_to_arca.co_tradoc,
          co_arcadj: this.$store.state.example.arcadj,
          ti_accion: "I"
        });
        this.upload = false;
        this.$q.loading.hide();
      } catch (e) {
        console.log(e);
        this.$q.loading.hide();
      }
    },
    async arcadj(val) {
      this.$store.commit("example/UploadBasicData", val);
      this.select_to_arca = val;
      console.log("arcadj", val);
      this.upload = true;
    },
    async eliminar(val) {
      this.$q
        .dialog({
          title: "Confirmar",
          message: "¿Estas seguro que quieres eliminar?",
          cancel: true,
          persistent: true
        })
        .onOk(async () => {
          // console.log('>>>> OK')
          try {
            this.$q.loading.show();
            console.log("Eliminar", val);
            const responseEliminar = await this.call_delete_tradoc({
              co_tradoc: val.co_tradoc,
              co_person: this.$q.localStorage.getAll().UserDetalle.co_person
            });
            if (responseEliminar.res === "ok") {
              await this.call_listar_tradoc({
                fe_emides: "",
                fe_emihas: "",
                no_provee: "",
                nu_tramit: "",
                co_barras: ""
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
            console.log(e);
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
    },
    async generarOperacion(val) {
      console.log("generarOperacion", val);
      this.$q.loading.show();
      this.$store.commit("tramites/tramiteDoc", val.co_tradoc);
      await this.call_inform_tradoc({
        co_tradoc: `${val.co_tradoc}`
      });
      await this.call_listar_produc_encont({
        co_tradoc: `${val.co_tradoc}`,
        co_catego: "",
        co_subcat: "",
        no_produc: ""
      });
      await this.call_listar_detall_tradoc({
        co_tradoc: `${val.co_tradoc}`
      });
      console.log(val);
      this.$q.notify({
        message: `${val.co_tradoc}`
      });
      this.$store.commit("tramites/dialogDetalleOrden", true);
      this.$q.loading.hide();
    }
  }
};
</script>
