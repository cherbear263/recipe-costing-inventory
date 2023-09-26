<template>
  <div class="bg-white max-w-full min-h-[50vh]">

    <div v-if="recipe" class="">
      <h2 class="bg-teal-200 uppercase pl-2 text-ochre-50">{{ recipe.type }}</h2>
      <article class="p-3">
        <h1 class="text-xl display text-teal-500">{{ recipe.name }}</h1>
        <div class=" max-w-full md:flex md:gap-4">
          <div class="md:w-1/2 w-full">
            <img src="~/assets/images/croissants.jpg" class="max-w-full my-3 shadow-md rounded-sm" />
          </div>
          <div class="md:w-1/2 w-full">
            <h2 class="bg-teal-200 uppercase pl-2 text-ochre-50 my-3">Ingredients</h2>

            <ul>
              <li v-for="ingredient in ingredients" :key="ingredient.id">{{ ingredient.qty }} {{ ingredient.unit }}
                {{ ingredient.item }} </li>
            </ul>
          </div>
        </div>
        <div class="max-w-full">
          <h1 class="bg-teal-200 uppercase pl-2 text-ochre-50">Directions</h1>
          <ul>
            <li v-for="(direction, index) in directions" :key="index">{{ direction }}</li>
          </ul>
        </div>
      </article>
    </div>
    <div v-else>
      <p>no recipe could be found</p>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "dashboard",
});
const supabase = useSupabaseClient()
const route = useRoute()
let recipe = ref({})
const id = route.params.id
let ingredients = ref([])
let directions = ref([])

const createDirectionsArray = (string) => {
  let lastIndex = string.length - 2
  let substring = string.substring(1, lastIndex);
  let subarray = substring.split('","')
  subarray[0] = subarray[0].substring(1)
  return subarray
}
async function getRecipe() {
  const { data } = await supabase.from('recipes').select().match({ id: route.params.id })
  if (data.length > 0) {
    recipe.value = data[0];
    console.log(recipe)
    directions.value = recipe.value.directions || [];
    console.log(createDirectionsArray(directions.value))
    directions.value = createDirectionsArray(directions.value)

  }

}
async function getIngredients() {
  const { data } = await supabase.from('recipe_ingredients_name').select().filter('id', 'eq', id)
  ingredients.value = data

}

// get recipes
onMounted(() => {
  getRecipe()
  getIngredients()



})


</script>