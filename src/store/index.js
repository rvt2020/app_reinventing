import Vue from "vue";
import Vuex from "vuex";

import example from "./module-example";
import auth from "./store-auth";
import usuarios from "./usuarios";
import vehiculos from "./vehiculos";
import modelos from "./modelos";
import marcas from "./marcas";
import personas from "./personas";
import citas from "./citas";
import materiales from "./materiales";
import operaciones from "./operaciones";
import logisticas from "./store-logisticas";
import tramites from "./store-tramites";
import reportes from "./store-reportes";
import almacen from "./store-almacen";
import landing from "./store-landing";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      example,
      usuarios,
      auth,
      vehiculos,
      marcas,
      modelos,
      personas,
      citas,
      materiales,
      operaciones,
      logisticas,
      tramites,
      reportes,
      almacen,
      landing
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
