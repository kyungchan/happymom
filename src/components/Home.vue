<template>
  <div>
    <div id="home-banner"></div>
    <v-container>
      <v-row justify="center">
        <v-col :cols="11" :xs="11" :sm="10" :md="5" :lg="5" :xl="3">
          <v-card>
            <div id="menu1"></div>
            <v-card-title class>
              {{
              $t("menu1")
              }}
            </v-card-title>
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

        <v-col fill-height :cols="11" :xs="11" :sm="10" :md="5" :lg="5" :xl="3">
          <v-card>
            <div id="menu2"></div>
            <v-card-title primary-title>
              {{
              $t("menu3")
              }}
            </v-card-title>
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

        <v-col fill-height :cols="11" :xs="11" :sm="10" :md="5" :lg="5" :xl="3">
          <v-card>
            <div id="menu3"></div>
            <v-card-title>
              {{
              $t("menu4")
              }}
            </v-card-title>
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

        <v-col :cols="11" :xs="11" :sm="10" :md="5" :lg="5" :xl="3">
          <v-card>
            <div id="menu4"></div>
            <v-card-title>
              {{
              $t("menu5")
              }}
            </v-card-title>
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
  height: 300px;
  background-position: center;
  background-size: cover;
}
#menu1 {
  background-image: url("../assets/home/check.jpg");
  height: 130px;
  background-position: center;
  background-size: cover;
}
#menu2 {
  background-image: url("../assets/home/book.jpg");
  height: 130px;
  background-position: center;
  background-size: cover;
}
#menu3 {
  background-image: url("../assets/home/piano.jpg");
  height: 130px;
  background-position: center;
  background-size: cover;
}
#menu4 {
  background-image: url("../assets/home/sunset.jpg");
  height: 130px;
  background-position: bottom;
  background-size: cover;
}
</style>
