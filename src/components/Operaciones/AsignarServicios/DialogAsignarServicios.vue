<template>
  <div>
    <q-card class="full-height" square>
      <q-bar class="bg-primary text-white">
        Asignar Servicios tecnicos
        <q-space />
        <q-btn dense flat icon="close" @click="cerrar">
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <div class="row">
          <div class="col-xs-12 col-sm-9 q-px-sm">
            <!-- {{ get_lista_sermat_asignar }} -->
            <!-- {{ get_lista_sermat_evalua.sermat[1] }} -->
            <!-- <q-select
              v-model="clienteSelect"
              :options="get_combo_cliente.client"
              option-value="co_person"
              option-label="no_person"
              emit-value
              map-options
              label="Cliente o Propietario"
              filled
            /> -->
          </div>
          <div
            class="col-xs-12 col-sm-3 q-px-sm text-center"
            style="align-self: center"
          >
            <!-- <q-btn
              :loading="loadboton"
              class="full-width"
              size="md"
              color="primary"
              @click="registrarNuevaOperacion()"
              icon="check"
              label="Registrar"
            /> -->
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <TablaServicoTecnico />
      </q-card-section>

      <!-- <q-card-actions align="right">
        <q-btn flat label="Decline" color="primary" v-close-popup />
        <q-btn flat label="Accept" color="primary" v-close-popup />
      </q-card-actions> -->
    </q-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("operaciones", ["get_lista_sermat_asignar"]),
  },
  components: {
    TablaServicoTecnico: () => import("./TablaServicoTecnico"),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("operaciones", ["call_lista_operaci_evalua"]),
    async cerrar() {
      this.$store.commit("operaciones/operacionesid4", false);
      await this.call_lista_operaci_evalua({
        nom_cli: "",
        pla_veh: "",
      });
    },
  },
};
</script>