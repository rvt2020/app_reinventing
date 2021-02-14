<template>
  <div class="q-pa-xs">
    <q-markup-table
      dense
      color="primary"
      card-class=""
      table-class="text-grey-8"
      table-header-class="text-brown"
    >
      <thead class="bg-amber-1 text-brown">
        <tr>
          <th colspan="5">
            <div class="row no-wrap items-center">
              <div class="text-h6">Cliente</div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="text-grey-8">
        <tr>
          <td class="text-left">Tipo Persona</td>
          <td class="text-right">{{ info[0].no_tipper }}</td>
        </tr>
        <tr>
          <td class="text-left">DNI / RUC</td>
          <td class="text-right">{{ info[0].no_person }}</td>
        </tr>
        <tr>
          <td class="text-left">Cliente</td>
          <td class="text-right">{{ info[0].co_docide }}</td>
        </tr>
      </tbody>
    </q-markup-table>
    
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Array,
      default: [
        function () {
          return [
            {
              co_operac: "",
              no_operac: "",
              fe_regist: "",
              co_perreg: "",
              no_perreg: "",
              ti_estope: "",
              no_estope: "",
              im_serint: "",
              im_serext: "",
              im_totmat: "",
              im_totser: "",
            },
          ];
        },
      ],
    },
    titulo: {
      type: String,
    },
    hideheader: {
      type: Boolean,
    },
    hidebottom: {
      type: Boolean,
    },
  },
  name: "Tabla",
  methods: {
    agregarServiciosMateriales() {
      console.log("Se preciono agregarServiciosMateriales");
      this.$emit("click");
    },
    agregarServiciosMateriales() {
      console.log("Se preciono agregarServiciosMateriales");
      this.$emit("click");
    }
  }
};
</script>

<style scoped></style>
