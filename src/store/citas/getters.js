import { date } from "quasar";

let timeStamp = Date.now();

export function colorDeCita(val) {
  if (val === "1") {
    return "orange";
  } else if (val === "2") {
    return "green";
  } else if (val === "3") {
    return "blue";
  } else if (val === "4") {
    return "red";
  }
}

export function getCitas(state) {
  // co_citope: 15
  // co_docide: "44826152"
  // co_marveh: "31"
  // co_modveh: "367"
  // co_plaveh: "ABQ077"
  // co_tipope: "1"
  // fe_progra: "2020-08-24 17:00:00"
  // no_colveh: "NEGRO"
  // no_estcit: "Pendiente"
  // no_marveh: "HYUNDAI"
  // no_modveh: "TUCSON"
  // no_person: "Bobadilla Jose Luis"
  // no_tipope: "Conversión GNV"
  // nu_telefo: "965763028"
  // ti_estcit: "1"
  let data = [];
  // console.log(formattedString);
  for (let index = 0; index < state.getCitas.length; index++) {
    const element = state.getCitas[index];
    // console.log("Fecha de la tabla", element.co_plaveh, element.fe_progra);
    const fechaNueva = date.formatDate(
      element.fe_progra,
      "YYYY-MM-DDTHH:mm:ss"
    );
    // console.log("fechaNueva", fechaNueva);
    const fechaFin = date.addToDate(element.fe_progra, { hours: 1 });
    const fechaFinF = date.formatDate(fechaFin, "YYYY-MM-DDTHH:mm:ss");
    // console.log(fechaFinF);

    // console.log(element);
    const json = {
      id: index,
      status: "asdasd",
      placa: `${element.co_plaveh}`,
      summary: `${element.co_plaveh} - ${element.no_tipope}`,
      description: element.no_tipope,
      location: "Sede Gregorio Paredes",
      creator: {
        id: "2",
        email: "miguekos1233@gmail.com",
        displayName: "Miguel Rodriguez",
        self: true
      },
      start: {
        dateTime: fechaNueva,
        timeZone: "America/Lima"
      },
      end: {
        // dateTime: date.formatDate(element.fe_progra, 'YYYY-MM-DDTHH:mm:ss'),
        dateTime: fechaFinF,
        timeZone: "America/Lima"
      },
      color: colorDeCita(element.ti_estcit),
      attendees: [
        {
          id: index,
          email: "baldeonbenja@reinventing.com.pe",
          displayName: element.no_person,
          organizer: true,
          self: true,
          resource: false,
          infocita: element
        }
      ]
    };
    data.push(json);
  }
  // console.log(data);
  return data;
  // return state.getCitas;
}

export function getCitasFilter(state) {
  return state.getCitasFilter;
}

export function callAddCitas(state) {
  return state.getCitas;
}

export function getCitasTipos(state) {
  return state.CitasTipos;
}
