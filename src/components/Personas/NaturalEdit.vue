<template>
  <div>
    <q-form @submit="onSubmit()" @reset.prevent.stop="onReset">
      <q-card-section class="row items-center q-gutter-sm">
        <!--        {{ info }}-->
        <!--        {{ natural }}-->
        <div class="col-12">
          <q-input
            dense
            ref="dni"
            filled
            v-model="natural.doc_ide"
            label="DNI"
            hint="Ingresa DNI"
            maxlength="8"
            counter
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Campo obligatorio']"
          />
        </div>
        <div class="col-12">
          <q-input
            dense
            ref="nombres"
            filled
            v-model="natural.nombres"
            label="Nombres *"
            hint="Nombres *"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Campo obligatorio']"
          />
        </div>
        <div class="col-12">
          <q-input
            dense
            ref="ape_pat"
            filled
            v-model="natural.ape_pat"
            label="Apellido Paterno *"
            hint="Ingresa Apellido Paterno"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Campo obligatorio']"
          />
        </div>
        <div class="col-12">
          <q-input
            dense
            ref="ape_mat"
            filled
            v-model="natural.ape_mat"
            label="Apellido Materno *"
            hint="Ingresa Apellido Materno"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Campo obligatorio']"
          />
        </div>
        <div class="col-12">
          <q-input
            dense
            ref="telefo"
            filled
            v-model="natural.telefo"
            label="Numero de Telefono *"
            hint="Ingresa Numero de Telefono"
            maxlength="9"
            counter
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Campo obligatorio']"
          />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="negative" @click="cerrar" outline>Cerrar</q-btn>
        <!-- <q-btn color="warning" @click="cerrar" outline>reset</q-btn> -->
        <q-btn color="positive" type="submit" :loading="loadboton" outline
          >Guardar
        </q-btn>
      </q-card-actions>
    </q-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      loadboton: false,
      natural: {
        co_person: "",
        doc_ide: "",
        nombres: "",
        ape_pat: "",
        ape_mat: "",
        telefo: ""
      }
    };
  },

  methods: {
    ...mapActions("personas", ["callPersonasAddNatural", "callPersonas"]),
    cerrar() {
      this.$store.commit("personas/dialogEdit", false);
      //   this.$emit("click");
    },
    async onSubmit() {
      this.loadboton = true;
      console.log("submit");
      try {
        const respAdd = await this.callPersonasAddNatural(this.natural);
        console.log("respAdd", respAdd);
        if (respAdd.res == "ok") {
          this.$q.notify({
            message: `${respAdd.message}`
          });
          this.loadboton = false;
          await this.callPersonas("all");
          this.$store.commit("personas/dialogEdit", false);
        } else if (respAdd.res == "ko") {
          this.$q.notify({
            message: `${respAdd.message}`
          });
          this.loadboton = false;
        } else {
          this.$q.notify({
            message: `Error controlado`
          });
          this.loadboton = false;
        }
      } catch (error) {
        console.log(error);
        this.$q.notify({
          message: `Error controlado`
        });
        this.loadboton = false;
      }
    },

    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    }
  },
  created() {
    console.log(this.info);
    if (this.info) {
      // this.natural = this.info;
      this.natural.doc_ide = this.info.co_docide;
      this.natural.nombres = this.info.no_nombre;
      this.natural.ape_pat = this.info.no_apepat;
      this.natural.ape_mat = this.info.no_apemat;
      this.natural.telefon = this.info.nu_teléfo;
      // this.natural.co_person = this.info.co_person;
    } else {
      console.log("Naturtal para nuevos");
    }
  }
};
</script>
