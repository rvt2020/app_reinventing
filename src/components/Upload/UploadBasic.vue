<template>
  <div class="q-pa-md">
    <div class="q-gutter-sm row items-start">
      <q-uploader
        :url="urlimagen"
        @uploaded="uploaded"
        label="Custom header"
        multiple
      >
        <template v-slot:header="scope">
          <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
            <q-btn
              v-if="scope.queuedFiles.length > 0"
              icon="clear_all"
              @click="scope.removeQueuedFiles"
              round
              dense
              flat
            >
              <q-tooltip>Limpiar todo</q-tooltip>
            </q-btn>
            <q-btn
              v-if="scope.uploadedFiles.length > 0"
              icon="done_all"
              @click="scope.removeUploadedFiles"
              round
              dense
              flat
            >
              <q-tooltip>Remove Uploaded Files</q-tooltip>
            </q-btn>
            <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
            <div class="col">
              <div class="q-uploader__title">Sube tus archivos</div>
              <div class="q-uploader__subtitle">
                {{ scope.uploadSizeLabel }} / {{ scope.uploadProgressLabel }}
              </div>
            </div>
            <q-btn
              v-if="scope.canAddFiles"
              type="a"
              icon="add_box"
              round
              dense
              flat
            >
              <q-uploader-add-trigger />
              <q-tooltip>Selecciona archivos</q-tooltip>
            </q-btn>
            <q-btn
              v-if="scope.canUpload"
              icon="cloud_upload"
              @click="scope.upload"
              round
              dense
              flat
            >
              <q-tooltip>Subir archivos</q-tooltip>
            </q-btn>

            <q-btn
              v-if="scope.isUploading"
              icon="clear"
              @click="scope.abort"
              round
              dense
              flat
            >
              <q-tooltip>Abort Upload</q-tooltip>
            </q-btn>
          </div>
        </template>
      </q-uploader>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadBasic",
  data() {
    return {
      fileUploadBasic: ""
    };
  },
  computed: {
    urlimagen() {
      return `${process.env.Imagen_URL}/upload`;
    }
  },
  methods: {
    uploaded(files) {
      console.log("subio");
      console.log(files);
      const response = JSON.parse(files.xhr.response).name;
      this.$q.notify({
        message: response
      });
      console.log(response);
      this.$store.commit("example/arcadj", response);
    }
  },
  async created() {
    console.log("Upload Basic");
  }
};
</script>

<style scoped></style>
