<template>
  <div class="content has-text-centered">
    <h1 class="is-title is-bold">WELCOME</h1>
    <h2>DASHBOAD ADMIN</h2>
        <div class="nav-center is-flex">
          <router-link v-if="!$auth.check()" to="/login" class="button is-link"><h4><strong>Login</strong></h4></router-link>
          <a v-if="$auth.check()" @click="logout" class="button is-link">Logout</a>
        </div>
    <p>
      <img width="200" src="~assets/logo.png" :alt="description">
    </p>

    <!-- <h1 class="is-title is-bold">{{ name.replace('-', ' ') }}</h1>

    <p>
      <strong>{{ description }}</strong>,
    </p>
    -->
    <p>SMS Gateway Report</p>
  </div>
</template>

<script>
export default {

  data () {
    return this.$store.state.pkg
  }

}
</script>

<style lang="scss" scoped>
.is-title {
  text-transform: capitalize;
}
</style>
