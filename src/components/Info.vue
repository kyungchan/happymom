<template>
  <div>
    ID:{{ userid }}
    <br />
    NAME: {{ username }}
    <br />
    EMAIL: {{ useremail }}
    <br />
    ROLE: {{ userrole }}
  </div>
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
    }
  }
};
</script>

<style>
</style>