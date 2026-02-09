<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TaskApi } from '../../api/task.api'
import type { Task } from '../../types/Task'

// Router
const route = useRoute()
const router = useRouter()

// IDs
const userId = ref<string>(route.params.userId as string)
const taskId = ref<string | undefined>(route.params.taskId as string | undefined)

// Campos do form
const title = ref<string>('')
const description = ref<string>('')
const priority = ref<Task['priority']>('MEDIO')
const status = ref<Task['status']>('PENDENTE')

// Função para carregar tarefa
async function loadTask(id: string) {
  try {
    const { data } = await TaskApi.get(id)
    title.value = data.title
    description.value = data.description ?? ''
    priority.value = data.priority
    status.value = data.status
  } catch (err) {
    console.error('Erro ao carregar tarefa:', err)
  }
}

// Salvar tarefa
async function save() {
  const payload: Partial<Task> = {
    title: title.value,
    description: description.value,
    priority: priority.value,
    status: status.value,
    userId: userId.value
  }

  try {
    if (taskId.value) {
      await TaskApi.update(taskId.value, payload)
    } else {
      await TaskApi.create(payload)
    }
    router.push(`/tasks/${userId.value}`)
  } catch (err) {
    console.error('Erro ao salvar tarefa:', err)
  }
}

// Recarrega se taskId mudar
watch(
  () => route.params.taskId,
  (newId) => {
    taskId.value = newId as string | undefined

    if (taskId.value) {
      loadTask(taskId.value)
    } else {
      // limpa o formulário quando for "nova tarefa"
      title.value = ''
      description.value = ''
      priority.value = 'MEDIO'
      status.value = 'PENDENTE'
    }
  },
  { immediate: true }
)


// Atualiza userId se mudar
watch(
  () => route.params.userId,
  (newId) => {
    userId.value = newId as string
  }
)
</script>

<template>
  <div>
    <h2>{{ taskId ? 'Editar Tarefa' : 'Nova Tarefa' }}</h2>

    <form @submit.prevent="save">
      <div>
        <label>Título:</label>
        <input v-model="title" placeholder="Título" required />
      </div>

      <div>
        <label>Descrição:</label>
        <textarea v-model="description" placeholder="Descrição"></textarea>
      </div>

      <div>
        <label>Prioridade:</label>
        <select v-model="priority">
          <option :value="'BAIXO'">Baixo</option>
          <option :value="'MEDIO'">Médio</option>
          <option :value="'ALTO'">Alto</option>
        </select>
      </div>

      <div v-if="taskId">
        <label>Status:</label>
        <select v-model="status">
          <option :value="'PENDENTE'">Pendente</option>
          <option :value="'EM_PROGRESSO'">Em progresso</option>
          <option :value="'FEITO'">Feito</option>
          <option :value="'ARQUIVADO'">Arquivado</option>
        </select>
      </div>

      <button type="submit">Salvar</button>
      <button type="button" @click="router.push(`/tasks/${userId}`)">Cancelar</button>
    </form>
  </div>
</template>

<style scoped>
div { margin-bottom: 1rem; }
input, textarea, select { width: 100%; padding: 0.5rem; margin-top: 0.25rem; }
button { margin-right: 0.5rem; margin-top: 0.5rem; }
</style>
