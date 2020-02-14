<template>
  <v-container>
    <v-row>
      <v-col
        :cols="12"
        :xs="12"
        :sm="10"
        :offset-sm="1"
        :md="10"
        :offset-md="1"
        :lg="10"
        :offset-lg="1"
        :xl="8"
        :offset-xl="2"
      >
        <v-card style="background-color:#888">
          <v-tabs show-arrows center-active v-model="tab" background-color="primary" dark>
            <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item style="background-color:#888">
              <info1 />
            </v-tab-item>
            <v-tab-item style="background-color:#888">
              <info2 />
            </v-tab-item>
            <v-tab-item style="background-color:#888">
              <info3 />
            </v-tab-item>
            <v-tab-item style="background-color:#888">
              <info4 />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import info1 from "@/components/Info1";
import info2 from "@/components/Info2";
import info3 from "@/components/Info3";
import info4 from "@/components/Info4";
export default {
  components: { info1, info2, info3, info4 },
  watch: {},

  data() {
    return {
      tab: null,
      items: [
        { tab: this.$t("menu3-1-title") },
        {
          tab: this.$t("menu3-2-title")
        },
        { tab: this.$t("menu3-3-title") },
        { tab: this.$t("menu3-4-title") }
      ]
    };
  }
};
</script>
<style scoped>
</style>
