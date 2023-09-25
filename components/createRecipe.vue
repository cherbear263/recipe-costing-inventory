<template>
  <!-- Main modal -->
  <div class="relative w-full mx-auto my-10 max-w-2xl max-h-full">
    <!-- Modal content -->
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
      <!-- Modal header -->
      <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          Create Recipe
        </h3>
        <button type="button" @click="close"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="defaultModal">
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
      </div>
      <!-- Modal body -->
      <div class="p-6 space-y-6">
        <form-recipe-form v-if="!preview" @cancel="close" @preview="previewForm" />
        <preview-recipe v-else :form="checkForm" @submit="submit" @edit="editRecipe" />
      </div>
      <!-- Modal footer -->

    </div>
  </div>
</template>
<script setup>
const supabase = useSupabaseClient()
const emit = defineEmits(['modalClose', 'confirmForm'])
const preview = ref(false)
const loading = ref(false)
let checkForm = {}
const confirm = ref(false)
const close = () => {
  emit('modalClose')
}
const previewForm = (form) => {
  checkForm = form
  preview.value = true


}
const recipeID = ref(null)
const getId = async () => {
  let { data } = await supabase.from('recipes')
    .insert([
      { name: checkForm.title, serves: checkForm.serves, unit: checkForm.unit, time: checkForm.time, temp: checkForm.temp, directions: checkForm.directions, type: checkForm.category },
    ]).select().single()
  if (data) {
    recipeID.value = data.id
  }
}
const submit = async () => {
  await getId()

  // add ingredients to recipe_ingredients table
  let ingredients = checkForm.ingredients

  try {
    loading.value = true
    for (let i = 0; i < ingredients.length; i++) {
      let { error } = await supabase.from('recipe_ingredients')
        .insert([
          { recipe: recipeID.value, ingredient: ingredients[i].id, qty: ingredients[i].qty, unit: ingredients[i].unit },
        ])
      if (error) throw error
    }
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
    preview.value = false
    close()
    navigateTo('/recipes')
  }

}
const editRecipe = () => {
  preview.value = false
  navigateTo('/recipes')
}
</script>