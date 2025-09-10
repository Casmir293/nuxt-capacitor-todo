<script setup lang="ts">
const { fetchUsers } = useAuth();
const users = ref<User[]>([]);

onMounted(async () => {
  users.value = (await fetchUsers()) as User[];
});
</script>

<template>
  <h3>List of Users</h3>
  <ol>
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
  </ol>
</template>
