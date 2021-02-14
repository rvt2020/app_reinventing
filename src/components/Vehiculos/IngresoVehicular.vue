<template>
  <div>
    <!--    {{ dataIngresoVehicular }}-->
    <q-card v-if="tieneCodigo === 1" class="full-height" square>
      <q-form @submit="onSubmit" @reset.prevent.stop="onReset">
        <q-bar class="bg-primary text-white">
          Ingreso Vehicular
          <q-space />
          <q-btn dense flat icon="close" @click="cerrar">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <!--        <TablaA />-->
          <div class="row">
            <div class="col-xs-12 col-md-6 q-pa-xs">
              <q-card flat bordered class="my-card">
                <q-markup-table dense>
                  <thead>
                    <tr>
                      <td class="text-left text-h6">Datos del Vehículo</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left">Fecha</td>
                      <td class="text-right">
                        {{ dataIngresoVehicular.nu_anomod }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Placa</td>
                      <td class="text-right">
                        {{ dataIngresoVehicular.co_plaveh }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Marca</td>
                      <td class="text-right">
                        {{ dataIngresoVehicular.no_marveh }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Modelo</td>
                      <td class="text-right">
                        {{ dataIngresoVehicular.no_modveh }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Año</td>
                      <td class="text-right">
                        {{ dataIngresoVehicular.nu_anofab }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Color</td>
                      <td class="text-right">
                        {{ dataIngresoVehicular.no_colveh }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Chasis</td>
                      <td class="text-right">
                        {{ dataIngresoVehicular.nu_serveh }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Motor</td>
                      <td class="text-right">
                        {{ dataIngresoVehicular.nu_motveh }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Kilometraje</td>
                      <td class="text-right">
                        <q-input filled dense v-model="val_kil" />
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </q-card>
            </div>
            <div class="col-xs-12 col-md-6 q-pa-xs">
              <q-card flat bordered class="my-card">
                <q-markup-table dense>
                  <thead>
                    <tr>
                      <td class="text-left text-h6">Datos del Cliente</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left">Documento de Identidad</td>
                      <td class="text-right">
                        <!--                        {{ clienteSelect }}-->
                        <q-select
                          v-if="seleccliente"
                          filled
                          dense
                          @input="buscarPersonas"
                          v-model="clienteSelect"
                          clearable
                          use-input
                          hide-selected
                          fill-input
                          input-debounce="0"
                          label="Cliente o Propietario"
                          :options="options"
                          option-label="no_person"
                          emit-value
                          map-options
                          @filter="filterFn"
                        >
                          <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                No results
                              </q-item-section>
                            </q-item>
                          </template>
                          <template v-slot:append>
                            <q-btn
                              round
                              dense
                              flat
                              icon="add"
                              @click="seleccliente = !seleccliente"
                            />
                          </template>
                        </q-select>
                        <q-input v-else filled dense v-model="doc_ide">
                          <template v-slot:append>
                            <q-btn
                              round
                              dense
                              flat
                              icon="add"
                              @click="seleccliente = !seleccliente"
                            />
                          </template>
                        </q-input>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Apellido Paterno</td>
                      <td class="text-right">
                        <q-input filled dense v-model="ape_pat" />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Apellido Materno</td>
                      <td class="text-right">
                        <q-input filled dense v-model="ape_mat" />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Nombre del Cliente</td>
                      <td class="text-right">
                        <q-input filled dense v-model="nom_cli" />
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </q-card>
            </div>
            <div class="col-xs-12 col-md-6 q-pa-xs">
              <q-card flat bordered>
                <q-markup-table dense>
                  <thead>
                    <tr>
                      <td class="text-left text-h6">Detalles de Ingreso</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left">Centro de Operaciones</td>
                      <td class="text-right">
                        <q-select
                          filled
                          dense
                          v-model="cen_ope"
                          :options="optionsCentrodeOperaciones"
                          option-label="name"
                          option-value="value"
                          emit-value
                          map-options
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Dirección</td>
                      <td class="text-right">
                        <q-input filled dense v-model="direcci" />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Descripción de ingreso</td>
                      <td class="text-right">
                        <q-input
                          filled
                          type="textarea"
                          dense
                          v-model="det_ing"
                        />
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </q-card>
            </div>
            <div class="col-xs-12 col-md-6 q-pa-xs">
              <q-card flat bordered>
                <q-markup-table dense>
                  <thead>
                    <tr>
                      <td class="text-left text-h6">Salida Próxima</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left">¿Tendrá Salida Cercana?</td>
                      <td class="text-right">
                        <q-select
                          filled
                          dense
                          v-model="swt_sal"
                          :options="optionsTendraSalidaCercana"
                          option-label="name"
                          option-value="value"
                          map-options
                          emit-value
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Fecha {{ fec_sal }}</td>
                      <td class="text-right">
                        <q-input filled dense v-model="fec_sal">
                          <template v-slot:prepend>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="fec_sal"
                                  mask="YYYY-MM-DD HH:mm"
                                >
                                  <div class="row items-center justify-end">
                                    <q-btn
                                      v-close-popup
                                      label="Close"
                                      color="primary"
                                      flat
                                    />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </template>

                          <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer">
                              <q-popup-proxy
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-time
                                  v-model="fec_sal"
                                  mask="YYYY-MM-DD HH:mm"
                                  format24h
                                >
                                  <div class="row items-center justify-end">
                                    <q-btn
                                      v-close-popup
                                      label="Close"
                                      color="primary"
                                      flat
                                    />
                                  </div>
                                </q-time>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </q-card>
            </div>
          </div>
        </q-card-section>

        <!--      <q-separator />-->

        <!--      <q-card-section>-->
        <!--        {{ get_buscar_operacion.result[0] }}-->
        <!--        <TablaBuscar :info="get_buscar_operacion.result" />-->
        <!--        <TablaB />-->
        <!--      </q-card-section>-->

        <q-card-actions align="center">
          <!--        <q-btn flat label="Decline" color="primary" v-close-popup />-->
          <q-btn label="Registrar" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
    <q-card v-if="tieneCodigo === 2" class="full-height" square>
      <q-form @submit="onSubmitCita" @reset.prevent.stop="onReset">
        <q-bar class="bg-primary text-white">
          Ingreso Vehicular
          <q-space />
          <q-btn dense flat icon="close" @click="cerrar">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <!--        <TablaA />-->
          <div class="row">
            <div class="col-xs-12 col-md-6 q-pa-xs">
              <q-card flat bordered class="my-card">
                <q-markup-table dense>
                  <thead>
                    <tr>
                      <td class="text-left text-h6">Datos del Vehículo</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left">Fecha</td>
                      <td class="text-right">
                        {{ dataIngresoVehicular.nu_anomod }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Placa</td>
                      <td class="text-right">
                        {{ dataIngresoVehicular.co_plaveh }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Marca</td>
                      <td class="text-right">
                        {{ dataIngresoVehicular.no_marveh }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Modelo</td>
                      <td class="text-right">
                        {{ dataIngresoVehicular.no_modveh }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Año</td>
                      <td class="text-right">
                        <q-input filled dense v-model="nu_anofab" />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Color</td>
                      <td class="text-right">
                        {{ dataIngresoVehicular.no_colveh }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Chasis</td>
                      <td class="text-right">
                        <q-input filled dense v-model="nu_serveh" />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Motor</td>
                      <td class="text-right">
                        <q-input filled dense v-model="nu_motveh" />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Kilometraje</td>
                      <td class="text-right">
                        <q-input filled dense v-model="val_kil" />
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </q-card>
            </div>
            <div class="col-xs-12 col-md-6 q-pa-xs">
              <q-card flat bordered class="my-card">
                <q-markup-table dense>
                  <thead>
                    <tr>
                      <td class="text-left text-h6">Datos del Cliente</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left">Documento de Identidad</td>
                      <td class="text-right">
                        <!--                        {{ clienteSelect }}-->
                        <q-select
                          v-if="seleccliente"
                          filled
                          dense
                          @input="buscarPersonas"
                          v-model="clienteSelect"
                          clearable
                          use-input
                          hide-selected
                          fill-input
                          input-debounce="0"
                          label="Cliente o Propietario"
                          :options="options"
                          option-label="no_person"
                          emit-value
                          map-options
                          @filter="filterFn"
                        >
                          <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                No results
                              </q-item-section>
                            </q-item>
                          </template>
                          <template v-slot:append>
                            <q-btn
                              round
                              dense
                              flat
                              icon="add"
                              @click="seleccliente = !seleccliente"
                            />
                          </template>
                        </q-select>
                        <q-input v-else filled dense v-model="doc_ide">
                          <template v-slot:append>
                            <q-btn
                              round
                              dense
                              flat
                              icon="add"
                              @click="seleccliente = !seleccliente"
                            />
                          </template>
                        </q-input>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Apellido Paterno</td>
                      <td class="text-right">
                        <q-input filled dense v-model="ape_pat" />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Apellido Materno</td>
                      <td class="text-right">
                        <q-input filled dense v-model="ape_mat" />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Nombre del Cliente</td>
                      <td class="text-right">
                        <q-input filled dense v-model="nom_cli" />
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </q-card>
            </div>
            <div class="col-xs-12 col-md-6 q-pa-xs">
              <q-card flat bordered>
                <q-markup-table dense>
                  <thead>
                    <tr>
                      <td class="text-left text-h6">Detalles de Ingreso</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left">Centro de Operaciones</td>
                      <td class="text-right">
                        <q-select
                          filled
                          dense
                          v-model="cen_ope"
                          :options="optionsCentrodeOperaciones"
                          option-label="name"
                          option-value="value"
                          emit-value
                          map-options
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Dirección</td>
                      <td class="text-right">
                        <q-input filled dense v-model="direcci" />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Descripción de ingreso</td>
                      <td class="text-right">
                        <q-input
                          filled
                          autogrow
                          clearable
                          type="textarea"
                          dense
                          v-model="det_ing"
                        />
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </q-card>
            </div>
            <div class="col-xs-12 col-md-6 q-pa-xs">
              <q-card flat bordered>
                <q-markup-table dense>
                  <thead>
                    <tr>
                      <td class="text-left text-h6">Salida Próxima</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left">¿Tendrá Salida Cercana?</td>
                      <td class="text-right">
                        <q-select
                          filled
                          dense
                          v-model="swt_sal"
                          :options="optionsTendraSalidaCercana"
                          option-label="name"
                          option-value="value"
                          map-options
                          emit-value
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Fecha {{ fec_sal }}</td>
                      <td class="text-right">
                        <q-input filled dense v-model="fec_sal">
                          <template v-slot:prepend>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="fec_sal"
                                  mask="YYYY-MM-DD HH:mm"
                                >
                                  <div class="row items-center justify-end">
                                    <q-btn
                                      v-close-popup
                                      label="Close"
                                      color="primary"
                                      flat
                                    />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </template>

                          <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer">
                              <q-popup-proxy
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-time
                                  v-model="fec_sal"
                                  mask="YYYY-MM-DD HH:mm"
                                  format24h
                                >
                                  <div class="row items-center justify-end">
                                    <q-btn
                                      v-close-popup
                                      label="Close"
                                      color="primary"
                                      flat
                                    />
                                  </div>
                                </q-time>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </q-card>
            </div>
          </div>
        </q-card-section>

        <!--      <q-separator />-->

        <!--      <q-card-section>-->
        <!--        {{ get_buscar_operacion.result[0] }}-->
        <!--        <TablaBuscar :info="get_buscar_operacion.result" />-->
        <!--        <TablaB />-->
        <!--      </q-card-section>-->

        <q-card-actions align="center">
          <!--        <q-btn flat label="Decline" color="primary" v-close-popup />-->
          <q-btn label="Registrar" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
    <q-card v-if="tieneCodigo === 3" class="full-height" square>
      <q-form @submit="onSubmitNew" @reset.prevent.stop="onReset">
        <q-bar class="bg-primary text-white">
          Ingreso Vehicular
          <q-space />
          <q-btn dense flat icon="close" @click="cerrar">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <!--        <TablaA />-->
          <div class="row">
            <div class="col-xs-12 col-md-6 q-pa-xs">
              <q-card flat bordered class="my-card">
                <q-markup-table dense>
                  <thead>
                    <tr>
                      <td class="text-left text-h6">Datos del Vehículo</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left">Fecha</td>
                      <td class="text-right">
                        {{ dataIngresoVehicular.nu_anomod }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Placa</td>
                      <td class="text-right">
                        {{ dataIngresoVehicular.co_plaveh }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Marca</td>
                      <td class="text-right">
                        {{ dataIngresoVehicular.no_marveh }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Modelo</td>
                      <td class="text-right">
                        {{ dataIngresoVehicular.no_modveh }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Año</td>
                      <td class="text-right">
                        {{ dataIngresoVehicular.nu_anofab }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Color</td>
                      <td class="text-right">
                        {{ dataIngresoVehicular.no_colveh }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Chasis</td>
                      <td class="text-right">
                        {{ dataIngresoVehicular.nu_serveh }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Motor</td>
                      <td class="text-right">
                        {{ dataIngresoVehicular.nu_motveh }}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Kilometraje</td>
                      <td class="text-right">
                        <q-input filled dense v-model="val_kil" />
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </q-card>
            </div>
            <div class="col-xs-12 col-md-6 q-pa-xs">
              <q-card flat bordered class="my-card">
                <q-markup-table dense>
                  <thead>
                    <tr>
                      <td class="text-left text-h6">Datos del Cliente</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left">Documento de Identidad</td>
                      <td class="text-right">
                        <!--                        {{ clienteSelect }}-->
                        <q-select
                          v-if="seleccliente"
                          filled
                          dense
                          @input="buscarPersonas"
                          v-model="clienteSelect"
                          clearable
                          use-input
                          hide-selected
                          fill-input
                          input-debounce="0"
                          label="Cliente o Propietario"
                          :options="options"
                          option-label="no_person"
                          emit-value
                          map-options
                          @filter="filterFn"
                        >
                          <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                No results
                              </q-item-section>
                            </q-item>
                          </template>
                          <template v-slot:append>
                            <q-btn
                              round
                              dense
                              flat
                              icon="add"
                              @click="seleccliente = !seleccliente"
                            />
                          </template>
                        </q-select>
                        <q-input v-else filled dense v-model="doc_ide">
                          <template v-slot:append>
                            <q-btn
                              round
                              dense
                              flat
                              icon="add"
                              @click="seleccliente = !seleccliente"
                            />
                          </template>
                        </q-input>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Apellido Paterno</td>
                      <td class="text-right">
                        <q-input filled dense v-model="ape_pat" />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Apellido Materno</td>
                      <td class="text-right">
                        <q-input filled dense v-model="ape_mat" />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Nombre del Cliente</td>
                      <td class="text-right">
                        <q-input filled dense v-model="nom_cli" />
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </q-card>
            </div>
            <div class="col-xs-12 col-md-6 q-pa-xs">
              <q-card flat bordered>
                <q-markup-table dense>
                  <thead>
                    <tr>
                      <td class="text-left text-h6">Detalles de Ingreso</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left">Centro de Operaciones</td>
                      <td class="text-right">
                        <q-select
                          filled
                          dense
                          v-model="cen_ope"
                          :options="optionsCentrodeOperaciones"
                          option-label="name"
                          option-value="value"
                          emit-value
                          map-options
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Dirección</td>
                      <td class="text-right">
                        <q-input filled dense v-model="direcci" />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Descripción de ingreso</td>
                      <td class="text-right">
                        <q-input
                          filled
                          type="textarea"
                          dense
                          v-model="det_ing"
                        />
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </q-card>
            </div>
            <div class="col-xs-12 col-md-6 q-pa-xs">
              <q-card flat bordered>
                <q-markup-table dense>
                  <thead>
                    <tr>
                      <td class="text-left text-h6">Salida Próxima</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-left">¿Tendrá Salida Cercana?</td>
                      <td class="text-right">
                        <q-select
                          filled
                          dense
                          v-model="swt_sal"
                          :options="optionsTendraSalidaCercana"
                          option-label="name"
                          option-value="value"
                          map-options
                          emit-value
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left">Fecha {{ fec_sal }}</td>
                      <td class="text-right">
                        <q-input filled dense v-model="fec_sal">
                          <template v-slot:prepend>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="fec_sal"
                                  mask="YYYY-MM-DD HH:mm"
                                >
                                  <div class="row items-center justify-end">
                                    <q-btn
                                      v-close-popup
                                      label="Close"
                                      color="primary"
                                      flat
                                    />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </template>

                          <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer">
                              <q-popup-proxy
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-time
                                  v-model="fec_sal"
                                  mask="YYYY-MM-DD HH:mm"
                                  format24h
                                >
                                  <div class="row items-center justify-end">
                                    <q-btn
                                      v-close-popup
                                      label="Close"
                                      color="primary"
                                      flat
                                    />
                                  </div>
                                </q-time>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </td>
                    </tr>
                  </tbody>
                </q-markup-table>
              </q-card>
            </div>
          </div>
        </q-card-section>

        <!--      <q-separator />-->

        <!--      <q-card-section>-->
        <!--        {{ get_buscar_operacion.result[0] }}-->
        <!--        <TablaBuscar :info="get_buscar_operacion.result" />-->
        <!--        <TablaB />-->
        <!--      </q-card-section>-->

        <q-card-actions align="center">
          <!--        <q-btn flat label="Decline" color="primary" v-close-popup />-->
          <q-btn label="Registrar" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import { storagelocal } from "../../mixins/mixin";
import { mapActions, mapGetters, mapState } from "vuex";
const stringOptions = ["Servicios", "Materiales"];
export default {
  name: "DialogAddServicios",
  mixins: [storagelocal],
  components: {
    // TablaA: () => import("./DatosdeIngreso"),
    // TablaB: () => import("./ArticulosIngresaran")
  },
  computed: {
    ...mapState("example", ["dataIngresoVehicular"]),
    ...mapGetters("operaciones", ["get_combo_cliente"]),
    ...mapGetters("personas", ["getPersonasFilter"]),
    ...mapGetters("vehiculos", ["getVehiculosFilter"])
  },
  data() {
    return {
      nu_serveh: "",
      nu_motveh: "",
      tieneCodigo: 0,
      seleccliente: true,
      maximizedToggle: false,
      nu_anofab: "",
      per_reg: this.$q.localStorage.getAll().UserDetalle.co_person,
      cod_veh: "",
      val_kil: "",
      doc_ide: "",
      ape_pat: "",
      ape_mat: "",
      nom_cli: "",
      cen_ope: "",
      direcci: "",
      det_ing: "",
      swt_sal: "",
      fec_sal: "",
      model: null,
      optionsTendraSalidaCercana: [
        {
          name: "Si",
          value: 1
        },
        {
          name: "No",
          value: 2
        }
      ],

      optionsCentrodeOperaciones: [
        {
          name: "Jirón Gergorio Paredes",
          value: 1
        }
      ],
      options: [],
      Kilometraje: "",
      cod_ope: "",
      pla_veh: "",
      fec_ini: "",
      fec_fin: "",
      loadboton: false,
      clienteSelect: null,
      infoMateriales: [],
      infoServicios: [],
      precioUnitario: null,
      cantidad: null,
      tipodebusqueda: null,
      newoptions: [],
      buscarServiciosMateriales: "",
      filter: "",
      columns1: [
        {
          name: "desc",
          required: true,
          label: "Fecha de Registro",
          align: "left",
          field: row => row.co_operac,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "co_opeveh",
          align: "center",
          label: "Usuario",
          field: "co_opeveh",
          sortable: true
        },
        { name: "fat", label: "N° Operación", field: "fat", sortable: true },
        { name: "no_tiptra", label: "Cliente", field: "no_tiptra" },
        { name: "no_servic", label: "Estado", field: "no_servic" },
        { name: "no_tipser", label: "Placa", field: "no_tipser" },
        { name: "im_preuni", label: "Marca", field: "im_preuni" },
        { name: "co_plaveh", label: "Modelo", field: "co_plaveh" },
        { name: "acciones", label: "Versión", field: "acciones" },
        { name: "acciones", label: "Año", field: "acciones" },
        { name: "acciones", label: "Color", field: "acciones" },
        { name: "acciones", label: "Chasis", field: "acciones" },
        { name: "acciones", label: "Motor", field: "acciones" },
        { name: "acciones", label: "Acciones", field: "acciones" }
      ],
      data: []
    };
  },
  methods: {
    ...mapActions("operaciones", [
      "call_ingreso_vehicular",
      "call_combo_cliente"
    ]),
    ...mapActions("personas", ["callPersonasFilter"]),
    ...mapActions("vehiculos", ["callVehiculosFilter"]),
    ...mapActions("citas", ["call_ingresar_vehicu"]),
    async onSubmitCita() {
      console.log("onSubmitCita", this.dataIngresoVehicular);
      console.log(this.$q.localStorage);
      this.$q.loading.show();
      try {
        const responseIngresoV = await this.call_ingresar_vehicu({
          per_reg: this.$q.localStorage.getAll().UserDetalle.co_person,
          pla_veh: this.dataIngresoVehicular.co_plaveh,
          mod_veh: this.dataIngresoVehicular.co_modveh,
          ano_veh: this.nu_anofab
            ? this.nu_anofab
            : this.dataIngresoVehicular.nu_anofab,
          col_veh: this.dataIngresoVehicular.no_colveh,
          ser_veh: this.nu_serveh
            ? this.nu_serveh
            : this.dataIngresoVehicular.nu_serveh,
          mot_veh: this.nu_motveh
            ? this.nu_motveh
            : this.dataIngresoVehicular.nu_motveh,
          val_kil: this.val_kil,
          doc_ide: this.doc_ide,
          ape_pat: this.ape_pat,
          ape_mat: this.ape_mat,
          nom_cli: this.nom_cli,
          cen_ope: this.cen_ope,
          direcci: this.direcci,
          det_ing: this.det_ing,
          swt_sal: this.swt_sal,
          fec_sal: this.fec_sal,
          co_citope: this.dataIngresoVehicular.co_citope
        });
        if (responseIngresoV.res === "ok") {
          this.$q.notify({
            message: "Creando"
          });
          this.$store.commit("example/dialogIngresoVehicular", false);
          await this.$router.push("/operaciones?id=1");
          this.$q.loading.hide();
        } else if (responseIngresoV.res === "ko") {
          this.$q.notify({
            message: "Creando"
          });
          this.$q.loading.hide();
        } else {
          this.$q.notify({
            message: "Creando"
          });
          this.$q.loading.hide();
        }
      } catch (e) {
        console.log(e);
        this.$q.loading.hide();
      }
    },
    async onSubmit() {
      console.log("onSubmit", this.dataIngresoVehicular);
      console.log(this.$q.localStorage);
      console.log(
        "Codigo de persona",
        this.$q.localStorage.getAll().UserDetalle.co_person
      );
      this.$q.loading.show();
      try {
        const responseIngresoV = await this.call_ingreso_vehicular({
          per_reg: this.$q.localStorage.getAll().UserDetalle.co_person,
          cod_veh: this.dataIngresoVehicular.co_vehicu,
          val_kil: this.val_kil,
          doc_ide: this.doc_ide,
          ape_pat: this.ape_pat,
          ape_mat: this.ape_mat,
          nom_cli: this.nom_cli,
          cen_ope: this.cen_ope,
          direcci: this.direcci,
          det_ing: this.det_ing,
          swt_sal: this.swt_sal,
          fec_sal: this.fec_sal
        });
        if (responseIngresoV.res === "ok") {
          this.$q.notify({
            message: "Creando"
          });
          this.$store.commit("example/dialogIngresoVehicular", false);
          await this.$router.push("/operaciones?id=1");
          this.$q.loading.hide();
        } else if (responseIngresoV.res === "ko") {
          this.$q.notify({
            message: "Creando"
          });
          this.$q.loading.hide();
        } else {
          this.$q.notify({
            message: "Creando"
          });
          this.$q.loading.hide();
        }
      } catch (e) {
        console.log(e);
        this.$q.loading.hide();
      }
    },
    async onSubmitNew() {
      console.log("onSubmit", this.dataIngresoVehicular);
      console.log(this.$q.localStorage);
      console.log(
        "Codigo de persona",
        this.$q.localStorage.getAll().UserDetalle.co_person
      );
      this.$q.loading.show();
      try {
        const responseIngresoV = await this.call_ingresar_vehicu({
          per_reg: this.$q.localStorage.getAll().UserDetalle.co_person,
          pla_veh: this.dataIngresoVehicular.co_plaveh,
          mod_veh: this.dataIngresoVehicular.co_modveh,
          ano_veh: this.nu_anofab
            ? this.nu_anofab
            : this.dataIngresoVehicular.nu_anofab,
          col_veh: this.dataIngresoVehicular.no_colveh,
          ser_veh: this.nu_serveh
            ? this.nu_serveh
            : this.dataIngresoVehicular.nu_serveh,
          mot_veh: this.nu_motveh
            ? this.nu_motveh
            : this.dataIngresoVehicular.nu_motveh,
          val_kil: this.val_kil,
          doc_ide: this.doc_ide,
          ape_pat: this.ape_pat,
          ape_mat: this.ape_mat,
          nom_cli: this.nom_cli,
          cen_ope: this.cen_ope,
          direcci: this.direcci,
          det_ing: this.det_ing,
          swt_sal: this.swt_sal,
          fec_sal: this.fec_sal,
          co_citope: this.dataIngresoVehicular.co_citope
        });
        if (responseIngresoV.res === "ok") {
          this.$q.notify({
            message: "Creando"
          });
          this.$store.commit("example/dialogIngresoVehicular", false);
          await this.$router.push("/operaciones?id=1");
          this.$q.loading.hide();
        } else if (responseIngresoV.res === "ko") {
          this.$q.notify({
            message: "Creando"
          });
          this.$q.loading.hide();
        } else {
          this.$q.notify({
            message: "Creando"
          });
          this.$q.loading.hide();
        }
      } catch (e) {
        console.log(e);
        this.$q.loading.hide();
      }
    },
    filterFn(val, update, abort) {
      let asd = [];
      for (let index = 0; index < this.newoptions.length; index++) {
        const element = this.newoptions[index];
        if (element.no_person) {
          asd.push(element);
        }
      }
      // console.log("asd", asd);
      update(() => {
        const needle = val.toLowerCase();
        // console.log(needle);
        this.options = asd.filter(
          v => v.no_person.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    cerrar() {
      this.$store.commit("example/dialogIngresoVehicular", false);
    },
    async buscarPersonas() {
      this.doc_ide = this.clienteSelect.co_docide;
      this.ape_pat = this.clienteSelect.no_apepat;
      this.ape_mat = this.clienteSelect.no_apemat;
      this.nom_cli = this.clienteSelect.no_nombre;
    }
  },
  async created() {
    this.$q.loading.show();
    console.log("this.dataIngresoVehicular", this.dataIngresoVehicular);
    if (this.dataIngresoVehicular.co_vehicu) {
      console.log("Paso this.tieneCodigo = 1");
      this.tieneCodigo = 1;
    } else {
      await this.callVehiculosFilter(this.dataIngresoVehicular.co_plaveh);
      console.log("respVehicu", this.getVehiculosFilter.length);
      console.log("respVehicuData", this.getVehiculosFilter[0]);
      if (this.getVehiculosFilter.length > 0) {
        this.$store.commit("example/dataIngresoVehicular", {
          ...this.dataIngresoVehicular,
          ...this.getVehiculosFilter[0]
        });
        console.log("Paso this.tieneCodigo = 3");
        this.tieneCodigo = 3;
      } else {
        console.log("Paso this.tieneCodigo = 2");
        this.tieneCodigo = 2;
      }
    }
    await this.call_combo_cliente();
    this.options = this.get_combo_cliente.client;
    this.newoptions = this.get_combo_cliente.client;
    this.$q.notify({
      message: "Creando"
    });
    console.log("DialogBuscarOperacion.vue");
    this.$q.loading.hide();
  }
};
</script>
