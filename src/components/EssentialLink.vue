<template>
  <div>
    <q-item
      class="q-ma-sm navigation-item"
      clickable
      active-class="tab-active"
      v-ripple
      exact
      @click="URL(link)"
    >
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
        <!--      <q-item-label caption>-->
        <!--        {{ caption }}-->
        <!--      </q-item-label>-->
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ""
    },

    link: {
      type: String,
      default: "#"
    },

    icon: {
      type: String,
      default: ""
    }
  },
  methods: {
    async URL(arg) {
      await this.$router.push(arg);
    }
  }
};
</script>
