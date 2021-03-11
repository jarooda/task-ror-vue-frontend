<template>
  <div class="bg-secondary min-vh-100">
    <Navbar />
    <div class="container w-100 grid pt-4">
      <div class="row">
        <div class="col-12 col-md-4">
          <Form />
        </div>
        <div class="col-12 col-md-8">
          <SortingForm />
          <TaskCard  v-for="task in tasks" :key="task.id" :data="task" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Form from '@/components/Form.vue'
import TaskCard from '@/components/TaskCard.vue'
import SortingForm from '@/components/SortingForm.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    Form,
    TaskCard,
    SortingForm
  },
  methods: {
    fetchTasks () {
      this.$store.dispatch('FETCH_ALL')
    }
  },
  computed: {
    tasks () {
      return this.$store.getters.orderedTasks
    }
  },
  created () {
    this.fetchTasks()
  }
}
</script>

<style>
</style>
