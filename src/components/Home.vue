<template>
  <div>
    <div id="home-banner"></div>
    <v-container>
      <v-row justify="center">
        <v-col :cols="12" :xs="12" :sm="10" :md="6" :lg="6" :xl="3">
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

        <v-col fill-height :cols="12" :xs="12" :sm="10" :md="6" :lg="6" :xl="3">
          <v-card>
            <v-card-title primary-title>
              {{
              $t("menu3")
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

        <v-col fill-height :cols="12" :xs="12" :sm="10" :md="6" :lg="6" :xl="3">
          <v-card>
            <v-card-title primary-title>
              {{
              $t("menu4")
              }}
            </v-card-title>
            <v-card-text></v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="primary" to="/music">
                {{
                $t("home-start")
                }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col :cols="12" :xs="12" :sm="10" :md="6" :lg="6" :xl="3">
          <v-card>
            <v-card-title primary-title>
              {{
              $t("menu5")
              }}
            </v-card-title>
            <v-card-text></v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="primary" to="/image">
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
