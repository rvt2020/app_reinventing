<template>
  <div class="">
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      class="my-sticky-header-table"
      title="Operaciones"
      :data="info"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body-cell-acciones="props">
        <q-td :props="props">
          <q-btn
            color="primary"
            @click="Abrrir(props.row)"
            size="sm"
            label="Abrrir"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  name: "TablaBuscarOperacion",
  computed: {
    ...mapGetters("operaciones", [
      "get_combo_cliente",
      "get_lista_vehiculo_ingreso"
    ])
  },
  data() {
    return {
      columns: [
        {
          name: "desc",
          required: true,
          label: "Fecha de Registro",
          align: "left",
          field: row => row.fe_regist,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "us_regist",
          align: "center",
          label: "Usuario",
          field: "us_regist",
          sortable: true
        },
        {
          name: "co_operac",
          label: "N° Operación",
          field: "co_operac",
          sortable: true
        },
        { name: "no_client", label: "Cliente", field: "no_client" },
        { name: "no_estado", label: "Estado", field: "no_estado" },
        { name: "co_plaveh", label: "Placa", field: "co_plaveh" },
        { name: "no_marveh", label: "Marca", field: "no_marveh" },
        { name: "no_modveh", label: "Modelo", field: "no_modveh" },
        { name: "no_verveh", label: "Versión", field: "no_verveh" },
        { name: "nu_anomod", label: "Año", field: "nu_anomod" },
        { name: "color", label: "Color", field: "color" },
        { name: "nu_serveh", label: "Chasis", field: "nu_serveh" },
        { name: "nu_motveh", label: "Motor", field: "nu_motveh" },
        { name: "acciones", label: "Acciones", field: "acciones" }
      ],
      data: []
    };
  },
  methods: {
    Abrrir(val) {
      console.log(val);
      this.$router.push(`/operaciones?id=2&op=${val.co_operac}`);
      this.$router.go();
    }
  }
};
</script>
