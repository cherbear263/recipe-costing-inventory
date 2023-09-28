<template>
  <div class="py-4 px-3 absolute left-0 top-20 right-0  max-w-md mx-auto rounded font-medium text-md"
    :class="props.toastColor">
    <p>{{ props.toastMsg }}</p>
  </div>
</template>
<script setup lang="ts">
// call userStore.triggerToast('text-red-200', 'There was a problem')

const props = defineProps({
  toastColor: { type: String, required: true },
  toastMsg: { type: String, required: true }
})


</script>