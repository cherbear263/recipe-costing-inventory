<template>
  Recipes page
  <!-- Modal toggle -->
  <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" @click="open = !open"
    class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    type="button">
    Toggle modal
  </button>
  <div v-if="open"
    class="fixed top-0 left-0 right-0 z-50 bg-black/75 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <create-recipe class="z-100" @modalClose="close" @confirmForm="confirmRecipe" />
  </div>
</template>
<script setup>
const open = ref(false)
const emit = defineEmits(['modalClose'])
const close = () => {
  open.value = !open.value
}
const confirmRecipe = (form) => {
  console.log('recipe submitted! ', form)
}

</script>