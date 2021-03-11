<template>
  <form @submit.prevent="sortState">
    <div class="form-row mb-sm-0 mb-3">
      <div class="col-sm-5 col-6">
        <div class="form-group">
          <select class="custom-select" v-model="order_by">
            <option value="" disabled>Order By</option>
            <option value="due_date">Due Date</option>
            <option value="description">Description</option>
            <option value="priorities">Priority</option>
          </select>
        </div>
      </div>
      <div class="col-sm-5 col-6">
        <div class="form-group">
          <select class="custom-select" v-model="sort_direction">
            <option value="" disabled>Sort Direction</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div class="col-sm-2 col-12">
        <button type="submit" class="btn btn-info w-100">Sort</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data () {
    return {
      order_by: '',
      sort_direction: ''
    }
  },
  methods: {
    sortState () {
      if (this.order_by && this.sort_direction) {
        this.$store.commit('SET_SORT_BY', {
          order_by: this.order_by,
          sort_direction: this.sort_direction
        })
      }
    }
  }
}
</script>

<style>

</style>
