import { createRouter, createWebHistory } from 'vue-router'

import UserList from '../views/users/UserList.vue'
import UserForm from '../views/users/UserForm.vue'
import TaskList from '../views/tasks/TaskList.vue'
import TaskForm from '../views/tasks/TaskForm.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/users' },

    { path: '/users', component: UserList },
    { path: '/users/new', component: UserForm },
    { path: '/users/:id/edit', component: UserForm, props: true },

    { path: '/tasks/:userId', component: TaskList, props: true },
    { path: '/tasks/:userId/new', component: TaskForm, props: true },
    { path: '/tasks/:userId/:taskId/edit', component: TaskForm, props: true }
  ]
})
