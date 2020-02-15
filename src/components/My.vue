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
        <v-card>
          <v-card-title class="display-1" v-html="$t('auth-my')"></v-card-title>

          <v-card-text>
            <table class="body-1">
              <tr>
                <td v-html="$t('auth-id')"></td>
                <td>{{ userid }}</td>
              </tr>
              <tr>
                <td v-html="$t('auth-name')"></td>
                <td>{{ username }}</td>
              </tr>
              <tr>
                <td v-html="$t('auth-email')"></td>
                <td>{{ useremail }}</td>
              </tr>
              <tr>
                <td v-html="$t('my-agree')"></td>
                <td>{{ create_time }}</td>
              </tr>
            </table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  created() {
    this.$store.commit("loginCheck");
  },
  computed: {
    userid() {
      return this.$store.state.userid;
    },
    username() {
      return this.$store.state.username;
    },
    useremail() {
      return this.$store.state.email;
    },
    userrole() {
      return this.$store.state.role;
    },
    create_time() {
      return this.$store.state.create_time;
    }
  }
};
</script>

<style scoped>
table {
  padding: 20px;
}
table td {
  padding-right: 20px;
}
</style>