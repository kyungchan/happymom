<template>
  <div>
    <div id="home-banner"></div>
    <v-container>
      <v-row>
        <v-col :cols="12" :xs="12" :sm="6" :md="6" :lg="6" :xl="4" offset-xl="2">
          <v-card>
            <v-card-title primary-title>
              {{
              $t("menu1")
              }}
            </v-card-title>
            <v-card-text></v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="primary" to="/survey">
                {{
                $t("home-start")
                }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col :cols="12" :xs="12" :sm="6" :md="6" :lg="6" :xl="4">
          <v-card>
            <v-card-title primary-title>
              {{
              $t("menu2")
              }}
            </v-card-title>
            <v-card-text></v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="primary" to="/info">
                {{
                $t("home-start")
                }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#home-banner {
  background-image: url("../assets/home/banner.jpg");
  height: 400px;
  background-position: center;
  background-size: cover;
}
</style>
