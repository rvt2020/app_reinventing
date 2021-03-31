<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-secondary">
        <q-btn
          flat
          dense
          round
          icon="menu"
          color="white"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <!--        <q-separator dark vertical inset />-->

        <q-toolbar-title>
          <q-img src="logo2.png" spinner-color="white" width="100px" />
          / {{ $store.state.example.location }}
          <!--          Reinventing Admin-->
        </q-toolbar-title>

        <!--        <div>Quasar v{{ $q.version }}</div>-->
        <q-btn
          flat
          dense
          round
          color="black"
          aria-label="Menu"
          @click="activarProfile"
        >
          <q-avatar>
            <q-img :src="fotoPerfil" />
            <!--              4-->
            <!--            </q-badge>-->
          </q-avatar>
        </q-btn>
      </q-toolbar>
    </q-header>
    
    <q-drawer
      class="left-navigation"
      v-model="leftDrawerOpen"
      style="
        background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg) !important;
      "
      side="left"
      elevated
    >
      <div class="full-height" :class="$q.dark.isActive ? 'drawer_dark' : ''">
        <div style="height: 85vh; padding: 10px">
          <!--          <q-toolbar>-->
          <div class="text-center">
            <span> MENU </span>
          </div>
          <!--            <q-avatar>-->
          <!--              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />-->
          <!--            </q-avatar>-->

          <!--            <q-toolbar-title>MENU</q-toolbar-title>-->
          <!--          </q-toolbar>-->
          <hr />
          <q-scroll-area style="height: 100%">
            <q-list padding>
            
            <!-- INICIO MENU CONFIGURACION -->
              <q-expansion-item
                class="q-ma-sm navigation-item"
                expand-separator
                icon="assignment_turned_in"
                label="Configuracion"
                :content-inset-level="0.5"
              >
              
              <!-- USUARIOS -->
                <q-item
                  class="q-ma-sm navigation-item"
                  clickable
                  active-class="tab-active"
                  v-ripple
                  exact
                  @click="URL('/usuarios')"
                >
                  <q-item-section avatar>
                    <q-icon name="group" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Usuarios</q-item-label>
                  </q-item-section>
                </q-item>
                
              <!-- PERSONAS -->
                <q-item
                  class="q-ma-sm navigation-item"
                  clickable
                  active-class="tab-active"
                  v-ripple
                  exact
                  @click="URL('/personas')"
                >
                  <q-item-section avatar>
                    <q-icon name="face" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Personas</q-item-label>
                  </q-item-section>
                </q-item>

              <!-- MATERIALES -->
                <q-item
                  class="q-ma-sm navigation-item"
                  clickable
                  active-class="tab-active"
                  v-ripple
                  exact
                  @click="URL('/materiales')"
                >
                  <q-item-section avatar>
                    <q-icon name="list_alt" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Materiales</q-item-label>
                  </q-item-section>
                </q-item>
              
              </q-expansion-item>
            <!-- FIN MENU CONFIGURACION -->
              
              <EssentialLink
                v-for="link in essentialLinks"
                :key="link.title"
                v-bind="link"
              />

            <!-- INICIO MENU VEHICULOS -->

            <q-item
              class="q-ma-sm navigation-item"
              clickable
              active-class="tab-active"
              v-ripple
              exact
              @click="URL('/vehiculos')"
            >
              <q-item-section avatar>
                <q-icon name="directions_car" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Vehiculos</q-item-label>
              </q-item-section>
            </q-item>
            <!-- FIN MENU VEHICULOS -->
            
            <EssentialLink
                v-for="link in essentialLinks"
                :key="link.title"
                v-bind="link"
              />

            <!-- INICIO MENU CITAS -->

            <q-item
              class="q-ma-sm navigation-item"
              clickable
              active-class="tab-active"
              v-ripple
              exact
              @click="URL('/citas')"
            >
              <q-item-section avatar>
                <q-icon name="event" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Citas</q-item-label>
              </q-item-section>
            </q-item>
            <!-- FIN MENU CITAS -->
            
            <EssentialLink
                v-for="link in essentialLinks"
                :key="link.title"
                v-bind="link"
              />


            <!-- INICIO MENU OPERACIONES -->
              <q-expansion-item
                  class="q-ma-sm navigation-item"
                  expand-separator
                  icon="rule"
                  label="Operaciones"
                  :content-inset-level="0.5"
                >
                <!-- Operaciones -->
                <q-item
                  class="q-ma-sm navigation-item"
                  clickable
                  active-class="tab-active"
                  v-ripple
                  exact
                  @click="URL('/operaciones')"
                >
                  <q-item-section avatar>
                    <q-icon name="assignment_late" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Operaciones</q-item-label>
                  </q-item-section>
                </q-item>

                <!-- Imprimir Operacion -->
                <q-item
                  class="q-ma-sm navigation-item"
                  clickable
                  active-class="tab-active"
                  v-ripple
                  exact
                  @click="URL('/imprimiroperacion')"
                >
                  <q-item-section avatar>
                    <q-icon name="local_printshop" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Imprimir</q-item-label>
                  </q-item-section>
                </q-item>
              </q-expansion-item>
            <!-- FIN MENU OPERACIONES -->
            

              <EssentialLink
                v-for="link in essentialLinks"
                :key="link.title"
                v-bind="link"
              />

            <!-- INICIO MENU LOGISTICA -->
              <q-expansion-item
                class="q-ma-sm navigation-item"
                expand-separator
                icon="assignment_turned_in"
                label="Logistica"
                :content-inset-level="0.5"
              >
                <!-- ORDENES DE COMPRA -->
                <q-item
                  class="q-ma-sm navigation-item"
                  clickable
                  active-class="tab-active"
                  v-ripple
                  exact
                  @click="URL('/logisticas/ordenesdecompra')"
                >
                  <q-item-section avatar>
                    <q-icon name="assignment_late" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Ordenes de Compra</q-item-label>
                  </q-item-section>
                </q-item>

                <!-- TRAMITE DOCUMENTARIO -->
                <q-item
                  class="q-ma-sm navigation-item"
                  clickable
                  active-class="tab-active"
                  v-ripple
                  exact
                  @click="URL('/logisticas/tramitedoc')"
                >
                  <q-item-section avatar>
                    <q-icon name="receipt" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Trámite Documentario</q-item-label>
                  </q-item-section>
                </q-item>

                <!-- INGRESO DE ARTICULOS -->
                <q-item
                  class="q-ma-sm navigation-item"
                  clickable
                  active-class="tab-active"
                  v-ripple
                  exact
                  @click="URL('/logisticas/ingresoarticulos')"
                >
                  <q-item-section avatar>
                    <q-icon name="queue" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Ingresos de Articulos</q-item-label>
                  </q-item-section>
                </q-item>
                
                <!-- SALIDA DE ARTICULOS -->
                <q-item
                  class="q-ma-sm navigation-item"
                  clickable
                  active-class="tab-active"
                  v-ripple
                  exact
                  @click="URL('/logisticas/salidaarticulos')"
                >
                  <q-item-section avatar>
                    <q-icon name="call_made" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Salida de Articulos</q-item-label>
                  </q-item-section>
                </q-item>

              </q-expansion-item>
            <!-- FIN MENU LOGISTICA -->
            
            <!-- INICIO MENU FINANZAS -->
              <q-expansion-item
                class="q-ma-sm navigation-item"
                expand-separator
                icon="local_atm"
                label="Finanzas"
                :content-inset-level="0.5"
              >
                <!-- Facturar Operacion -->
                <q-item
                  class="q-ma-sm navigation-item"
                  clickable
                  active-class="tab-active"
                  v-ripple
                  exact
                  @click="URL('/facturaroperacion')"
                >
                  <q-item-section avatar>
                    <q-icon name="money" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Facturar Operación</q-item-label>
                  </q-item-section>
                </q-item>

              </q-expansion-item>
            <!-- FIN MENU FINANZAS -->
            
            <!-- INICIO MENU REPORTE -->
              <q-expansion-item
                class="q-ma-sm navigation-item"
                expand-separator
                icon="plagiarism"
                label="Reporte"
                :content-inset-level="0.5"
              >
                <!-- SUBMENU LOGISTICA -->
                <q-expansion-item
                  class="q-ma-sm navigation-item"
                  expand-separator
                  icon="receipt_long"
                  label="Logistica"
                  :content-inset-level="0.5"
                >
                  <!-- KARDEX -->
                  <q-item
                    class="q-ma-sm navigation-item"
                    clickable
                    active-class="tab-active"
                    v-ripple
                    exact
                    @click="URL('/reportes/kardex')"
                  >
                    <q-item-section avatar>
                      <q-icon name="assignment" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Kardex</q-item-label>
                    </q-item-section>
                  </q-item>

                  <!-- INVENTARIO VALORIZADO -->
                  <q-item
                    class="q-ma-sm navigation-item"
                    clickable
                    active-class="tab-active"
                    v-ripple
                    exact
                    @click="URL('/reportes/inventariovalorizado')"
                  >
                    <q-item-section avatar>
                      <q-icon name="assignment" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Inventario Valorizado</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-expansion-item>

                <!-- SUBMENU OPERACIONES -->
                <q-expansion-item
                  class="q-ma-sm navigation-item"
                  expand-separator
                  icon="receipt_long"
                  label="Operaciones"
                  :content-inset-level="0.5"
                >
                  <!-- REPORTE DIARIO -->
                  <q-item
                    class="q-ma-sm navigation-item"
                    clickable
                    active-class="tab-active"
                    v-ripple
                    exact
                    @click="URL('/reportes/reportediario')"
                  >
                    <q-item-section avatar>
                      <q-icon name="description" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Reporte Diario</q-item-label>
                    </q-item-section>
                  </q-item>
                
                  <!-- PRODUCCION OPERACIONES -->
                  <q-item
                    class="q-ma-sm navigation-item"
                    clickable
                    active-class="tab-active"
                    v-ripple
                    exact
                    @click="URL('/reportes/produccionoperaciones')"
                  >
                    <q-item-section avatar>
                      <q-icon name="description" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label
                        >Produccion General</q-item-label
                      >
                    </q-item-section>
                  </q-item>

                  <!-- SEGUIMIENTO MANTENIMIENTO -->
                  <q-item
                    class="q-ma-sm navigation-item"
                    clickable
                    active-class="tab-active"
                    v-ripple
                    exact
                    @click="URL('/reportes/seguimientomantenimiento')"
                  >
                    <q-item-section avatar>
                      <q-icon name="description" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label
                        >Seguimiento Mantenimiento</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                </q-expansion-item>


                <!-- GESTIONES DE LANDING -->
              
                <q-expansion-item
                  class="q-ma-sm navigation-item"
                  expand-separator
                  icon="receipt_long"
                  label="Landing"
                  :content-inset-level="0.5"
                >
                  <q-item
                    class="q-ma-sm navigation-item"
                    clickable
                    active-class="tab-active"
                    v-ripple
                    exact
                    @click="URL('/reportes/landing')"
                  >
                    <q-item-section avatar>
                      <q-icon name="description" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Gestion Landing</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-expansion-item>
              </q-expansion-item>
            
            <!-- MENU DE LANDINGS  -->
              <q-expansion-item
                class="q-ma-sm navigation-item"
                expand-separator
                icon="chrome_reader_mode"
                label="Landing"
                :content-inset-level="0.5"
              >
                 <!-- SUBMENU LANDINGS -->
                <q-expansion-item
                  class="q-ma-sm navigation-item"
                  expand-separator
                  icon="electric_rickshaw"
                  label="Moto Taxi"
                  :content-inset-level="0.5"
                >
                  <!-- GESTION INICIAL -->
                  <q-item
                    class="q-ma-sm navigation-item"
                    clickable
                    active-class="tab-active"
                    v-ripple
                    exact
                    @click="URL('/landing/chapatumototaxi')"
                  >
                    <q-item-section avatar>
                      <q-icon name="contact_phone" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Gestión Inicial</q-item-label>
                    </q-item-section>
                  </q-item>

                  <!-- GESTIONES PRECALIFICADAS -->
                  <q-expansion-item
                    class="q-ma-sm navigation-item"
                    expand-separator
                    icon="check_circle"
                    label="PreCalificadas"
                    :content-inset-level="0.5"
                  >
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Chapatumototaxiprecal')"
                    >
                      <q-item-section avatar>
                        <q-icon name="spellcheck" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Interesados</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Chapatumototaxiprecaleev')"
                    >
                      <q-item-section avatar>
                        <q-icon name="grid_on" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Evaluación</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Chapatumototaxiprecaleac')"
                    >
                      <q-item-section avatar>
                        <q-icon name="done_all" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Activación</q-item-label>
                      </q-item-section>
                    </q-item>

                  </q-expansion-item>
                  
                  <!-- GESTIONES RECHAZADAS -->
                  <q-expansion-item
                    class="q-ma-sm navigation-item"
                    expand-separator
                    icon="unpublished"
                    label="Rechazadas"
                    :content-inset-level="0.5"
                  >
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Chapatumototaxirechaz')"
                    >
                      <q-item-section avatar>
                        <q-icon name="spellcheck" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Interesados</q-item-label>
                      </q-item-section>
                    </q-item>
                    
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Chapatumototaxirechazeev')"
                    >
                      <q-item-section avatar>
                        <q-icon name="grid_on" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Evaluación</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Chapatumototaxirechazeac')"
                    >
                      <q-item-section avatar>
                        <q-icon name="done_all" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Activación</q-item-label>
                      </q-item-section>
                    </q-item>

                  </q-expansion-item>
                </q-expansion-item>

                <!-- MOTO LINEAL -->
                  
                <q-expansion-item
                  class="q-ma-sm navigation-item"
                  expand-separator
                  icon="two_wheeler"
                  label="Moto Lineal"
                  :content-inset-level="0.5"
                >
                
                  <q-item
                    class="q-ma-sm navigation-item"
                    clickable
                    active-class="tab-active"
                    v-ripple
                    exact
                    @click="URL('/landing/motolineal')"
                  >
                    <q-item-section avatar>
                      <q-icon name="contact_phone" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Gestión Inicial</q-item-label>
                    </q-item-section>
                  </q-item>

                  <!-- GESTIONES PRECALIFICADAS -->
                  <q-expansion-item
                    class="q-ma-sm navigation-item"
                    expand-separator
                    icon="check_circle"
                    label="PreCalificadas"
                    :content-inset-level="0.5"
                  >
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Motolinealprecal')"
                    >
                      <q-item-section avatar>
                        <q-icon name="spellcheck" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Interesados</q-item-label>
                      </q-item-section>
                    </q-item>
                    
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Motolinealprecaleev')"
                    >
                      <q-item-section avatar>
                        <q-icon name="grid_on" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Evaluación</q-item-label>
                      </q-item-section>
                    </q-item>
                  
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Motolinealprecaleac')"
                    >
                      <q-item-section avatar>
                        <q-icon name="done_all" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Activación</q-item-label>
                      </q-item-section>
                    </q-item>
                    
                  </q-expansion-item>

                  <!-- GESTIONES RECHAZADAS -->
                  <q-expansion-item
                    class="q-ma-sm navigation-item"
                    expand-separator
                    icon="unpublished"
                    label="Rechazadas"
                    :content-inset-level="0.5"
                  >
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Motolinealrechaz')"
                    >
                      <q-item-section avatar>
                        <q-icon name="spellcheck" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Interesados</q-item-label>
                      </q-item-section>
                    </q-item>
                    
                    
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Motolinealrechazeev')"
                    >
                      <q-item-section avatar>
                        <q-icon name="grid_on" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Evaluación</q-item-label>
                      </q-item-section>
                    </q-item>
                    
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Motolinealrechazeac')"
                    >
                      <q-item-section avatar>
                        <q-icon name="done_all" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Activación</q-item-label>
                      </q-item-section>
                    </q-item>
                    
                  </q-expansion-item>
                </q-expansion-item>

                <!-- TAXI PROPIO -->
                  
                <q-expansion-item
                  class="q-ma-sm navigation-item"
                  expand-separator
                  icon="local_taxi"
                  label="Taxi Propio"
                  :content-inset-level="0.5"
                >
                
                  <q-item
                    class="q-ma-sm navigation-item"
                    clickable
                    active-class="tab-active"
                    v-ripple
                    exact
                    @click="URL('/landing/taxipropio')"
                  >
                    <q-item-section avatar>
                      <q-icon name="contact_phone" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Gestión Inicial</q-item-label>
                    </q-item-section>
                  </q-item>

                  

                  <!-- GESTIONES PRECALIFICADAS -->
                  <q-expansion-item
                    class="q-ma-sm navigation-item"
                    expand-separator
                    icon="check_circle"
                    label="PreCalificadas"
                    :content-inset-level="0.5"
                  >
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Taxipropioprecal')"
                    >
                      <q-item-section avatar>
                        <q-icon name="spellcheck" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Interesados</q-item-label>
                      </q-item-section>
                    </q-item>
                      
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Taxipropioprecaleev')"
                    >
                      <q-item-section avatar>
                        <q-icon name="grid_on" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Evaluación</q-item-label>
                      </q-item-section>
                    </q-item>
                    
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Taxipropioprecaleac')"
                    >
                      <q-item-section avatar>
                        <q-icon name="done_all" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Activación</q-item-label>
                      </q-item-section>
                    </q-item>
                    
                  </q-expansion-item>
                  
                  <!-- GESTIONES RECHAZADAS -->
                  
                  <q-expansion-item
                    class="q-ma-sm navigation-item"
                    expand-separator
                    icon="unpublished"
                    label="Rechazadas"
                    :content-inset-level="0.5"
                  >
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Taxipropiorechaz')"
                    >
                      <q-item-section avatar>
                        <q-icon name="spellcheck" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Interesados</q-item-label>
                      </q-item-section>
                    </q-item>
                    
                    
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Taxipropiorechazeev')"
                    >
                      <q-item-section avatar>
                        <q-icon name="grid_on" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Evaluación</q-item-label>
                      </q-item-section>
                    </q-item>
                    
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Taxipropiorechazeac')"
                    >
                      <q-item-section avatar>
                        <q-icon name="done_all" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Activación</q-item-label>
                      </q-item-section>
                    </q-item>
                    
                  </q-expansion-item>

                </q-expansion-item>

                <!-- Efectivo al Toque -->
                  
                <q-expansion-item
                  class="q-ma-sm navigation-item"
                  expand-separator
                  icon="local_atm"
                  label="Efectivo al Toque"
                  :content-inset-level="0.5"
                >
                  <q-item
                    class="q-ma-sm navigation-item"
                    clickable
                    active-class="tab-active"
                    v-ripple
                    exact
                    @click="URL('/landing/efectivoaltoque')"
                  >
                    <q-item-section avatar>
                      <q-icon name="contact_phone" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Gestión Inicial</q-item-label>
                    </q-item-section>
                  </q-item>

                  

                  <!-- GESTIONES PRECALIFICADAS -->
                  <q-expansion-item
                    class="q-ma-sm navigation-item"
                    expand-separator
                    icon="check_circle"
                    label="PreCalificadas"
                    :content-inset-level="0.5"
                  >
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Efectivoaltoqueprecal')"
                    >
                      <q-item-section avatar>
                        <q-icon name="spellcheck" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Interesados</q-item-label>
                      </q-item-section>
                    </q-item>
                      
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Efectivoaltoqueprecaleev')"
                    >
                      <q-item-section avatar>
                        <q-icon name="grid_on" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Evaluación</q-item-label>
                      </q-item-section>
                    </q-item>
                    
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Efectivoaltoqueprecaleac')"
                    >
                      <q-item-section avatar>
                        <q-icon name="done_all" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Activación</q-item-label>
                      </q-item-section>
                    </q-item>
                    
                  </q-expansion-item>
                  
                  <!-- GESTIONES RECHAZADAS -->
                  
                  <q-expansion-item
                    class="q-ma-sm navigation-item"
                    expand-separator
                    icon="unpublished"
                    label="Rechazadas"
                    :content-inset-level="0.5"
                  >
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Efectivoaltoquerechaz')"
                    >
                      <q-item-section avatar>
                        <q-icon name="spellcheck" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Interesados</q-item-label>
                      </q-item-section>
                    </q-item>
                    
                    
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Efectivoaltoquerechazeev')"
                    >
                      <q-item-section avatar>
                        <q-icon name="grid_on" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Evaluación</q-item-label>
                      </q-item-section>
                    </q-item>
                    
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Efectivoaltoquerechazeac')"
                    >
                      <q-item-section avatar>
                        <q-icon name="done_all" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Activación</q-item-label>
                      </q-item-section>
                    </q-item>
                    
                  </q-expansion-item>
                  
                </q-expansion-item>

                
                <q-expansion-item
                  class="q-ma-sm navigation-item"
                  expand-separator
                  icon="car_repair"
                  label="Conversiones"
                  :content-inset-level="0.5"
                >
                  <q-item
                    class="q-ma-sm navigation-item"
                    clickable
                    active-class="tab-active"
                    v-ripple
                    exact
                    @click="URL('/landing/conversiones')"
                  >
                    <q-item-section avatar>
                      <q-icon name="contact_phone" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Gestión Inicial</q-item-label>
                    </q-item-section>
                  </q-item>

                  <!-- GESTIONES PRECALIFICADAS -->
                  <q-expansion-item
                    class="q-ma-sm navigation-item"
                    expand-separator
                    icon="check_circle"
                    label="PreCalificadas"
                    :content-inset-level="0.5"
                  >
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Conversionesprecal')"
                    >
                      <q-item-section avatar>
                        <q-icon name="spellcheck" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Interesados</q-item-label>
                      </q-item-section>
                    </q-item>
                      
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Conversionesprecaleev')"
                    >
                      <q-item-section avatar>
                        <q-icon name="grid_on" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Evaluación</q-item-label>
                      </q-item-section>
                    </q-item>
                    
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Conversionesprecaleac')"
                    >
                      <q-item-section avatar>
                        <q-icon name="done_all" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Activación</q-item-label>
                      </q-item-section>
                    </q-item>
                    
                  </q-expansion-item>
                  
                  <!-- GESTIONES RECHAZADAS -->
                  
                  <q-expansion-item
                    class="q-ma-sm navigation-item"
                    expand-separator
                    icon="unpublished"
                    label="Rechazadas"
                    :content-inset-level="0.5"
                  >
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Conversionesrechaz')"
                    >
                      <q-item-section avatar>
                        <q-icon name="spellcheck" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Interesados</q-item-label>
                      </q-item-section>
                    </q-item>
                    
                    
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Conversionesrechazeev')"
                    >
                      <q-item-section avatar>
                        <q-icon name="grid_on" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Evaluación</q-item-label>
                      </q-item-section>
                    </q-item>
                    
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Conversionesrechazeac')"
                    >
                      <q-item-section avatar>
                        <q-icon name="done_all" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Activación</q-item-label>
                      </q-item-section>
                    </q-item>
                    
                  </q-expansion-item>
                    


                </q-expansion-item>

              </q-expansion-item>

              <q-item
                class="q-ma-sm navigation-item"
                clickable
                active-class="tab-active"
                v-ripple
                exact
                @click="Logout()"
              >
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Salir</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </div>
      </div>
    </q-drawer>
    
    <q-page-container>
      <router-view />
    </q-page-container>
    
    
    <q-dialog v-model="dialogPerfil">
      <div style="width: 80%">
        <q-card>
          <!--          <q-card-section @click="alert = true" align="center">-->
          <q-card-section @click="alert = true" align="center">
            <q-img width="200px" class="rounded-borders" :src="fotoPerfil" />
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input filled v-model="userLocal.no_nombre" label="Nombres" />

              <q-input
                filled
                v-model="userLocal.no_apepat"
                label="Apellido Paterno"
              />

              <q-input
                filled
                v-model="userLocal.no_apemat"
                label="Apellido Materno"
              />

              <q-input filled v-model="userLocal.no_usuari" label="Usuario" />

              <!--              <q-input filled v-model="userLocal.phone" label="password" />-->

              <!--              <div>-->
              <!--                <q-btn label="Update" type="submit" color="primary" />-->
              <!--              </div>-->
            </q-form>
          </q-card-section>
        </q-card>
      </div>
      <q-dialog v-model="alert">
        <q-card>
          <Test @click="cerrarDialog" />
        </q-card>
      </q-dialog>
    </q-dialog>


    <q-dialog
      v-model="dialogIngresoVehicular"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-up"
      full-height
      full-width
    >
      <DialogIngresoVehicular />
    </q-dialog>


    <q-dialog
      v-model="UploadBasic"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <!--          <q-icon name="network_wifi" />-->
          <!--          <q-icon name="network_cell" />-->
          <!--          <q-icon name="battery_full" />-->

          <div>Archivos Multiples {{ fechaActual }}</div>

          <q-space />

          <q-btn dense flat icon="close" @click="cerrarUpdaloadBasic">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="q-pt-none">
          <TagUploadBasic />
        </q-card-section>
      </q-card>
    </q-dialog>


  </q-layout>
</template>

<script>
  import { storagelocal } from "../mixins/mixin";
  import EssentialLink from "components/EssentialLink.vue";
  import { mapActions, mapGetters, mapState } from "vuex";
  import { date } from "quasar";
  let timeStamp = Date.now();
  let formattedString = date.formatDate(timeStamp, "YYYY-MM-DD");
  const linksData = [
  // {
  //   title: "Usuarios",
  //   caption: "quasar.dev",
  //   icon: "group",
  //   link: "/usuarios"
  // },
  //  {
  //    title: "Vehiculos",
  //    caption: "github.com/quasarframework",
  //    icon: "directions_car",
  //    link: "/vehiculos",
  //  },
  // {
  //   title: "Personas",
  //   caption: "github.com/quasarframework",
  //   icon: "face",
  //   link: "/personas"
  // },
    //{
    //  title: "Citas",
    //  caption: "github.com/quasarframework",
    //  icon: "event",
    //  link: "/citas",
    //}
    /*,
    {
      title: "Operaciones",
      caption: "github.com/quasarframework",
      icon: "rule",
      link: "/operaciones",
    },
    {
      title: "Llamadas",
      caption: "github.com/quasarframework",
      icon: "perm_phone_msg",
      link: "/llamadas"
  }*/
];

export default {
  name: "MainLayout",
  mixins: [storagelocal],
  computed: {
    fechaActual() {
      return formattedString;
    },
    fotoPerfil() {
      if (this.userLocal.co_fotper) {
        return `${process.env.Imagen_URL}/files/${this.userLocal.co_fotper}`;
      } else {
        return `https://cdn.quasar.dev/img/boy-avatar.png`;
      }
    },
    ...mapState("example", ["dialogIngresoVehicular", "UploadBasic"]),
  },
  components: {
    EssentialLink,
    Profile: () => import("pages/Profile"),
    Test: () => import("pages/Test"),
    DialogIngresoVehicular: () =>
      import("components/Vehiculos/IngresoVehicular"),
    TagUploadBasic: () => import("components/Upload/UploadBasic"),
  },
  data() {
    return {
      maximizedToggle: false,
      alert: false,
      info: null,
      user: {
        first_name: "",
        last_name: "",
        age: null,
        email: "",
        phone: "",
      },
      dialogPerfil: false,
      leftDrawerOpen: false,
      essentialLinks: linksData,
    };
  },
  methods: {
    cerrarUpdaloadBasic() {
      this.$store.commit("example/UploadBasic", false);
    },
    URL(arg) {
      this.$router.push(arg);
    },
    cerrarDialog() {
      this.alert = false;
      this.dialogPerfil = false;
    },
    activarProfile() {
      this.dialogPerfil = true;
      const info = this.$q.localStorage.getAll();
      this.info = info;
      console.log(info);
    },
    Logout() {
      this.$q.loading.show();
      this.$q.localStorage.clear();
      // setTimeout(() => {
      this.$router.push("/auth");
      this.$q.notify({
        // progress: true,
        message: "Regresa pronto",
        // icon: "favorite_border",
        // icon: "favorite",
        color: "white",
        textColor: "blue-5",
        position: "top",
      });
      this.$q.loading.hide();
      // }, 2000);
    },
  },
};
</script>
<style>
.q-drawer {
  /*background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg) !important;*/
  /*background-image: url("../assets/images/lake.jpg") !important;*/
  /*background-size: cover !important;*/
}

.drawer_normal {
  background-color: rgba(1, 1, 1, 0.75);
}

.drawer_dark {
  background-color: #010101f2;
}

.navigation-item {
  border-radius: 5px;
}

.tab-active {
  background-color: green;
}

body {
  background: #f1f1f1 !important;
}

.header_normal {
  background: linear-gradient(
    145deg,
    rgb(32, 106, 80) 15%,
    rgb(21, 57, 102) 70%
  );
}

.header_dark {
  background: linear-gradient(145deg, rgb(61, 14, 42) 15%, rgb(14, 43, 78) 70%);
}
</style>
