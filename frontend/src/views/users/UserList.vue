<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { UserApi } from '../../api/user.api'
import type { User } from '../../types/User'
import { useRouter } from 'vue-router'

const users = ref<User[]>([])
const router = useRouter()

// Carrega os usuários
async function loadUsers() {
  const { data } = await UserApi.list()
  users.value = data
}

// Navega para criação
function createUser() {
  router.push('/users/new')
}

// Edita usuário
function editUser(userId: string) {
  router.push(`/users/${userId}/edit`)
}

// Deleta usuário
async function deleteUser(userId: string) {
  if (confirm('Deseja realmente deletar este usuário?')) {
    await UserApi.remove(userId)
    await loadUsers()
  }
}

// Vai para tarefas do usuário
function goToTasks(userId: string) {
  router.push(`/tasks/${userId}`)
}

onMounted(loadUsers)
</script>

<template>
  <div>
    <h2>Usuários</h2>

    <button @click="createUser" class="btn-create">Novo Usuário</button>

    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Ativo</th>
          <th>Criado em</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u.id">
          <td>{{ u.name }}</td>
          <td>{{ u.email }}</td>
          <td>{{ u.active ? 'Sim' : 'Não' }}</td>
          <td>{{ new Date(u.createdAt).toLocaleDateString() }}</td>
          <td>
            <button @click="goToTasks(u.id)" class="btn-tasks">Tarefas</button>
            <button @click="editUser(u.id)" class="btn-edit">Editar</button>
            <button @click="deleteUser(u.id)" class="btn-delete">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
th, td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}
button {
  margin-right: 0.5rem;
}
.btn-create {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
}
</style>
