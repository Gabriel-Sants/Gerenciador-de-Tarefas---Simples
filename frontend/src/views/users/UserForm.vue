<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { UserApi } from '../../api/user.api'
import type { User } from '../../types/User'

const router = useRouter()
const route = useRoute()

const isEdit = Boolean(route.params.id)

const form = ref<Partial<User>>({
  name: '',
  email: '',
  active: true
})

async function loadUser() {
  if (!isEdit) return

  const { data } = await UserApi.get(route.params.id as string)
  form.value = data
}

async function submit() {
  if (isEdit) {
    await UserApi.update(route.params.id as string, {
      name: form.value.name,
      email: form.value.email
    })
  } else {
    await UserApi.create({
      name: form.value.name,
      email: form.value.email,
      password: '123456' // mock (backend não valida hash ainda)
    })
  }

  router.push('/users')
}

onMounted(loadUser)
</script>

<template>
  <div>
    <h2>{{ isEdit ? 'Editar Usuário' : 'Novo Usuário' }}</h2>

    <form @submit.prevent="submit">
      <div>
        <label>Nome</label>
        <input v-model="form.name" required />
      </div>

      <div>
        <label>Email</label>
        <input v-model="form.email" type="email" required />
      </div>

      <button type="submit">
        {{ isEdit ? 'Salvar' : 'Criar' }}
      </button>

      <button type="button" @click="router.push('/users')">
        Cancelar
      </button>
    </form>
  </div>
</template>
