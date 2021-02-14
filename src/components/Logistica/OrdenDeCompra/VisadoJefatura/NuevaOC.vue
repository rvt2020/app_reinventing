<template>
  <div>
    <q-dialog v-model="dialogCrear" persistent position="top">
      <q-card v-if="mostrarFormulario" style="width: 700px; max-width: 80vw">
        <!--        <q-card-section class="row items-center">-->
        <!--          <div>-->
        <div v-if="tipo == 1" class="q-pl-lg q-pt-sm text-h6">
          Agregar Articulo
        </div>
        <!--            <div v-else-if="tipo == 2" class="text-h6">Editar Articulo</div>-->
        <!--          </div>-->
        <!--        </q-card-section>-->
        <!--        <q-separator />-->
        <q-form @submit="onSubmit" @reset.prevent.stop="onReset">
          <q-card-section class="row items-center q-gutter-sm">
            <div class="col-12">
              <q-input
                dense
                ref="fechadecompra"
                filled
                v-model="fechadecompra"
                label="Fecha de compra"
                hint="Fecha de compra"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Campo obligatorio']"
              />
            </div>
            <div class="col-12">
              <q-select
                filled
                dense
                @input="traerCategorias"
                v-model="proveedor"
                :options="getMaterialesEmpresas"
                option-label="no_empres"
                option-value="co_empres"
                emit-value
                map-options
                label="Proveedor"
                hint="Proveedor"
              />
            </div>
            <div class="col-12">
              <q-select
                filled
                dense
                v-model="solicitante"
                :options="getMaterialesEmpresas"
                option-label="no_empres"
                option-value="co_empres"
                emit-value
                map-options
                label="Solicitante"
                hint="solicitante"
              />
            </div>
            <div class="col-12">
              <q-select
                filled
                dense
                v-model="tipodecompra"
                :options="getMaterialesEmpresas"
                option-label="no_empres"
                option-value="co_empres"
                emit-value
                map-options
                label="Tipo de compra"
                hint="Tipo de compra"
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="motivodecompra"
                filled
                dense
                label="Motivo de compra"
                hint="Motivo de compra"
                type="textarea"
              />
            </div>
            <div class="col-12">
              <q-select
                filled
                dense
                v-model="moneda"
                :options="getMaterialesEmpresas"
                option-label="no_empres"
                option-value="co_empres"
                emit-value
                map-options
                label="Moneda"
                hint="Moneda"
              />
            </div>
            <div class="col-12">
              <q-select
                filled
                dense
                v-model="tipopago"
                :options="getMaterialesEmpresas"
                option-label="no_empres"
                option-value="co_empres"
                emit-value
                map-options
                label="Tipo Pago"
                hint="Tipo Pago"
              />
            </div>
            <div class="col-12">
              <q-select
                filled
                dense
                v-model="conigv"
                :options="getMaterialesEmpresas"
                option-label="no_empres"
                option-value="co_empres"
                emit-value
                map-options
                label="¿Con IGV?"
                hint="¿Con IGV?"
              />
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="negative" @click="cerrarDialogCrearUser" outline
              >Cerrar
            </q-btn>
            <q-btn color="warning" type="reset" outline>reset</q-btn>
            <q-btn color="positive" type="submit" :loading="loadboton" outline
              >Registrar</q-btn
            >
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  props: ["tipo", "info"],
  computed: {
    ...mapState("logisticas", ["dialogCrear"]),
    ...mapGetters("materiales", [
      "getMaterialesCategorias",
      "getMaterialesEmpresas"
    ]),
    foo: {
      get() {
        return this.dataEdit;
      },
      set(value) {
        this.$store.commit("main/foo", value);
      }
    }
  },
  name: "CreaVehiculos",
  data() {
    return {
      options: ["v1.1", "v1.2", "v1.3", "v1.4", "v1.4"],
      solicitante: "",
      tipodecompra: "",
      motivodecompra: "",
      moneda: "",
      tipopago: "",
      conigv: "",
      options2: this.getMaterialesCategorias,
      fechadecompra: "",
      proveedor: "",
      empresa: null,
      categoria: null,
      mostrarFormulario: false,
      loadboton: false,
      placa: "",
      marca: "",
      modelo: "",
      versioncar: "",
      anio: "",
      color: "",
      chasis: "",
      co_vehicu: "",
      motor: ""
    };
  },
  methods: {
    ...mapActions("materiales", [
      "callMaterialesCategorias",
      "callMaterialesEmpresas",
      "callMaterialesAdd",
      "callMateriales"
    ]),
    filterFn(val, update, abort) {
      let asd = [];
      for (
        let index = 0;
        index < this.getMaterialesCategorias.length;
        index++
      ) {
        const element = this.getMaterialesCategorias[index];
        if (element.no_catego) {
          asd.push(element);
        }
      }
      // console.log("asd", asd);
      update(() => {
        const needle = val.toLowerCase();
        // console.log(needle);
        this.options2 = asd.filter(
          v => v.no_catego.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    async traerCategorias() {
      await this.callMaterialesCategorias(this.empresa);
    },
    cerrarDialogCrearUser() {
      this.$store.commit("logisticas/dialogCrear", false);
      // this.$store.commit("logisticas/activarEdit", false);
    },
    async onResert() {
      this.fechadecompra;
      this.empresa;
      this.categoria;
    },
    async onSubmit() {
      this.loadboton = true;
      try {
        const responseAddUser = await this.callMaterialesAdd({
          cod_art: null,
          nom_art: this.fechadecompra,
          cod_bar: null,
          cod_emp: this.empresa,
          cod_cat: this.categoria
        });
        console.log("responseAddUser", responseAddUser);
        if (responseAddUser.res == "ok") {
          this.loadboton = false;
          this.onResert();
          this.$q.notify({
            message: responseAddUser.message
          });
          this.callMateriales();
          this.$store.commit("materiales/dialogCrear", false);
        } else if (responseAddUser.res == "ko") {
          this.loadboton = false;
          this.$q.notify({
            message: `${responseAddUser.message} - verifique los campos`
          });
        }
      } catch (e) {
        this.loadboton = false;
        this.onResert();
        this.$q.notify({
          message: `${e} - Error controlado`
        });
        console.log(e);
      }
      // }
    }
  },
  async mounted() {
    this.$q.loading.show();
    console.log("mounted - crear - materiales");
    await this.callMaterialesEmpresas();
    this.mostrarFormulario = true;
    this.$q.loading.hide();
  }
};
</script>

<style scoped></style>
