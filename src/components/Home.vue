<template>
    <div>
        <div id="home-banner"></div>
        <v-container>
            <v-row>
                <v-col :cols="12" :xs="12" :sm="4" :md="4" :lg="4">
                    <v-card>
                        <v-card-title primary-title>title</v-card-title>
                        <v-card-text
                            >111111<br /><br /><br /><br
                        /></v-card-text>
                    </v-card>
                </v-col>
                <v-col :cols="12" :xs="12" :sm="4" :md="4" :lg="4">
                    <v-card>
                        <v-card-title primary-title>title</v-card-title>
                        <v-card-text
                            >222222<br /><br /><br /><br
                        /></v-card-text>
                    </v-card>
                </v-col>
                <v-col :cols="12" :xs="12" :sm="4" :md="4" :lg="4">
                    <v-card>
                        <v-card-title primary-title>title</v-card-title>
                        <v-card-text
                            >333333<br /><br /><br /><br
                        /></v-card-text>
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
