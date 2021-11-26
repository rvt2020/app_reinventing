<template>
  <div>
    <q-form @submit="onSubmit(2)" @reset.prevent.stop="onReset">
      <q-card-section class="row items-center q-gutter-sm">
        <div class="col-12">
          <q-input
            dense
            ref="doc_ide"
            filled
            v-model="juridica.doc_ide"
            label="Numero de RUC"
            hint="Ingresa Numero de RUC"
            counter
            maxlength="11"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
          />
        </div>
        <div class="col-12">
          <q-input
            dense
            ref="raz_soc"
            filled
            v-model="juridica.raz_soc"
            label="Razon Social"
            hint="Ingresa Razon Social*"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
          />

        </div>
        <div class="col-12">
          <q-input
            dense
            ref="nom_com"
            filled
            v-model="juridica.nom_com"
            label="Nombre Comercial"
            hint="Ingresa Nombre Comercial*"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
          />
          
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="negative" @click="cerrar" outline>Cerrar </q-btn>
        <q-btn color="positive" type="submit" :loading="loadboton" outline
          >Guardar</q-btn
        >
      </q-card-actions>
    </q-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loadboton: false,
      juridica: {
        swt_pro: null,
        doc_ide: "",
        raz_soc: "",
        nom_com: "",
      },
    };
  },

  methods: {
    ...mapActions("personas", ["callPersonasAddJuridica", "callPersonas"]),
    cerrar() {
      this.$store.commit("personas/dialogCrear", false);
      //   this.$emit("click");
    },
    async onSubmit() {
      this.loadboton = true;
      console.log("submit");
      try {
        const respAdd = await this.callPersonasAddJuridica({
          doc_ide: this.juridica.doc_ide,
          raz_soc: this.juridica.raz_soc,
          nom_com: this.juridica.nom_com

        });
        console.log("respAdd", respAdd);
        if (respAdd.res == "ok") {
          this.$q.notify({
            message: `${respAdd.message}`,
          });
          this.loadboton = false;
          await this.callPersonas("all");
          this.$store.commit("personas/dialogCrear", false);
        } else if (respAdd.res == "ko") {
          this.$q.notify({
            message: `${respAdd.message}`,
          });
          this.loadboton = false;
        } else {
          this.$q.notify({
            message: `Error controlado`,
          });
          this.loadboton = false;
        }
      } catch (error) {
        console.log(error);
        this.$q.notify({
          message: `Error controlado`,
        });
        this.loadboton = false;
      }
    },

    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    },
  },
};
</script>