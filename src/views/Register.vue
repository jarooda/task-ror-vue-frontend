<template>
  <div class="page-container">
    <form class="text-center p-5 form-container bg-white rounded-lg" @submit.prevent="login">
      <h1>Register</h1>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="foo@bar.com" v-model="email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="your password" v-model="password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <p class="mt-3 text-sm">
        Already have an account? Login
      </p>
    </form>
  </div>
</template>

<script>
import axios from '../config/axios'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      axios({
        method: 'post',
        url: '/users',
        data: {
          email: this.email,
          password: this.password
        }
      }).then(({ data }) => {
        localStorage.setItem('access_token', data.token)
        this.$router.push('/')
      }).catch(({ response }) => {
        console.log(response.data)
      })
    }
  }
}
</script>

<style>
</style>
