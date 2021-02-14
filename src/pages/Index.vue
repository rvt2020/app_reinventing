<template>
  <q-page class="flex flex-center">
    <q-card class="my-card" flat bordered style="width: 600px">
      <q-card-section>
        <div class="text-h6">
          <!--          {{userLocal}}-->
          {{ userLocal.no_nombre }} {{ userLocal.no_apepat }}
          {{ userLocal.no_apemat }}
          <!--          <q-btn-->
          <!--            round-->
          <!--            flat-->
          <!--            dense-->
          <!--            icon="close"-->
          <!--            class="float-right"-->
          <!--            color="grey-8"-->
          <!--            v-close-popup-->
          <!--          ></q-btn>-->
        </div>
      </q-card-section>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline text-h4">
            Usuario | {{ userLocal.no_usuari }}
          </div>
          <!--          <div class="text-h5 q-mt-sm q-mb-xs">Coordinador de ventas</div>-->
          <div class="text-caption text-grey">
            DNI | {{ userLocal.co_docide }} <br />
            Nombre Completo | {{ userLocal.no_nombre }}
            {{ userLocal.no_apepat }} {{ userLocal.no_apemat }}
          </div>
        </q-card-section>

        <q-card-section class="col-5 flex flex-center">
          <q-img class="rounded-borders" :src="fotoPerfil" />
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <!--        miguekos1233@gmail.com-->
        Codigo de Usuario | {{ userLocal.co_person }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { storagelocal } from "../mixins/mixin";

export default {
  name: "PageIndex",
  mixins: [storagelocal],
  computed: {
    fotoPerfil() {
      // https://cdn.quasar.dev/img/boy-avatar.png
      if (this.userLocal.co_fotper) {
        return `${process.env.Imagen_URL}/files/${this.userLocal.co_fotper}`;
      } else {
        return `https://cdn.quasar.dev/img/boy-avatar.png`;
      }
    }
  },
  date() {
    return {
      employee_dialog: true
    };
  },
  created() {
    console.log(`${process.env.Imagen_URL}`);
    this.$store.commit("example/location", "");
  }
};
</script>
