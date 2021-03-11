<template>
  <div :class="`card mb-3 ${data.status ? 'bg-dark text-white' : ''}`">
    <div class="card-header">
      {{ data.title }}
    </div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <p>{{ data.description }}</p>
        <footer class="blockquote-footer">
          <span class="badge badge-success">{{ data.status ? "Done" : "Not Done" }}</span> || <span class="badge badge-primary">Priorities: {{ data.priorities }}</span> || <span class="badge badge-info">Due Date: {{ indoFormatDate }}</span>
        </footer>
        <div class="mt-2 d-flex flex-column-reverse flex-md-row-reverse">
          <button class="btn btn-danger m-2" @click="destroy">Delete</button>
          <button class="btn btn-warning m-2" @click="edit">Edit</button>
          <button class="btn btn-success m-2" @click="editStatus">{{ data.status ? "Mark as Not Done" : "Mark as Done" }}</button>
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
      this.$store.commit('SET_TASK_BULK', { ...this.data })
    },
    editStatus () {
      this.$store.dispatch('EDIT_TASK', {
        id: this.data.id,
        status: !this.data.status
      })
    }
  }
}
</script>

<style>

</style>
