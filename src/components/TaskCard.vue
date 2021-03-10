<template>
  <div class="card mb-3">
    <div class="card-header">
      {{ data.title }}
    </div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <p>{{ data.description }}</p>
        <footer class="blockquote-footer">
          {{ data.status ? "Done" : "Not Done" }} || Priorities: {{ data.priorities }} || Due Date: {{ indoFormatDate }}
        </footer>
        <div class="mt-2 d-flex flex-row-reverse">
          <button class="btn btn-danger m-2" @click="destroy">Delete</button>
          <button class="btn btn-warning m-2" @click="edit">Edit</button>
        </div>
      </blockquote>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export default {
  props: ['data'],
  computed: {
    indoFormatDate () {
      return format(new Date(this.data.due_date), 'dd MMMM yyyy', { locale: id })
    }
  },
  methods: {
    destroy () {
      this.$store.dispatch('DELETE_TASK', this.data.id)
    },
    edit () {
      this.$store.commit('SET_IS_EDIT', true)
      this.$store.commit('SET_TASK_BULK', this.data)
    }
  }
}
</script>

<style>

</style>
