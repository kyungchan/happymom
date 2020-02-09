<template>
    <v-container fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
                <v-card>
                    <v-form id="signin" ref="signin">
                        <v-alert
                            type="success"
                            v-if="$route.params.signup === true"
                            dense
                        >
                            {{ this.$t("auth-ok-signup") }}
                        </v-alert>

                        <div
                            class="display-1 text-center"
                            v-html="$t('auth-signin')"
                        ></div>
                        <v-text-field
                            :label="$t('auth-id')"
                            v-model="user.id"
                            :rules="idRules"
                            counter
                            required
                        ></v-text-field>
                        <v-text-field
                            :label="$t('auth-pass')"
                            v-model="user.pass"
                            :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="visible ? 'text' : 'password'"
                            @click:append="visible = !visible"
                            :rules="passRules"
                            counter
                            required
                        ></v-text-field>
                    </v-form>
                    <v-card-actions>
                        <v-btn
                            @click="submit"
                            class="btn-lg"
                            color="deep-purple accent-4"
                            v-html="$t('auth-signin')"
                            dark
                        ></v-btn>
                        <br />
                    </v-card-actions>

                    <router-link
                        id="signup"
                        to="/signup"
                        v-html="$t('auth-signup')"
                    ></router-link>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
            user: {
                id: "",
                pass: ""
            },
            idRules: [
                v => !!v || this.$t("auth-err-required"),
                v => v.length >= 6 || this.$t("auth-err-id-least")
            ],
            passRules: [
                v => !!v || this.$t("auth-err-required"),
                v => v.length >= 8 || this.$t("auth-err-pass-least")
            ]
        };
    },
    methods: {
        submit() {
            if (this.$refs.signin.validate()) {
                this.snackbar = true;
            }
        }
    }
};
</script>

<style scoped>
#signin {
    padding: 20px;
}
#signup {
    display: block;
    color: #474747;
    text-align: center;
    padding: 10px 0;
    font-size: 10pt;
}
.btn-lg {
    width: 100%;
}
</style>
