<template>
  <div>
    <div class="text-center">
      <h2 class="font-semibold text-3xl text-slate-700 capitalize my-3 ">{{ form.title }}</h2>
      <a class="bg-blue-100 rounded-full text-center text-blue-600 font-semibold px-3 py-2">{{ form.category }}
      </a>
    </div>

    <div class="flex justify-between gap-3 mt-8 mb-10">
      <div class="w-1/2 ">
        <div class="flex gap-2">
          <p><span class="font-semibold">Serves: </span>{{ form.serves }}</p>
          <p v-if="form.temp != 0"><span class="font-semibold">Temp: </span>{{ form.temp }} &deg;C</p>
          <p v-else><span class="font-semibold">Temp:</span> n/a</p>
          <p v-if="form.time != 0"><span class="font-semibold">Time: </span>{{ form.time }} mins</p>
          <p v-else><span class="font-semibold">Time: </span>n/a</p>
        </div>
        <p>Cost per serve:</p>

        <div class="mt-3">
          <h2 class="font-semibold text-lg">Ingredients:</h2>
          <ul class="list-disc ml-8">
            <li v-for="ingredient in form.ingredients">{{ ingredient }}</li>
          </ul>
        </div>
        <div class="mt-3">
          <recipe-directions :directions="directions" />
          <h2 class="font-semibold text-lg">Directions:</h2>
          <ul class="list-disc ml-8">
            <li v-for="direction in form.directions">{{ direction }}</li>
          </ul>
        </div>
      </div>
      <div class="w-1/2">
        <img src="@/assets/images/croissants.jpg" />
      </div>
    </div>
    <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
      <button data-modal-hide="defaultModal" @click.prevent="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Confirm</button>
      <button data-modal-hide="editRecipe" type="button" @click="editRecipe"
        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Start
        over</button>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  form: Object
})
const ingredients = props.form.ingredients;
const directions = props.form.directions;
const emit = defineEmits(['submit', 'edit'])
const submit = (form) => {
  emit('submit', form)
}
const editRecipe = (form) => {
  emit('edit', form)
}
</script>