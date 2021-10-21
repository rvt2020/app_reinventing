const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "usuarios", component: () => import("pages/Usuarios.vue") },
      { path: "vehiculos", component: () => import("pages/Vehiculos.vue") },
      { path: "personas", component: () => import("pages/Personas.vue") },
      { path: "perfil", component: () => import("pages/Profile.vue") },
      { path: "citas", component: () => import("pages/Citas.vue") },
      { path: "test", component: () => import("pages/Test.vue") },
      { path: "materiales", component: () => import("pages/Material.vue") },
      { path: "operaciones", component: () => import("pages/Operaciones.vue") },

      {
        path: "imprimiroperacion",
        component: () => 
          import("components/Operaciones/ImprimirOperacion/VerOperacion.vue")
      },
      {
        path: "facturaroperacion",
        component: () => 
          import("components/Operaciones/FacturarOperacion/FacturarOperacion.vue")
      },
      {
        path: "finanzas/documentosdeventa",
        component: () => 
          import("src/components/Finanzas/Factura/DocumentodeVenta.vue")
      },
      { 
        path: "logisticas", 
        component: () =>  
          import("pages/Logistica.vue") 
      },
      {
        path: "logisticas/ordenesdecompra",
        component: () => 
          import("components/Logistica/OrdenDeCompra/OrdenesDeCompra.vue")
      },
      {
        path: "logisticas/tramitedoc",
        component: () => 
          import("components/Logistica/TramiteDocumentario/TramiteDocumentario")
      },
      
      { 
        path: "llamadas", 
        component: () => 
          import("pages/Llamadas.vue") 
      },
      
      {
        path: "logisticas/ingresoarticulos",
        component: () =>
          import("components/Logistica/IngresoArticulos/IngresoArticulos")
      },
      {
        path: "logisticas/salidaarticulos",
        component: () =>
          import("components/Logistica/SalidaArticulos/SalidaArticulos")
      },

      // REPORTES

      {
        path: "reportes/kardex",
        component: () => 
          import("components/Reportes/Logistica/Kardex/Kardex")
      },
      {
        path: "reportes/inventariovalorizado",
        component: () =>
          import("components/Reportes/Logistica/InventarioValorizado/InventarioValorizado")
      },
      {
        path: "reportes/reportediario",
        component: () =>
          import("components/Reportes/Operaciones/ReporteDiario/ReporteDiario")
      },
      {
        path: "reportes/produccionoperaciones",
        component: () =>
          import(
            "components/Reportes/Operaciones/ProduccionOperaciones/ProduccionOperaciones"
          )
      },
      {
        path: "reportes/seguimientomantenimiento",
        component: () =>
          import(
            "components/Reportes/Operaciones/SeguimientoMantenimiento/SeguimientoMantenimiento"
          )
      },
      {
        path: "reportes/landing",
        component: () => import("components/Reportes/Landing/Landing")
      },
      {
        path: "reportes/referidos",
        component: () => import("components/Reportes/Referidos/Referidos")
      },
      
      // CHAPA TU MOTOTAXI INICIAL
      {
        path: "landing/chapatumototaxi",
        component: () =>
          import("components/Landing/Chapatumototaxi/Chapatumototaxi")
      },
      
      // CHAPA TU MOTOTAXI PRECALIFICADOS
      {
        path: "landing/chapatumototaxiprecal",
        component: () =>
          import("components/Landing/Chapatumototaxi/Chapatumototaxiprecal")
      },
      {
        path: "landing/chapatumototaxiprecaleev",
        component: () =>
          import("components/Landing/Chapatumototaxi/Chapatumototaxiprecaleev")
      },
      {
        path: "landing/chapatumototaxiprecaleac",
        component: () =>
          import("components/Landing/Chapatumototaxi/Chapatumototaxiprecaleac")
      },
      
      // CHAPA TU MOTOTAXI RECHAZADOS
      {
        path: "landing/Chapatumototaxirechaz",
        component: () =>
          import("components/Landing/Chapatumototaxi/Chapatumototaxirechaz")
      },
      {
        path: "landing/chapatumototaxirechazeev",
        component: () =>
          import("components/Landing/Chapatumototaxi/Chapatumototaxirechazeev")
      },
      {
        path: "landing/chapatumototaxirechazeac",
        component: () =>
          import("components/Landing/Chapatumototaxi/Chapatumototaxirechazeac")
      },
      
      
      
      {
        path: "landing/motolineal",
        component: () => import("components/Landing/Motolineal/Motolineal")
      },

      // MOTO LINEAL PRECALIFICADOS
      {
        path: "landing/motolinealprecal",
        component: () =>
          import("components/Landing/Motolineal/Motolinealprecal")
      },
      {
        path: "landing/motolinealprecaleev",
        component: () =>
          import("components/Landing/Motolineal/Motolinealprecaleev")
      },
      {
        path: "landing/motolinealprecaleac",
        component: () =>
          import("components/Landing/Motolineal/Motolinealprecaleac")
      },
      
      // MOTO LINEAL RECHAZADOS
      {
        path: "landing/Motolinealrechaz",
        component: () =>
          import("components/Landing/Motolineal/Motolinealrechaz")
      },
      {
        path: "landing/motolinealrechazeev",
        component: () =>
          import("components/Landing/Motolineal/Motolinealrechazeev")
      },
      {
        path: "landing/motolinealrechazeac",
        component: () =>
          import("components/Landing/Motolineal/Motolinealrechazeac")
      },
      


      //TAXI PROPIO
      {
        path: "landing/taxipropio",
        component: () => import("components/Landing/Taxipropio/Taxipropio")
      },
      
      // TAXI PROPIO PRECALIFICADOS
      {
        path: "landing/taxipropioprecal",
        component: () =>
          import("components/Landing/Taxipropio/Taxipropioprecal")
      },
      {
        path: "landing/taxipropioprecaleev",
        component: () =>
          import("components/Landing/Taxipropio/Taxipropioprecaleev")
      },
      {
        path: "landing/taxipropioprecaleac",
        component: () =>
          import("components/Landing/Taxipropio/Taxipropioprecaleac")
      },
      
      // TAXI PROPIO RECHAZADOS
      {
        path: "landing/taxipropiorechaz",
        component: () =>
          import("components/Landing/Taxipropio/Taxipropiorechaz")
      },
      {
        path: "landing/taxipropiorechazeev",
        component: () =>
          import("components/Landing/Taxipropio/Taxipropiorechazeev")
      },
      {
        path: "landing/taxipropiorechazeac",
        component: () =>
          import("components/Landing/Taxipropio/Taxipropiorechazeac")
      },
      
      
      //EFECTIVO AL TOQUE
      {
        path: "landing/efectivoaltoque",
        component: () =>
          import("components/Landing/Efectivoaltoque/Efectivoaltoque")
      },
      {
        path: "landing/efectivoaltoqueprecal",
        component: () =>
          import("components/Landing/Efectivoaltoque/Efectivoaltoqueprecal")
      },
      {
        path: "landing/efectivoaltoqueprecaleev",
        component: () =>
          import("components/Landing/Efectivoaltoque/Efectivoaltoqueprecaleev")
      },
      {
        path: "landing/efectivoaltoqueprecaleac",
        component: () =>
          import("components/Landing/Efectivoaltoque/Efectivoaltoqueprecaleac")
      },
      // EFECTIVO AL TOQUE RECHAZADOS
      {
        path: "landing/efectivoaltoquerechaz",
        component: () =>
          import("components/Landing/Efectivoaltoque/Efectivoaltoquerechaz")
      },
      {
        path: "landing/efectivoaltoquerechazeev",
        component: () =>
          import("components/Landing/Efectivoaltoque/Efectivoaltoquerechazeev")
      },
      {
        path: "landing/efectivoaltoquerechazeac",
        component: () =>
          import("components/Landing/Efectivoaltoque/Efectivoaltoquerechazeac")
      },
      
      //CONVERSIONES
      {
        path: "landing/conversiones",
        component: () =>
          import("components/Landing/Conversiones/Conversiones")
      },
      {
        path: "landing/conversionesprecal",
        component: () =>
          import("components/Landing/Conversiones/Conversionesprecal")
      },
      {
        path: "landing/conversionesprecaleev",
        component: () =>
          import("components/Landing/Conversiones/Conversionesprecaleev")
      },
      {
        path: "landing/conversionesprecaleac",
        component: () =>
          import("components/Landing/Conversiones/Conversionesprecaleac")
      },
      // CONVERSIONES RECHAZADOS
      {
        path: "landing/conversionesrechaz",
        
        component: () =>
          import("components/Landing/Conversiones/Conversionesrechaz")
      },
      {
        path: "landing/conversionesrechazeev",
        component: () =>
          import("components/Landing/Conversiones/Conversionesrechazeev")
      },
      {
        path: "landing/conversionesrechazeac",
        component: () =>
          import("components/Landing/Conversiones/Conversionesrechazeac")
      },
      //VENTAS Y COMPRAS
      {
        path: "comercial/comercial",
        component: () => 
          import("src/components/Comercial/Comercial/DocumentoComercial.vue")

      },
      {
        path: "compras/compras",
        component: () => 
          import("src/components/Compras/Compras/DocumentoCompras.vue")

      },
      
    ]
  },
  {
    path: "/auth",
    component: () => import("pages/Auth/Login")
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
