<script setup lang="ts">
import { onMounted, ref } from "vue";
import { TaskApi } from "../../api/task.api";
import type { Task } from "../../types/Task";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const userId = route.params.userId as string;
const tasks = ref<Task[]>([]);

// Carrega tarefas do usuário
async function loadTasks() {
  const { data } = await TaskApi.listByUser(userId);
  tasks.value = data;
}

// Criar nova tarefa → redireciona para TaskForm.vue
function createTask() {
  router.push(`/tasks/${userId}/new`);
}

// Editar tarefa → redireciona para TaskForm.vue com taskId
function editTask(taskId: string) {
  router.push(`/tasks/${userId}/${taskId}/edit`);
}

// Deletar tarefa
async function deleteTask(taskId: string) {
  if (confirm("Deseja realmente deletar esta tarefa?")) {
    await TaskApi.remove(taskId);
    await loadTasks();
  }
}

// Alterar status rápido
async function changeStatus(task: Task, status: Task["status"]) {
  await TaskApi.changeStatus(task.id, status);
  await loadTasks();
}

onMounted(loadTasks);
</script>

<template>
  <div>
    <h2>Tarefas do Usuário</h2>

    <button @click="createTask" class="btn-create">Nova Tarefa</button>

    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Descrição</th>
          <th>Prioridade</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in tasks" :key="t.id">
          <td>{{ t.title }}</td>
          <td>{{ t.description }}</td>
          <td>{{ t.priority }}</td>
          <td>
            <select
              :value="t.status"
              @change="
                changeStatus(
                  t,
                  ($event.target as HTMLSelectElement).value as any,
                )
              "
            >
              <option value="PENDENTE">Pendente</option>
              <option value="EM_PROGRESSO">Em progresso</option>
              <option value="FEITO">Feito</option>
              <option value="ARQUIVADO">Arquivado</option>
            </select>
          </td>
          <td>
            <button @click="editTask(t.id)" class="btn-edit">Editar</button>
            <button @click="deleteTask(t.id)" class="btn-delete">
              Excluir
            </button>
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
th,
td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}
button {
  margin-right: 0.5rem;
}
.btn-create {
  margin-bottom: 1rem;
}
</style>
