<template>
  <div class="">
    <q-table
      color="primary"
      card-class="bg-amber-1 text-brown"
      table-class="text-grey-8"
      table-header-class="text-brown"
      class="my-sticky-header-table"
      title="Vehiculos"
      :data="get_lista_vehiculo_ingreso.vehic"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <div>
            <q-badge color="purple" :label="props.value" />
          </div>
          <div class="my-table-details">
            {{ props.row.details }}
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("operaciones", [
      "get_combo_cliente",
      "get_lista_vehiculo_ingreso",
    ]),
  },
  data() {
    return {
      columns: [
        {
          name: "name",
          required: true,
          label: "N°",
          align: "left",
          field: (row) => row.co_aduana,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "fe_aduana",
          align: "center",
          label: "Fecha de Registro",
          field: "fe_aduana",
          sortable: true,
        },
        {
          name: "co_plaveh",
          label: "Placa",
          field: "co_plaveh",
          sortable: true,
        },
        { name: "no_marveh", label: "Marca", field: "no_marveh" },
        { name: "nu_anomod", label: "Año", field: "nu_anomod" },
        { name: "no_colveh", label: "Color", field: "no_colveh" },
        {
          name: "nu_serveh",
          label: "Chasis",
          field: "nu_serveh",
          sortable: true,
        },
        {
          name: "nu_motveh",
          label: "Motor",
          field: "nu_motveh",
          sortable: true,
        },
      ],

      data: [],
    };
  },
};
</script>