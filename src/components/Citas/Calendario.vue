<template>
  <div class="q-pa-md">
    <DaykeepCalendar
      :event-array="info"
      :tab-labels="labelsCalendar"
      :sunday-first-day-of-week="true"
      calendar-locale="es"
      calendar-timezone="America/Lima"
      :allow-editing="false"
      :render-html="true"
      event-ref="MYCALENDAR"
      :prevent-event-detail="true"
    />
    <q-dialog v-if="fixed" v-model="fixed">
      <q-card>
        <q-card-section>
          <div class="text-h4 text-center">
            <div>
              {{ dataCita.attendees[0].displayName }}
            </div>
            <div class="text-h6">
              {{ dataCita.placa }}
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <q-list bordered>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="primary" name="arrow_right_alt" />
              </q-item-section>
              <q-item-section>{{ dataCita.summary }}</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="primary" name="room" />
              </q-item-section>
              <q-item-section>{{ dataCita.location }}</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="primary" name="face" />
              </q-item-section>
              <q-item-section>{{
                dataCita.attendees[0].displayName
              }}</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="primary" name="assignment" />
              </q-item-section>
              <q-item-section>{{ dataCita.description }}</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="primary" name="schedule" />
              </q-item-section>
              <q-item-section>{{ dataCita.start.dateTime }}</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="primary" name="schedule" />
              </q-item-section>
              <q-item-section>{{ dataCita.end.dateTime }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-separator />

        <q-card-actions align="center">
          <q-btn label="Cerrar" color="negative" v-close-popup />
          <q-btn label="Generar ingreso" color="primary" @click="confirm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {
  DaykeepCalendar,
  DaykeepCalendarMonth,
  DaykeepCalendarAgenda,
  DaykeepCalendarMultiDay
} from "@daykeep/calendar-quasar";
export default {
  props: ["info"],
  name: "Calendario",
  components: {
    DaykeepCalendar,
    DaykeepCalendarMonth,
    DaykeepCalendarAgenda,
    DaykeepCalendarMultiDay
  },
  data() {
    return {
      dataCita: null,
      fixed: false,
      date: "2019/02/01",
      labelsCalendar: {
        month: "MES",
        week: "SEMANA",
        threeDay: "3 DIAS",
        day: "DIA",
        agenda: "AGENDA"
      },
      eventArray: [
        {
          id: 1,
          summary: "Auto de Benja",
          description: "Cambio de Llanta",
          location: "Oficina de los olivos",
          start: {
            dateTime: "2020-10-16T14:00:00",
            timeZone: "America/Lima"
          },
          end: {
            dateTime: "2020-10-16T14:00:00",
            timeZone: "America/Lima"
          },
          color: "positive",
          attendees: [
            {
              id: 1,
              email: "baldeonbenja@reinventing.com.pe",
              displayName: "Benjamin Baldeon",
              organizer: false,
              self: false,
              resource: false
            }
          ]
        },
        {
          id: 2,
          summary: "Pinche Chamo",
          description: "LLantas nuevas",
          color: "orange",
          start: {
            dateTime: "2020-10-31T18:51:00",
            timeZone: "America/Lima"
          },
          end: {
            dateTime: "2020-10-31T18:55:00",
            timeZone: "America/Lima"
          }
        },
        {
          id: 3,
          summary: "Pinche Boba",
          description: "Rompio el motor",
          start: {
            dateTime: "2020-10-16T17:30:00",
            timeZone: "America/Lima"
          },
          end: {
            dateTime: "2020-10-16T17:30:00",
            timeZone: "America/Lima"
          }
        }
      ]
    };
  },

  methods: {
    activar(val) {
      // console.log(val);
      this.dataCita = val;
      this.fixed = true;
    },
    async confirm() {
      console.log(this.dataCita.attendees[0].infocita);
      this.$store.commit(
        "example/dataIngresoVehicular",
        this.dataCita.attendees[0].infocita
      );
      this.$store.commit("example/dialogIngresoVehicular", true);
      // this.$q
      //   .dialog({
      //     title: "Confirmar",
      //     message: "vas a generar una operacion, estas seguro?",
      //     cancel: true,
      //     persistent: true
      //   })
      //   .onOk(() => {
      //     // console.log('>>>> OK')
      //     // this.$store.commit("example/dataIngresoVehicular", val);
      //     // this.$store.commit("example/dialogIngresoVehicular", true);
      //     this.fixed = false;
      //   })
      //   .onOk(() => {
      //     // console.log('>>>> second OK catcher')
      //     this.fixed = false;
      //   })
      //   .onCancel(() => {
      //     // console.log('>>>> Cancel')
      //     this.fixed = false;
      //   })
      //   .onDismiss(() => {
      //     // console.log('I am triggered on both OK and Cancel')
      //     this.fixed = false;
      //   });
    }
  },
  async created() {
    this.$on();
    this.$root.$on("click-event-MYCALENDAR", this.activar);
    // {
    //   // do something here
    //   console.log("CLICK", eventDetailObject);
    //   this.$emit("iniciar")
    // });
    this.$root.$on("update-event-MYCALENDAR", function(eventDetailObject) {
      // do something here
      console.log("UPDATE", eventDetailObject);
    });
    // this.$q.$on("click-day-MYCALENDAR", function(day) {
    //   // do something here
    //   console.log("Evento DAY");
    // });
    // this.$root.$on("click-event-MYCALENDAR", function(eventDetailObject) {
    //   // do something here
    //   console.log("Evento DAY eventDetailObject");
    // });
    // this.q.$on("click-event-MYCALENDAR", function(eventDetailObject) {
    //   // do something here
    //   console.log("Evento DAY eventDetailObject");
    // });
  }
};
</script>

<style scoped></style>
