<template>
  <div class="bg-white max-w-full min-h-[50vh]">

    <div v-if="recipe" class="">
      <h2 class="bg-teal-200 uppercase pl-2 text-ochre-50">{{ recipe.type }}</h2>
      <article class="p-3">
        <h1 class="text-xl display text-teal-500">{{ recipe.name }}</h1>
        <div class=" max-w-full md:flex md:gap-4">
          <div class="md:w-1/2 w-full">
            <img v-if="imageUrl" :src="imageUrl.publicUrl" class="max-w-full my-3 shadow-md rounded-sm" />
            <div>
              <input type="file" @change="handleFileChange" />
              <button @click="uploadFile">Upload</button>
            </div>
          </div>
          <div class="md:w-1/2 w-full">
            <h2 class="bg-teal-200 uppercase pl-2 text-ochre-50 my-3">Ingredients</h2>

            <ul>
              <li v-for="ingredient in ingredients" :key="ingredient.id"
                class=" list-disc list-inside text-gray-600 space-y-1">
                {{ ingredient.qty }}
                {{ ingredient.unit }}
                {{ ingredient.item }} </li>
            </ul>
          </div>
        </div>
        <div class="max-w-full">
          <h1 class="bg-teal-200 uppercase pl-2 text-ochre-50">Directions</h1>
          <ul>
            <li v-for="(direction, index) in directions" :key="index"
              class="first-letter:capitalize list-inside text-gray-600 space-y-1 mt-3" :class='`${direction.style}`'>
              {{ direction.direction }}</li>
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
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const route = useRoute()
let recipe = ref({})
const id = route.params.id
let ingredients = ref([])
let directions = ref([])
const imageName = ref('')
const imageUrl = ref('')
const loading = ref(false)

const createDirectionsArray = (string) => {
  let lastIndex = string.length - 2
  let substring = string.substring(1, lastIndex);
  let subarray = substring.split('","')
  subarray[0] = subarray[0].substring(1)
  let directionsObject = []
  // look for hash symbols - this means the 
  for (let i = 0; i < subarray.length; i++) {
    if (subarray[i][0] == '#') {
      directionsObject.push({
        direction: subarray[i].substring(1),
        style: 'text-md font-semibold text-gray-700 uppercase'
      })
    } else {
      directionsObject.push({
        direction: subarray[i],
        style: 'ml-3'
      })
    }
  }
  return directionsObject
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
  getImage()

})
// get image
const getImage = async () => {
  const { data, error } = await supabase
    .storage
    .from('media')
    .getPublicUrl(`${id}/1`)
  if (data) {
    imageUrl.value = data
    console.log(imageUrl.value.publicUrl)
  }
  if (error) {
    console.log('error!', error.message)
  }
}



// change photo
const selectedFile = ref(null);
const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

const uploadFile = async () => {
  loading.value = true
  if (!selectedFile.value) {
    alert('Please select an image file to upload.');
    loading.value = false;
    return;
  }
  // check the number of items(image) in storage
  const { data, error } = await supabase
    .storage
    .from('media')
    .list(`${id}/1`, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    })
  if (data.length == 0) {
    // there is no image there!
    const { data, error } = await supabase.storage
      .from('media')
      .upload(`${id}/1`, selectedFile.value);
    if (error) {
      console.log(error.message)
    }
  } else {
    // there is already an image. Update. 
    const { data, error } = await supabase
      .storage
      .from('media')
      .update(`${id}/1`, selectedFile.value, { upsert: true })
  }
  loading.value = false;
  alert('uploaded image')
  location.reload()
}


</script>