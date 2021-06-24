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
                v-if=Modulo_Configuracion
              >
              <!-- USUARIOS -->
                <q-item
                  class="q-ma-sm navigation-item"
                  clickable
                  active-class="tab-active"
                  v-ripple
                  exact
                  @click="URL('/usuarios')"
                  v-if=Modulo_Configuracion_Usuarios
                  
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
                  v-if=Modulo_Configuracion_Personas
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
                  v-if=Modulo_Configuracion_Materiales
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
              v-if=Modulo_Vehiculos
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
              v-if=Modulo_Citas
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
            <q-item
              class="q-ma-sm navigation-item"
              clickable
              active-class="tab-active"
              v-ripple
              exact
              @click="URL('/operaciones')"
              v-if=Modulo_Operaciones
            >
              <q-item-section avatar>
                <q-icon name="car_repair" />
              </q-item-section>

              <q-item-section>
               <q-item-label>Operaciones</q-item-label>
              </q-item-section>
            </q-item>
            
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
                v-if=Modulo_Logistica
              >
                <!-- ORDENES DE COMPRA -->
                <q-item
                  class="q-ma-sm navigation-item"
                  clickable
                  active-class="tab-active"
                  v-ripple
                  exact
                  @click="URL('/logisticas/ordenesdecompra')"
                  v-if=Modulo_Logistica_OrdenCompra
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
                  v-if=Modulo_Logistica_TramiteDocumentario
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
                  v-if=Modulo_Logistica_IngresoArticulos
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
                  v-if=Modulo_Logistica_SalidaArticulos
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
                v-if=Modulo_Finanzas
              >
                <!-- Facturar Operacion -->
                <q-item
                  class="q-ma-sm navigation-item"
                  clickable
                  active-class="tab-active"
                  v-ripple
                  exact
                  @click="URL('/finanzas/documentosdeventa')"
                  v-if=Modulo_Finanzas_Facturaciones
                >
                  <q-item-section avatar>
                    <q-icon name="money" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Facturaciones</q-item-label>
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
                v-if=Modulo_Reportes
              >
                <!-- SUBMENU LOGISTICA -->
                <q-expansion-item
                  class="q-ma-sm navigation-item"
                  expand-separator
                  icon="receipt_long"
                  label="Logistica"
                  :content-inset-level="0.5"
                  v-if=Modulo_Reportes_Logistica
                >
                  <!-- KARDEX -->
                  <q-item
                    class="q-ma-sm navigation-item"
                    clickable
                    active-class="tab-active"
                    v-ripple
                    exact
                    @click="URL('/reportes/kardex')"
                    v-if=Modulo_Reportes_Logistica_Kardex
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
                    v-if=Modulo_Reportes_Logistica_InventarioValorizado
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
                  v-if=Modulo_Reportes_Operaciones

                >
                  <!-- REPORTE DIARIO -->
                  <q-item
                    class="q-ma-sm navigation-item"
                    clickable
                    active-class="tab-active"
                    v-ripple
                    exact
                    @click="URL('/reportes/reportediario')"
                    v-if=Modulo_Reportes_Operaciones_ReporteDiario
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
                    v-if=Modulo_Reportes_Operaciones_ProduccionOperaciones
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
                    v-if=Modulo_Reportes_Operaciones_SeguimientoMantenimiento
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
                  v-if=Modulo_Reportes_Landing

                >
                  <q-item
                    class="q-ma-sm navigation-item"
                    clickable
                    active-class="tab-active"
                    v-ripple
                    exact
                    @click="URL('/reportes/landing')"
                    v-if=Modulo_Reportes_Landing_Landing
                  >
                    <q-item-section avatar>
                      <q-icon name="description" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Gestion Landing</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-expansion-item>

                <!-- COMISIONES REFERIDOS -->
              
                <q-expansion-item
                  class="q-ma-sm navigation-item"
                  expand-separator
                  icon="receipt_long"
                  label="Referidos"
                  :content-inset-level="0.5"
                  v-if=Modulo_Reportes_Referidos
                >
                  <q-item
                    class="q-ma-sm navigation-item"
                    clickable
                    active-class="tab-active"
                    v-ripple
                    exact
                    @click="URL('/reportes/referidos')"
                    v-if=Modulo_Reportes_Referidos_Referidos
                  >
                    <q-item-section avatar>
                      <q-icon name="description" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Referidos Comisiones</q-item-label>
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
                v-if=Modulo_Landing
              >
                 <!-- SUBMENU LANDINGS -->
                <q-expansion-item
                  class="q-ma-sm navigation-item"
                  expand-separator
                  icon="electric_rickshaw"
                  label="Moto Taxi"
                  :content-inset-level="0.5"
                  v-if=Modulo_Landing_MotoTaxi
                >
                  <!-- GESTION INICIAL -->
                  <q-item
                    class="q-ma-sm navigation-item"
                    clickable
                    active-class="tab-active"
                    v-ripple
                    exact
                    @click="URL('/landing/chapatumototaxi')"
                    v-if=Modulo_Landing_MotoTaxi_GestionInicial
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
                    v-if=Modulo_Landing_MotoTaxi_Precalificadas
                  >
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Chapatumototaxiprecal')"
                      v-if=Modulo_Landing_MotoTaxi_Precalificadas_Interesados
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
                      v-if=Modulo_Landing_MotoTaxi_Precalificadas_Evaluacion
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
                      v-if=Modulo_Landing_MotoTaxi_Precalificadas_Activacion
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
                    v-if=Modulo_Landing_MotoTaxi_Rechazadas
                  >
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Chapatumototaxirechaz')"
                      v-if=Modulo_Landing_MotoTaxi_Rechazadas_Interesados
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
                      v-if=Modulo_Landing_MotoTaxi_Rechazadas_Evaluacion
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
                      v-if=Modulo_Landing_MotoTaxi_Rechazadas_Activacion
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
                  v-if=Modulo_Landing_MotoLineal
                >
                
                  <q-item
                    class="q-ma-sm navigation-item"
                    clickable
                    active-class="tab-active"
                    v-ripple
                    exact
                    @click="URL('/landing/motolineal')"
                    v-if=Modulo_Landing_MotoLineal_GestionInicial
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
                    v-if=Modulo_Landing_MotoLineal_Precalificadas
                  >
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Motolinealprecal')"
                      v-if=Modulo_Landing_MotoLineal_Precalificadas_Interesados
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
                      v-if=Modulo_Landing_MotoLineal_Precalificadas_Evaluacion
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
                      v-if=Modulo_Landing_MotoLineal_Precalificadas_Activacion
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
                    v-if=Modulo_Landing_MotoLineal_Rechazadas
                  >
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Motolinealrechaz')"
                      v-if=Modulo_Landing_MotoLineal_Rechazadas_Interesados
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
                      v-if=Modulo_Landing_MotoLineal_Rechazadas_Evaluacion
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
                      v-if=Modulo_Landing_MotoLineal_Rechazadas_Activacion
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
                  v-if=Modulo_Landing_TaxiPropio
                >
                
                  <q-item
                    class="q-ma-sm navigation-item"
                    clickable
                    active-class="tab-active"
                    v-ripple
                    exact
                    @click="URL('/landing/taxipropio')"
                    v-if=Modulo_Landing_TaxiPropio_GestionInicial
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
                    v-if=Modulo_Landing_TaxiPropio_Precalificadas
                  >
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Taxipropioprecal')"
                      v-if=Modulo_Landing_TaxiPropio_Precalificadas_Interesados
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
                      v-if=Modulo_Landing_TaxiPropio_Precalificadas_Evaluacion
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
                      v-if=Modulo_Landing_TaxiPropio_Precalificadas_Activacion
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
                    v-if=Modulo_Landing_TaxiPropio_Rechazadas
                  >
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Taxipropiorechaz')"
                      v-if=Modulo_Landing_TaxiPropio_Rechazadas_Interesados
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
                      v-if=Modulo_Landing_TaxiPropio_Rechazadas_Evaluacion
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
                      v-if=Modulo_Landing_TaxiPropio_Rechazadas_Activacion
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
                  v-if=Modulo_Landing_EfectivoalToque
                >
                  <q-item
                    class="q-ma-sm navigation-item"
                    clickable
                    active-class="tab-active"
                    v-ripple
                    exact
                    @click="URL('/landing/efectivoaltoque')"
                    v-if=Modulo_Landing_EfectivoalToque_GestionInicial
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
                    v-if=Modulo_Landing_EfectivoalToque_Precalificadas
                  >
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Efectivoaltoqueprecal')"
                      v-if=Modulo_Landing_EfectivoalToque_Precalificadas_interesados
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
                      v-if=Modulo_Landing_EfectivoalToque_Precalificadas_Evaluacion
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
                      v-if=Modulo_Landing_EfectivoalToque_Precalificadas_Activacion
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
                    v-if=Modulo_Landing_EfectivoalToque_Rechazadas
                  >
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Efectivoaltoquerechaz')"
                      v-if=Modulo_Landing_EfectivoalToque_Rechazadas_Interesados
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
                      v-if=Modulo_Landing_EfectivoalToque_Rechazadas_Evaluacion
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
                      v-if=Modulo_Landing_EfectivoalToque_Rechazadas_Activacion
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
                  v-if=Modulo_Landing_Conversiones
                >
                  <q-item
                    class="q-ma-sm navigation-item"
                    clickable
                    active-class="tab-active"
                    v-ripple
                    exact
                    @click="URL('/landing/conversiones')"
                    v-if=Modulo_Landing_Conversiones_GestionInicial
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
                    v-if=Modulo_Landing_Conversiones_Precalificadas
                  >
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Conversionesprecal')"
                      v-if=Modulo_Landing_Conversiones_Precalificadas_Interesados
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
                      v-if=Modulo_Landing_Conversiones_Precalificadas_Evaluacion
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
                      v-if=Modulo_Landing_Conversiones_Precalificadas_Activacion
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
                    v-if=Modulo_Landing_Conversiones_Rechazadas
                  >
                    <q-item
                      class="q-ma-sm navigation-item"
                      clickable
                      active-class="tab-active"
                      v-ripple
                      exact
                      @click="URL('/landing/Conversionesrechaz')"
                      v-if=Modulo_Landing_Conversiones_Rechazadas_Interesados
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
                      v-if=Modulo_Landing_Conversiones_Rechazadas_Evaluacion
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
                      v-if=Modulo_Landing_Conversiones_Rechazadas_Activacion
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
      /////////////////////////////CONFIGURACION//////////////////////////////////////////
      Modulo_Configuracion() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },

      Modulo_Configuracion_Usuarios() { 
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
       },
      Modulo_Configuracion_Personas() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Configuracion_Materiales() { return true; },

      
      /////////////////////////////VEHICULOS//////////////////////////////////////////
      Modulo_Vehiculos() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      
      /////////////////////////////CITAS//////////////////////////////////////////
      Modulo_Citas() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      
      
      /////////////////////////////OPERACIONES//////////////////////////////////////////
      Modulo_Operaciones() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      
      /////////////////////////////LOGISTICA//////////////////////////////////////////
      Modulo_Logistica() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      
      Modulo_Logistica_OrdenCompra() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Logistica_TramiteDocumentario() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Logistica_IngresoArticulos() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Logistica_SalidaArticulos() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },

      /////////////////////////////FINANZAS//////////////////////////////////////////
      Modulo_Finanzas() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      
      Modulo_Finanzas_Facturaciones() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },

      /////////////////////////////REPORTES//////////////////////////////////////////
      Modulo_Reportes() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      
      Modulo_Reportes_Logistica() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Reportes_Logistica_Kardex() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Reportes_Logistica_InventarioValorizado() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Reportes_Operaciones() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Reportes_Operaciones_ReporteDiario() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Reportes_Operaciones_ProduccionOperaciones() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Reportes_Operaciones_SeguimientoMantenimiento() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Reportes_Landing() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Reportes_Landing_Landing() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Reportes_Referidos() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Reportes_Referidos_Referidos() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },

      /////////////////////////////LANGING//////////////////////////////////////////
      Modulo_Landing() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4011 || // JOSEPH CARRION
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return true;
        } else {
          return true; 
        }
      },
      
      Modulo_Landing_MotoTaxi() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      
      Modulo_Landing_MotoTaxi_GestionInicial() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
        
      },
      Modulo_Landing_MotoTaxi_Precalificadas() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Landing_MotoTaxi_Precalificadas_Interesados() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Landing_MotoTaxi_Precalificadas_Evaluacion() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Landing_MotoTaxi_Precalificadas_Activacion() { return true; },
      Modulo_Landing_MotoTaxi_Rechazadas() { return true; },
      Modulo_Landing_MotoTaxi_Rechazadas_Interesados() { return true; },
      Modulo_Landing_MotoTaxi_Rechazadas_Evaluacion() { return true; },
      Modulo_Landing_MotoTaxi_Rechazadas_Activacion() { return true; },

      Modulo_Landing_MotoLineal() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010// EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      
      Modulo_Landing_MotoLineal_GestionInicial() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Landing_MotoLineal_Precalificadas() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Landing_MotoLineal_Precalificadas_Interesados() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Landing_MotoLineal_Precalificadas_Evaluacion() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Landing_MotoLineal_Precalificadas_Activacion() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Landing_MotoLineal_Rechazadas() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Landing_MotoLineal_Rechazadas_Interesados() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Landing_MotoLineal_Rechazadas_Evaluacion() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Landing_MotoLineal_Rechazadas_Activacion() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },


      Modulo_Landing_TaxiPropio() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      
      Modulo_Landing_TaxiPropio_GestionInicial() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Landing_TaxiPropio_Precalificadas() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Landing_TaxiPropio_Precalificadas_Interesados() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Landing_TaxiPropio_Precalificadas_Evaluacion() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Landing_TaxiPropio_Precalificadas_Activacion() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Landing_TaxiPropio_Rechazadas() { return true; },
      Modulo_Landing_TaxiPropio_Rechazadas_Interesados() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Landing_TaxiPropio_Rechazadas_Evaluacion() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      Modulo_Landing_TaxiPropio_Rechazadas_Activacion() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },

      Modulo_Landing_EfectivoalToque() { return true; },
      Modulo_Landing_EfectivoalToque_GestionInicial() { return true; },
      Modulo_Landing_EfectivoalToque_Precalificadas() { return true; },
      Modulo_Landing_EfectivoalToque_Precalificadas_interesados() { return true; },
      Modulo_Landing_EfectivoalToque_Precalificadas_Evaluacion() { return true; },
      Modulo_Landing_EfectivoalToque_Precalificadas_Activacion() { return true; },
      Modulo_Landing_EfectivoalToque_Rechazadas() { return true; },
      Modulo_Landing_EfectivoalToque_Rechazadas_Interesados() { return true; },
      Modulo_Landing_EfectivoalToque_Rechazadas_Evaluacion() { return true; },
      Modulo_Landing_EfectivoalToque_Rechazadas_Activacion() { return true; },

      Modulo_Landing_Conversiones() {
        if (
          this.$q.localStorage.getAll().UserDetalle.co_person == 4010 // EDWIN MARTINEZ
        ) {
          return false;
        } else {
          return true; 
        }
      },
      
      Modulo_Landing_Conversiones_GestionInicial() { return true; },
      Modulo_Landing_Conversiones_Precalificadas() { return true; },
      Modulo_Landing_Conversiones_Precalificadas_Interesados() { return true; },
      Modulo_Landing_Conversiones_Precalificadas_Evaluacion() { return true; },
      Modulo_Landing_Conversiones_Precalificadas_Activacion() { return true; },
      Modulo_Landing_Conversiones_Rechazadas() { return true; },
      Modulo_Landing_Conversiones_Rechazadas_Interesados() { return true; },
      Modulo_Landing_Conversiones_Rechazadas_Evaluacion() { return true; },
      Modulo_Landing_Conversiones_Rechazadas_Activacion() { return true; },

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
        usuario: this.$q.localStorage.getAll().UserDetalle.co_person,
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
