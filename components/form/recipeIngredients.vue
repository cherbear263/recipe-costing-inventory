<template>
  <div id="ingredient-search" class="relative mr-2">
    <h3 class="text-md font-semibold mt-3 mb-2">Search for ingredient</h3>
    <input type="text" placeholder="search ingredients..." v-model="query"
      class="px-2 py-2 border-2 w-full border-gray-200 bg-gray-100 rounded-md" />
    <button
      class="button rounded-md rounded-l-none border-2 absolute right-0 top-8 border-blue-600 ml-4 :disabled:bg-gray-200"
      @click="search">Search</button>

    <div id="dropdown-search" :class="ddopen ? '' : 'hidden'"
      class="bg-gray-50 py-3 border-2 border-gray-100 w-[70%] rounded-b-md text-gray-800 text-sm">
      <ul>
        <li v-for="item in items" :key="item.id" @click="setItem(item)"
          class="hover:bg-blue-100 px-4 cursor-pointer hover:text-blue-500">{{ item.item }}</li>

      </ul>
    </div>
  </div>
  <h3 class="text-md font-semibold mt-3 mb-2">Add Ingredient to Recipe</h3>
  <div class="flex gap-1 w-[80%] sm:w-full relative mt-3 border-1 border-gray-100">

    <input class="  px-3 py-2 rounded-md bg-green-100 flex-grow text-sm" v-if="!selectedItem.name" disabled
      placeholder="select ingredient above">
    <input v-else class="bg-gray-100 border-2 border-gray-200 px-3 py-2 text-sm flex-grow"
      :placeholder="selectedItem.name" />
    <input type="number" class="px-2 py-2 border-2 border-gray-100 bg-green-100 text-gray-800 text-sm rounded-md w-20"
      placeholder="qty" v-model="selectedItem.qty" />
    <select id="uofm" class="px-2 py-2 border-2 border-gray-100 bg-green-100 rounded-md w-20 text-sm"
      v-model="selectedItem.unit">
      <option selected>g</option>
      <option>kg</option>
      <option>tsp</option>
      <option>Tbsp</option>
      <option>mL</option>
      <option>L</option>
      <option>ea</option>
    </select>
    <button class="button rounded-md bg-emerald-600 hover:bg-emerald-500" @click="addIngredient">add</button>
  </div>

  <div v-if="errorMsg" class="text-red-500">{{ errorMsg }}</div>
  <div class="flex justify-between gap-3">
    <div v-if="ingredients" class="w-1/2">
      <h2 class="text-lg font-semibold mt-3 mb-2">Ingredients</h2>
      <ul class="list-disc ml-5 pb-2 w-full">
        <li class="w-full relative" v-for="(ingredient, index) in ingredients" :key="index">
          <p class="w-full">{{ ingredient.qty }}{{ ingredient.unit }} {{ ingredient.name }}</p>
          <Icon name="mdi:delete" class="text-red-200 hover:text-red-500 cursor-pointer absolute right-0 top-1"
            @click="removeIngredient(index)" />
        </li>
      </ul>
    </div>
    <div>
      <h2 class="text-lg font-semibold mt-3 mb-2">Recipe Cost</h2>
      <p>$4.57 per batch and $2.50 per serve</p>
    </div>
  </div>
</template>
<script setup>
// load the ingredients on mounted??
const supabase = useSupabaseClient()

const ddopen = ref(false)

const query = ref('')
const isLoading = ref(true)
let items = ref(null)
const ingredients = reactive([

])
const errorMsg = ref('')
const selectedItem = reactive({
  name: '',
  id: 0,
  unit: 'g',
  qty: 0,
  last_price: 0
})
const setItem = (item) => {
  console.log(item);
  selectedItem.name = item.item;
  selectedItem.id = item.id;
  selectedItem.uom = item.unit
  selectedItem.last_price = item.cost
  ddopen.value = false;


}
const searchItems = async () => {
  console.log(query.value)
  if (!query) {
    return 'pleae input a search query'
  }
  else {
    let term = ('%' + query + '%').toString
    let res = await supabase.from('inventory_category').select('*').order('item', { ascending: true }).filter('item', 'like', term)
    items.value = res.data
  }
}
const search = async () => {
  let term = `%${query.value}%`
  console.log('searching')
  isLoading.value = true
  ddopen.value = true
  let res = await supabase.from('inventory_category').select('*').order('item', { ascending: true }).filter('item', 'like', term)
  items.value = res.data
  query.value = ''
  isLoading.value = false
}
const removeIngredient = (index) => {
  ingredients.splice(index, 1)
}
const addIngredient = () => {
  let newItem = {}
  newItem.name = selectedItem.name;
  newItem.id = selectedItem.id;
  newItem.unit = selectedItem.unit;
  newItem.qty = selectedItem.qty;
  ingredients.push(newItem)
  // clear selected Item
  selectedItem.name = "";
  selectedItem.id = 0;
  selectedItem.unit = 'g';
  selectedItem.qty = 0;

}



</script>