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
        <v-card style="padding-bottom:10px">
          <v-card-title class="display-1" v-html="$t('menu5')"></v-card-title>
          <v-card outlined style="margin:10px">
            <v-tabs center-active v-model="tab" background-color="primary" dark>
              <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item v-for="item in items" :key="item.tab">
                <v-card flat>
                  <v-card-text
                    style="text-align: center;
                          color: black;
                          word-break: keep-all;"
                  >
                    <br />
                    {{ item.content }}
                    <br />
                    <br />
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      items: [
        {
          tab: this.$t("menu5-1-title"),
          content: this.$t("menu5-1-content")
        },

        {
          tab: this.$t("menu5-2-title"),
          content: this.$t("menu5-2-content")
        },
        {
          tab: this.$t("menu5-3-title"),
          content: this.$t("menu5-3-content")
        },

        {
          tab: this.$t("menu5-4-title"),
          content: this.$t("menu5-4-content")
        }
      ]
    };
  }
};
</script>
