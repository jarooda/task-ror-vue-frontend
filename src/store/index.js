import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

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
    isEdit: false
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
  }
})
