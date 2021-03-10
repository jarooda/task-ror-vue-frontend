<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="navbar-container">
      <span class="navbar-brand">Task Vue-Rails</span>
      <a @click="logout" class="btn btn-danger">Logout</a>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout () {
      localStorage.removeItem('access_token')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
  .navbar-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
</style>
