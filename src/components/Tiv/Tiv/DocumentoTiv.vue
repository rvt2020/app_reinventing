<template>
  <q-page>
    <div>
      <q-tabs
        class="text-grey-5"
        active-color="primary"
        indicator-color="primary"
        v-model="tab"
        narrow-indicator
        align="justify"
      >
        <q-tab name="1" label="General" />
        <q-tab name="2" label="Sin Clientes" />
        <q-tab name="3" label="Con Clientes" />
        <q-tab name="4" label="Documentados" />
        <q-tab name="5" label="Distribuidos" />
        <q-tab name="6" label="En Trámite" />
        <q-tab name="7" label="Inscritos" />
        <q-tab name="8" label="Citados" />
        <q-tab name="9" label="Entregados" />
        
      </q-tabs>
      <div class="q-gutter-y-sm">
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="fade"
          transition-next="fade"
        >
          <!-- ARTICULOS QUE SON VEHICULOS -->
          <q-tab-panel name="1">
            <div class="row"><div class="col"> <ListaTiv /> </div></div>
          </q-tab-panel>
          
          <q-tab-panel name="2">
            <div class="row"><div class="col"><ListaSinClientes /></div></div>
          </q-tab-panel>

          <q-tab-panel name="3">
            <div class="row"><div class="col"><ListaConClientes /></div></div>
          </q-tab-panel>
          
          <q-tab-panel name="4">
            <div class="row"><div class="col"><Documentados /></div></div>
          </q-tab-panel>
          
          <q-tab-panel name="5">
            <div class="row"><div class="col"><Distribuidos /></div></div>
          </q-tab-panel>
          
          <q-tab-panel name="6">
            <div class="row"><div class="col"><EnTramite /></div></div>
          </q-tab-panel>
          
          <q-tab-panel name="7">
            <div class="row"><div class="col"><Inscritos /></div></div>
          </q-tab-panel>
          
          <q-tab-panel name="8">
            <div class="row"><div class="col"><Citados /></div></div>
          </q-tab-panel>
          
          <q-tab-panel name="9">
            <div class="row"><div class="col"><Entregados /></div></div>
          </q-tab-panel>
          
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageOperaciones",
  data() {
    return {
      tab: "1"
    };
  },
  components: {
   //COMPRA DE ARTICULOS QUE SON VEHICULOS
    ListaTiv: () => import("components/Tiv/Tiv/ParaTramite/ListaTiv"),

    ListaSinClientes: () => import("components/Tiv/Tiv/SinClientes/ListaSinClientes"),

    ListaConClientes: () => import("components/Tiv/Tiv/ConClientes/ListaConClientes"),

    Documentados: () => import("components/Tiv/Tiv/Documentados/Documentados"),

    Distribuidos: () => import("components/Tiv/Tiv/Distribuidos/Distribuidos"),

    EnTramite: () => import("components/Tiv/Tiv/EnTramite/EnTramite"),

    Inscritos: () => import("components/Tiv/Tiv/Inscritos/Inscritos"),

    Citados: () => import("components/Tiv/Tiv/Citados/Citados"),

    Entregados: () => import("components/Tiv/Tiv/Entregados/Entregados"),

    //TITULOS
    Titulos: () => import("components/Titulos")
  },
  
  methods: {
    boton(val) {
      // console.log("Boton en Materiales");
      this.tipo = val;
      if (val === 1) {
        this.$store.commit("materiales/dialogCrear", true);
      } else if (val === 2) {
        this.dataEdit = this.$store.state.materiales.dataEdit;
        this.$store.commit("materiales/dialogCrear", true);
      }
    }
  },
  async created() {
    this.$store.commit("example/location", "Tiv");
    if (this.$route.query.id != undefined) {
      this.tab = `${this.$route.query.id}`;
    }
  }
};
</script>
