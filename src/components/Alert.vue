<template>
  <div v-if="show" class="alert alert-danger alert-dismissible my-0">
    <strong>Due Today!</strong> <strong>Title:</strong> {{ data.title }}, <strong>Description:</strong> {{ data.description }}.
    <button type="button" class="close" @click="close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      show: true
    }
  },
  methods: {
    close () {
      this.show = false
    }
  }
}
</script>

<style>

</style>
