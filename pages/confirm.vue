<template>
  <div>Waiting for login...</div>
</template>
<script setup>
// you will want to restric to admin users
const user = useSupabaseUser()
watch(user, () => {
  if (user.value) {
    return navigateTo('/')
  }
}, { immediate: true })
</script>