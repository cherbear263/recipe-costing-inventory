<template>
  <div id="ingredient-search">
    <input type="text" placeholder="search ingredients..." v-model="query"
      class="px-2 py-2 border-2 w-[70%] border-gray-200 bg-gray-100 rounded-md" />
    <button class="button rounded-md ml-4 :disabled:bg-gray-200" @click="search" :disabled="isLoading">Search</button>
    <div id="dropdown-search" class="bg-gray-50 py-3 border-2 border-gray-100 w-[70%] rounded-b-md text-gray-800 text-sm">
      <ul>
        <li v-for="item in items" :key="item.id" @click="setItem(item)"
          class="hover:bg-blue-100 px-4 cursor-pointer hover:text-blue-500">{{ item.name }}</li>

      </ul>
    </div>
  </div>
  <div class="flex gap-2 w-full  relative mt-3 border-1 border-gray-100">
    <input class=" border-2 border-gray-200 px-3 py-2 rounded-md bg-gray-100 flex-grow" v-if="!selectedItem.name" disabled
      placeholder="select ingredient above">
    <input v-else class="bg-gray-100 border-2 border-gray-200 px-3 py-2 flex-grow" :placeholder="selectedItem.name" />
    <input type="number" class="px-2 py-2 border-2 border-gray-200 text-gray-800 max-w-[100px] rounded-md"
      placeholder="qty" v-model="selectedItem.qty" />
    <select id="uofm" class="px-2 py-2 border-2 border-gray-200 rounded-md" v-model="selectedItem.unit">
      <option selected>g</option>
      <option>kg</option>
      <option>tsp</option>
      <option>Tbsp</option>
      <option>mL</option>
      <option>L</option>
      <option>ea</option>
    </select>
    <button class="button rounded-md" @click="addIngredient">add</button>
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
const query = ref('')
const isLoading = ref(true)
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
  selectedItem.name = item.name;
  selectedItem.id = item.id;


}
const search = () => {
  isLoading.value = true
  selectedItem.name = items[2].name,
    selectedItem.id = items[2].id
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

const items = [
  {
    name: 'milk chocolate couverture',
    id: 3200,
    unit: 'kg',
    last_price: 14.50
  },
  {
    name: 'butter',
    id: 3532,
    unit: 'g',
    last_price: 0.01274
  },
  {
    name: 'plain flour',
    id: 323335,
    unit: 'kg',
    last_price: 1.50
  },
  {
    name: 'sugar',
    id: 33320,
    unit: 'kg',
    last_price: 1.00
  },

]


</script>