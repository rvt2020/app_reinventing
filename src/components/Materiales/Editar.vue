<template>
  <div>
    <!--    <q-dialog v-model="$store.state.materiales.dialogEdit" position="top">-->
    <q-dialog v-model="dialogEdit" persistent position="top">
      <q-card style="width: 700px; max-width: 80vw;">
        <!--        {{ info }}-->
        <q-card-section class="row items-center">
          <div>
            <div class="text-h5">Editar Articulos</div>
          </div>
        </q-card-section>
        <q-separator />
        <form @submit.prevent="onSubmit" @reset.prevent.stop="onReset">
          <q-card-section class="row items-center q-gutter-sm">
            <div class="col-12">
              <q-input
                dense
                ref="nombreArticulo"
                filled
                v-model="nombreArticulo"
                label="Nombre de articulo"
                hint="Nombre de articulo"
                :rules="[val => (val && val.length > 0) || 'Campo obligatorio']"
              />
            </div>
            <div class="col-12">
              <q-input
                dense
                ref="codigoBarra"
                filled
                v-model="codigoBarra"
                label="Codigo de barra"
                hint="Codigo de barra"
                :rules="[val => (val && val.length > 0) || 'Campo obligatorio']"
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
              <!--              {{ getMaterialesCategorias }}-->
              <!--              {{ options2 }}-->
              <!--              {{ typeof categoria }}-->
              <!--              {{ categoria }}-->
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
        </form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  props: ["info"],
  computed: {
    ...mapState("materiales", ["dialogEdit"]),
    ...mapGetters("materiales", [
      "getMaterialesEmpresas",
      "getMaterialesCategorias"
    ]),
    ...mapGetters("marcas", ["getMarcas"]),
    ...mapGetters("modelos", ["getModelosFilter", "getModelosFilterMarca"])
  },
  name: "EditVehiculos",
  data() {
    return {
      options2: this.getMaterialesCategorias,
      options: ["v1.1", "v1.2", "v1.3", "v1.4", "v1.4"],
      loadboton: false,
      placa: "",
      categoria: "",
      marca: "",
      modelo: "",
      versioncar: "",
      anio: "",
      color: "",
      chasis: "",
      motor: "",
      codigoBarra: "",
      empresa: "",
      nombreArticulo: ""
    };
  },
  methods: {
    ...mapActions("materiales", [
      "callMaterialesEmpresas",
      "callMaterialesCategorias",
      "callMaterialesAdd"
    ]),
    ...mapActions("marcas", ["callMarcas"]),
    ...mapActions("modelos", ["callModelosFilter", "callModelosFilterMarca"]),
    filterFn(val, update, abort) {
      console.log("filterFn", val);
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
    async traerModelos(val) {
      console.log("Buscando modelos");
      await this.callModelosFilterMarca(val);
    },
    cerrarDialogCrearUser() {
      this.$store.commit("materiales/dialogEdit", false);
    },
    async onResert() {
      this.placa = "";
      this.modelo = "";
      this.anio = "";
      this.chasis = "";
      this.motor = "";
      this.color = "";
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
          this.$store.commit("materiales/dialogEdit", false);
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
    try {
      this.$q.loading.show();
      console.log(this.info);
      console.log("mounted - crear - materiales");
      await this.callMaterialesEmpresas();
      this.nombreArticulo = this.info.no_descri;
      this.codigoBarra = this.info.co_barras;
      this.empresa = Number(this.info.co_empres);
      await this.traerCategorias();
      console.log("this.empresa", this.empresa);
      // setTimeout(() => {
      this.categoria = this.info.co_catego;
      this.options2 = this.getMaterialesCategorias;
      // }, 2000);
      // this.mostrarFormulario = true;
      this.$q.loading.hide();
    } catch (e) {
      console.log(e);
      this.$q.loading.hide();
    }
  }
};
</script>

<style scoped></style>
