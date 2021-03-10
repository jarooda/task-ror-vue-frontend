<template>
  <form @submit.prevent="submitForm" class="form-container p-3 bg-white rounded-lg text-center mb-4">
    <h3 v-if="isEdit">Edit Task</h3>
    <h3 v-else>Add Task</h3>
    <div class="form-group">
      <label class="font-weight-bold">Title</label>
      <input type="text" class="form-control" placeholder="Title" v-model="title">
    </div>
    <div class="form-group">
      <label class="font-weight-bold">Description</label>
      <textarea class="form-control" cols="10" rows="3" placeholder="Description" v-model="description" />
    </div>
    <div class="form-group">
      <label class="font-weight-bold">Status</label>
      <div class="form-check">
        <label class="form-check-label">
          <input class="form-check-input" type="radio" :value="true" v-model="status">
          Done
        </label>
      </div>
      <div class="form-check">
        <label class="form-check-label">
          <input class="form-check-input" type="radio" :value="false"  v-model="status">
          Not Done
        </label>
      </div>
    </div>
    <div class="form-group">
      <label class="font-weight-bold">Priorities</label>
      <select class="custom-select" v-model="priorities">
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </select>
    </div>
    <div class="form-group">
      <label class="font-weight-bold">Due Date</label>
      <input type="date" class="form-control" placeholder="Due Date" v-model="due_date">
    </div>
    <div class="flex justify-around container">
      <button class="btn-warning btn" type="button" @click="clearForm">{{ isEdit ? "Cancel" : "Clear" }}</button>
      <button type="submit" class="btn btn-primary">{{ isEdit ? "Edit Task" : "Add Task" }}</button>
    </div>
  </form>
</template>

<script>
import { mapFields } from '../helpers/mapField'

export default {
  data () {
    return {
    }
  },
  methods: {
    clearForm () {
      const payload = {
        id: '',
        title: '',
        description: '',
        status: false,
        priorities: 'low',
        due_date: ''
      }

      this.$store.commit('SET_IS_EDIT', false)
      this.$store.commit('SET_TASK_BULK', payload)
    },
    submitForm () {
      const option = this.isEdit ? 'EDIT_TASK' : 'ADD_TASK'

      this.$store.dispatch(option, {
        id: this.id,
        title: this.title,
        description: this.description,
        status: this.status,
        priorities: this.priorities,
        due_date: this.due_date
      })
      this.clearForm()
    }
  },
  computed: {
    ...mapFields({
      fields: ['title', 'description', 'status', 'priorities', 'due_date', 'id'],
      base: 'task',
      mutation: 'SET_TASK_BY_KEY'
    }),
    isEdit () {
      return this.$store.state.isEdit
    }
  }
}
</script>

<style>

</style>
