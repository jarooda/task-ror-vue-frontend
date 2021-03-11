import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import { isEqual } from 'date-fns'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [],
    task: {
      id: '',
      title: '',
      description: '',
      status: false,
      priorities: 'low',
      due_date: ''
    },
    isEdit: false,
    sortBy: {
      order_by: '',
      sort_direction: ''
    }
  },
  mutations: {
    FETCH_ALL (state, payload) {
      state.tasks = payload
    },
    SET_TASK_BY_KEY (state, payload) {
      const key = Object.keys(payload)[0]
      state.task[key] = payload[key]
    },
    SET_TASK_BULK (state, payload) {
      state.task = payload
    },
    SET_IS_EDIT (state, payload) {
      state.isEdit = payload
    },
    ADD_TASK (state, payload) {
      state.tasks.push(payload)
    },
    DELETE_TASK (state, payload) {
      const filtered = state.tasks.filter(t => t.id !== +payload)
      state.tasks = filtered
    },
    EDIT_TASK (state, payload) {
      const temp = state.tasks.map(task => {
        if (task.id === payload.id) {
          return payload
        } else {
          return task
        }
      })
      state.tasks = temp
    },
    SET_SORT_BY (state, payload) {
      state.sortBy = payload
    }
  },
  actions: {
    FETCH_ALL (context) {
      const token = localStorage.getItem('access_token')

      axios({
        method: 'get',
        url: '/api/v1/tasks',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(({ data }) => {
        context.commit('FETCH_ALL', data)
      }).catch((err) => {
        console.log(err)
      })
    },
    ADD_TASK (context, payload) {
      const token = localStorage.getItem('access_token')

      axios({
        method: 'post',
        url: '/api/v1/tasks',
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: payload
      }).then(({ data }) => {
        context.commit('ADD_TASK', data)
      }).catch((err) => {
        console.log(err)
      })
    },
    DELETE_TASK (context, payload) {
      const token = localStorage.getItem('access_token')

      axios({
        method: 'delete',
        url: `/api/v1/tasks/${payload}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(({ data }) => {
        context.commit('DELETE_TASK', payload)
      }).catch((err) => {
        console.log(err)
      })
    },
    EDIT_TASK (context, payload) {
      const token = localStorage.getItem('access_token')

      axios({
        method: 'put',
        url: `/api/v1/tasks/${payload.id}`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          title: payload.title,
          description: payload.description,
          status: payload.status,
          priorities: payload.priorities,
          due_date: payload.due_date
        }
      }).then(({ data }) => {
        context.commit('EDIT_TASK', data)
      }).catch((err) => {
        console.log(err)
      })
    },
    EDIT_TASK_STATUS (context, payload) {
      const token = localStorage.getItem('access_token')
      console.log(payload)
      axios({
        method: 'patch',
        url: `/api/v1/tasks/${payload.id}`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          status: payload.status
        }
      }).then(({ data }) => {
        context.commit('EDIT_TASK', data)
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  modules: {
  },
  getters: {
    orderedTasks: (state) => {
      const key = state.sortBy.order_by
      const order = state.sortBy.sort_direction
      if (order && key) {
        return state.tasks.sort((a, b) => {
          const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key]
          const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key]

          let comparison = 0
          if (varA > varB) {
            comparison = 1
          } else if (varA < varB) {
            comparison = -1
          }
          return (
            (order === 'desc') ? (comparison * -1) : comparison
          )
        })
      } else {
        return state.tasks.sort((a, b) => {
          if (a.due_date < b.due_date) {
            return -1
          } else if (a.due_date > b.due_date) {
            return 1
          } else {
            return 0
          }
        })
      }
    },
    tasksDueToday: (state) => {
      return state.tasks.filter(task => {
        const rawDate = new Date().toISOString().split('T')[0]
        const today = new Date(rawDate)
        const taskDate = new Date(task.due_date)

        return isEqual(today, taskDate) && !task.status
      })
    }
  }
})
