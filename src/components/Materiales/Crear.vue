<template>
  <div>
    <q-dialog v-model="dialogCrear" persistent position="top">
      <q-card v-if="mostrarFormulario" style="width: 700px; max-width: 80vw">
        <q-card-section class="row items-center">
          <div>
            <div v-if="tipo == 1" class="text-h5">Agregar Articulo</div>
            <div v-else-if="tipo == 2" class="text-h5">Editar Articulo</div>
          </div>
        </q-card-section>
        <q-separator />
        <q-form @submit="onSubmit" @reset.prevent.stop="onReset">
          <q-card-section class="row items-center q-gutter-sm">
            <div class="col-12">
              <q-input
                dense
                ref="nombreArticulo"
                filled
                v-model="nombreArticulo"
                label="Nombre del articulo"
                hint="Ingresa nombre de articulo"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Campo obligatorio']"
              />
            </div>
            <div class="col-12">
              <q-input
                dense
                ref="codigoBarra"
                filled
                disable
                v-model="codigoBarra"
                label="[AUTO GENERADO]"
                hint="Codigo de barra autogenerado"
              />
            </div>
            <div class="col-12">
              <q-select
                filled
                dense
                @input="traerCategorias"
                v-model="empresa"
                :options="getMaterialesEmpresas.empresa"
                option-label="no_empres"
                option-value="co_empres"
                emit-value
                map-options
                label="Empresa"
                hint="Selecciona la empresa"
              />
            </div>
            <div class="col-12">
              <q-select
                filled
                v-model="categoria"
                clearable
                use-input
                dense
                hide-selected
                fill-input
                input-debounce="0"
                :options="options2"
                option-label="no_catego"
                option-value="co_catego"
                emit-value
                map-options
                label="Categoria"
                hint="Selecciona la categoria"
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
              <!-- <q-select
                filled
                dense
                v-model="categoria"
                :options="options2"
                option-label="no_catego"
                option-value="co_catego"
                emit-value
                map-options
                label="Categoria"
                hint="Selecciona la categoria"
              /> -->
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="negative" @click="cerrarDialogCrearUser" outline
              >Cerrar
            </q-btn>
            <q-btn color="warning" type="reset" outline>reset</q-btn>
            <q-btn color="positive" type="submit" :loading="loadboton" outline
              >Guardar</q-btn
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
    ...mapState("materiales", ["dialogCrear", "dataEdit"]),
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
      options2: this.getMaterialesCategorias,
      nombreArticulo: "",
      codigoBarra: "",
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
      this.$store.commit("materiales/dialogCrear", false);
      this.$store.commit("materiales/activarEdit", false);
    },
    async onResert() {
      this.nombreArticulo;
      this.empresa;
      this.categoria;
    },
    async onSubmit() {
      this.loadboton = true;
      try {
        const responseAddUser = await this.callMaterialesAdd({
          cod_art: null,
          nom_art: this.nombreArticulo,
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
  async created() {
    this.$q.loading.show();
    console.log("mounted - crear - materiales");
    await this.callMaterialesEmpresas();
    this.mostrarFormulario = true;
    this.$q.loading.hide();
  }
};
</script>

<style scoped></style>
