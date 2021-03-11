<template>
  <div class="bg-secondary min-vh-100">
    <Navbar />
    <Alert v-for="task in tasksDueToday" :key="task.id" :data="task"/>
    <div class="container w-100 grid pt-4">
      <div class="row">
        <div class="col-12 col-md-4">
          <Form />
        </div>
        <div class="col-12 col-md-8">
          <SortingForm />
          <TaskCard v-for="task in tasks" :key="task.id" :data="task" />
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
import Alert from '@/components/Alert.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    Form,
    TaskCard,
    SortingForm,
    Alert
  },
  methods: {
    fetchTasks () {
      this.$store.dispatch('FETCH_ALL')
    }
  },
  computed: {
    tasks () {
      return this.$store.getters.orderedTasks
    },
    tasksDueToday () {
      return this.$store.getters.tasksDueToday
    }
  },
  created () {
    this.fetchTasks()
  }
}
</script>

<style>
</style>
