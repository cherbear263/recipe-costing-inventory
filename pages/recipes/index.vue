<template>
  <h1 class="display font-bold text-gray-600 py-3 mb-4 text-center">Recipes</h1>
  <div v-if="recipes.length == 0">
    loading...
  </div>
  <div v-else>
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 relative">
        <thead class="text-xs text-gray-700 uppercase bg-ochre-300 dark:bg-gray-700 dark:text-gray-400 ">
          <tr class="">
            <th scope="col" class="px-6 py-3">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Category
              <Icon name="mdi-chevron-down"
                class="text-gray-600 text-xl p-1 z-100 h-full cursor-pointer hover:bg-ochre-200"
                @click="menuOpen = !menuOpen" />
              <div class="absolute top-0 right-50 bg-ochre-50 w-[120px] " :class="menuOpen ? '' : 'hidden'">
                <ul>
                  <span class="text-gray-400 font-thin p-3">Select category</span>
                  <li
                    class=" mt-3 py-2 border-y border-b-ochre-300 font-medium text-gray-800 cursor-pointer hover:bg-ochre-200 px-3"
                    @click="filter()">All
                    Categories</li>
                  <li
                    class="py-2 border-b border-b-ochre-300 font-medium text-gray-800 cursor-pointer hover:bg-ochre-200 px-3"
                    @click="filter('cake')">Cake</li>
                  <li
                    class="py-2 border-b border-b-ochre-300 font-medium text-gray-800 cursor-pointer hover:bg-ochre-200 px-3"
                    @click="filter('entremet')">
                    Entremet</li>
                  <li
                    class="py-2 border-b border-b-ochre-300 font-medium text-gray-800 cursor-pointer hover:bg-ochre-200 px-3"
                    @click="filter('viennoiseries')">
                    Viennoiseries</li>
                </ul>
              </div>


            </th>
            <th scope="col" class="px-6 py-3">
              Serves
            </th>
            <th scope="col" class="px-6 py-3">
              Unit </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recipe in recipes" :key="recipe.id"
            class="bg-ochre-100 border-b dark:bg-gray-800 dark:border-ochre-300 hover:bg-teal-200">
            <th scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer hover:text-white">
              <NuxtLink :to="`/recipes/${recipe.id}`"> {{ recipe.name }} </NuxtLink>
            </th>
            <td class="px-6 py-4">
              {{ recipe.type }}
            </td>
            <td class="px-6 py-4">
              {{ recipe.serves }}
            </td>
            <td class="px-6 py-4">
              {{ recipe.unit }}
            </td>
          </tr>

        </tbody>
      </table>
    </div>

  </div>

  <!-- Modal toggle -->
  <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" @click="open = !open"
    class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    type="button">
    Toggle modal
  </button>
  <div v-if="open"
    class="fixed top-0 left-0 right-0 z-50 bg-black/75 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <create-recipe class="z-100 " @modalClose="close" @confirmForm="confirmRecipe" />
  </div>
</template>
<script setup>
definePageMeta({
  layout: "dashboard",
});
const menuOpen = ref(false)
const supabase = useSupabaseClient()
const recipes = ref([])
async function getRecipes() {
  const { data } = await supabase.from('recipes').select()
  recipes.value = data
}
async function filter(cat) {
  if (cat) {
    const { data } = await supabase.from('recipes').select().eq('type', cat)
    recipes.value = data
  } else {
    recipes.value = getRecipes()
  }
  menuOpen.value = false

}
// get recipes
onMounted(() => {
  getRecipes()
})

const open = ref(false)
const emit = defineEmits(['modalClose'])
const close = () => {
  open.value = !open.value
}
const confirmRecipe = (form) => {
  console.log('recipe submitted! ', form)
}

</script>