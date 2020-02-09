<template>
    <v-container fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
                <v-card>
                    <v-form id="signin" ref="signup" v-model="valid">
                        <div
                            class="display-1 text-center"
                            v-html="$t('auth-signup')"
                        ></div>
                        <v-text-field
                            :label="$t('auth-id')"
                            v-model="user.id"
                            :rules="idRules"
                            @keydown="idChange"
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

                        <v-text-field
                            :label="$t('auth-pass-conf')"
                            :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="visible ? 'text' : 'password'"
                            @click:append="visible = !visible"
                            :rules="passConfRules"
                            counter
                            required
                        ></v-text-field>
                        <v-text-field
                            :label="$t('auth-name')"
                            v-model="user.name"
                            :rules="nameRules"
                            counter
                            required
                        ></v-text-field>
                        <v-text-field
                            :label="$t('auth-email')"
                            v-model="user.email"
                            :rules="emailRules"
                            required
                        ></v-text-field>
                    </v-form>
                    <v-card-actions>
                        <v-btn
                            @click="submit"
                            class="btn-lg"
                            color="deep-purple accent-4"
                            v-html="$t('auth-signup')"
                            dark
                        ></v-btn>
                        <br />
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Axios from "axios";
export default {
    data() {
        return {
            valid: true,
            idExist: false,
            visible: false,
            user: {
                id: "",
                pass: "",
                name: "",
                email: ""
            },
            idRules: [
                v => !!v || this.$t("auth-err-required"),
                v => v.length >= 6 || this.$t("auth-err-id-least"),
                v => this.idExist != true || this.$t("auth-err-id-exist")
            ],
            passRules: [
                v => !!v || this.$t("auth-err-required"),
                v => v.length >= 8 || this.$t("auth-err-pass-least")
            ],
            passConfRules: [
                v => !!v || this.$t("auth-err-required"),
                v => v == this.user.pass || this.$t("auth-err-pass-conf")
            ],
            nameRules: [
                v => !!v || this.$t("auth-err-required"),
                v => (v && v.length <= 10) || this.$t("auth-err-name-conf")
            ],
            emailRules: [
                v => !!v || this.$t("auth-err-required"),
                v => /.+@.+\..+/.test(v) || this.$t("auth-err-email-conf")
            ]
        };
    },
    methods: {
        submit() {
            if (this.$refs.signup.validate()) {
                this.signup();
            }
        },
        idChange() {
            if (this.idExist) {
                this.idExist = false;
            }
        },
        signup() {
            Axios.post("api/users", this.user)
                .then(res => {
                    if (res.status === 201) {
                        this.$router.push({
                            name: "signin",
                            params: { signup: true }
                        });
                    }
                })
                .catch(err => {
                    if (err.response.status === 409) {
                        this.idExist = true;
                        this.$refs.signup.validate();
                    }
                });
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
