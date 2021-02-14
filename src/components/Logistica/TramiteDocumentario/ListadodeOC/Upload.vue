<template>
  <div>
    <Uploadbasic />
    <q-btn
      :loading="loadboton"
      class="full-width"
      @click="guardar"
      color="positive"
      label="Guardar"
    />
  </div>
</template>

<script>
import { storagelocal } from "../../../../mixins/mixin";
import { mapActions } from "vuex";
export default {
  mixins: [storagelocal],
  components: {
    Uploadbasic: () => import("components/Upload/UploadBasic")
  },
  data() {
    return {
      loadboton: false,
      selected_file: "",
      check_if_document_upload: false,
      archivo: ""
    };
  },
  methods: {
      ...mapActions("usuarios", ["callCambioFotper", "callUsers"]),
      async guardar() {
          this.$emit("click", 1);
      }
  }
};
// Get archivo
// http://localhost:9500/fileserver/myfiles/getfile/0.jpg
</script>
