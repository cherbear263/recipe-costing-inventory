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
    <input v-else class="bg-gray-100 border-2 border-gray-200 px-3 py-2 text-sm" :placeholder="selectedItem.name" />
    <input type="number" class="px-2 py-2 border-2 border-gray-100 bg-green-100 text-gray-800 text-sm rounded-md w-20"
      placeholder="qty" v-model="selectedItem.qty" />
    <select id="uofm" class="px-2 py-2 border-2 border-gray-100 bg-green-100 rounded-md w-20 text-sm"
      v-model="selectedItem.unit">
      <option selected>g</option>
      <option>tsp</option>
      <option>Tbsp</option>
      <option>mL</option>
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
      <p>${{ totalCost }} per batch and ${{ perServe }} per {{ unit }}</p>
    </div>
  </div>
</template>
<script setup>
// load the ingredients on mounted??
// ** note that i think calculating the cost here is a mistake - you will want to dynamically calculate cost of goods
const supabase = useSupabaseClient()
const props = defineProps({
  serves: Number,
  unit: String
})
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
  newItem.uom = selectedItem.uom;
  newItem.cost = selectedItem.last_price;
  ingredients.push(newItem)
  // clear selected Item
  selectedItem.name = "";
  selectedItem.id = 0;
  selectedItem.unit = 'g';
  selectedItem.qty = 0;
  selectedItem.last_price = 0;
  selectedItem.uom = ''
  totalCost.value = calculateCost()
  console.log('totalcost ', totalCost.value)
}
const totalCost = ref(0)
const perServe = ref(0)
const calculateCost = () => {
  let cost = 0
  for (let i = 0; i < ingredients.length; i++) {
    if (ingredients[0].unit == ingredients[0].uom) {
      //useable unit is the same as purchased unit
      cost = cost + (ingredients[0].qty * ingredients[0].cost)
    } else if
      ((ingredients[0].unit == 'g') && (ingredients[0].uom == 'kg')) {
      cost = cost + (ingredients[0].qty * ingredients[0].cost / 1000)
    } else if ((ingredients[0].unit == 'g') && (ingredients[0].uom == 'mL')) {
      // assume grams == mL
      cost = cost + (ingredients[0].qty * ingredients[0].cost)
    } else if ((ingredients[0].unit == 'tsp') && (ingredients[0].uom == 'g')) {
      // assume 5g per tsp
      cost = cost + (ingredients[0].qty * ingredients[0].cost * 5)
    } else if ((ingredients[0].unit == 'Tbsp') && (ingredients[0].uom == 'g')) {
      // assume 15g per Tbsp
      cost = cost + (ingredients[0].qty * ingredients[0].cost * 15)
    } else if ((ingredients[0].unit == 'mL') && (ingredients[0].uom == 'L')) {
      cost = cost + (ingredients[0].qty * ingredients[0].cost / 1000)
    }

  }
  perServe.value = (cost / props.serves).toFixed(2)
  return cost.toFixed(2)
}


</script>