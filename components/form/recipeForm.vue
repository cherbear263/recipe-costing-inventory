<template>
  <div>
    <form>
      <fieldset class="mb-4">
        <label class="text-sm text-gray-400 mb-2 block ">Title</label>
        <input type="text" name="title" required placeholder="title"
          class="w-full h-10 border border-gray-400 rounded-sm px-4" v-model="form.title" />
      </fieldset>
      <fieldset class="mb-4">
        <div class="flex justify-center gap-3">
          <div id="category-button " class="mt-6">
            <button type="button" id="dropdownHoverButton" @click="dropCat = !dropCat"
              data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{{ form.category }}
              <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 4 4 4-4" />
              </svg></button>

            <!-- Dropdown menu -->
            <div id="dropdownHover" :class="!dropCat ? 'hidden' : ''"
              class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                <li v-for="cat in categories" @click="dropCat = !dropCat">
                  <a @click="form.category = `${cat}`"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ cat }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div id="serves">

            <label class="text-sm text-gray-400 mb-2">Yield</label>
            <input type="number" name="serves" class="w-full h-10 border border-gray-400 rounded-sm px-4"
              v-model="form.serves" />
          </div>
          <div id="unit">
            <label class="text-sm text-gray-400 mb-2 unit">Unit</label>
            <select class="px-2 py-2 border border-gray-400" v-model="form.unit">
              <option class="py-1">ea</option>
              <option class="py-1">g</option>
            </select>
          </div>
          <div id="temp">

            <label class="text-sm text-gray-400 mb-2">Cook Temp (&deg;C)</label>
            <input type="number" name="temp" required placeholder="temperature"
              class="w-full h-10 border border-gray-400 rounded-sm px-4" v-model="form.temp" />
          </div>
          <div id="time">

            <label class="text-sm text-gray-400 mb-2">Cook Time (min)</label>
            <input type="number" name="temp" required placeholder="cook time in minutes"
              class="w-full h-10 border border-gray-400 rounded-sm px-4" v-model="form.time" />
          </div>


        </div>

      </fieldset>

      <fieldset class="mb-4">
        <form-recipe-ingredients :serves="form.serves" :unit="form.unit" @ingredient-list="saveIngredients" />
      </fieldset>
      <fieldset class="mb-4">
        <label class="text-md font-semibold mb-2 block">Directions <span class="text-gray-400 font-normal"> use '#' for
            headings - each step on new
            line</span></label>
        <textarea rows="3" name="directions" required placeholder="- combine flours... "
          class="w-full border border-gray-400 rounded-sm px-4" v-model="directions" />
      </fieldset>
      <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button type="button" data-modal-hide="defaultModal" @click.prevent="preview"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          View Preview</button>
        <button data-modal-hide="cancelRecipe" type="button" @click="cancelRecipe"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
      </div>
    </form>
  </div>
</template>
<script setup>
const emit = defineEmits(['cancel', 'preview'])
const isLoading = ref(false);
const isError = ref(false);
const dropCat = ref(false);
const categories = [
  'viennoiseries',
  'entremet',
  'cake',
  'cookies',
  'syrup',
  'filling',
  'bread'
]

const directions = ref('');
const form = reactive({
  title: "",
  category: "category",
  ingredients: [],
  directions: {},
  serves: 0,
  unit: 'ea',
  temp: 0,
  time: 0
})
const saveIngredients = (items) => {
  form.ingredients = items
}
const cancelRecipe = () => {
  form.title = ""
  form.category = "category"
  form.ingredients = []
  form.directions = {}
  form.serves = 0
  form.temp = 0
  form.time = 0

  emit('cancel')

}

const preview = () => {
  isLoading.value = true;
  form.directions = directions.value.split(/\r?\n|\r|\n/g);
  emit('preview', form)
  // the following was from a tutorial for app write. Will need to be redesigned for supabase
  // create({
  //   title: form.title,
  //   ingredients: form.ingredients,
  //   direction: form.direction,
  // })
  //   .then((res) => {
  //     isLoading.value = false;
  //     isError.value = false;
  //     console.log('submitted')
  //   })
  //   .catch((_) => {
  //     isLoading.value = false;
  //     isError.value = true;
  //   })

}
</script>