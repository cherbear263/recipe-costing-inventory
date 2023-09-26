<template>
  Recipes page
  <div id="recipe-builder">
    <div class="md:flex w-full">
      <div class="md-w-1/2 w-full max-w-full bg-green-500">
        this is the left side
      </div>
      <div class="w-full md-w-1/2 max-w-full bg-red-500">
        This is the right side
      </div>
    </div>
  </div>
  <div class="relative">
    <h2 class="text-2xl font-semibold mx-auto text-center">Inventory</h2>
    <div class="w-1/2 mx-auto">
      <SearchDropdown @changeCategory="getCategory" @searchItem="setSearch" />
    </div>
    <div v-if="items && items.data">
      {{ items.data }}</div>
    <table class="table-auto max-w-full text-sm text-left text-gray-500 dark:text-gray-400 mx-auto">
      <thead class="bg-slate-100 border-1 border-gray-100">
        <tr>
          <th scope="col" class="px-6 py-3 ">Item</th>
          <th scope="col" class="px-6 py-3">Category</th>
          <th scope="col" class="px-6 py-3">Cost</th>
          <th scope="col" class="px-6 py-3">Min</th>
          <th scope="col" class="px-6 py-3">Last Count</th>
          <th scope="col" class="px-6 py-3">Committed</th>
          <th scope="col" class="px-6 py-3">On Hand</th>
          <th scope="col" class="px-6 py-3">Order qty</th>
          <th scope="col" class="px-6 py-3">edit</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in inventory" :key="item.id" class="px-8 py-4 ">
          <td scope="col" class="px-6 py-2 border-b border-2 border-gray-100">{{ item.item }}</td>
          <td scope="col" class="px-6 py-2 border-b border-2 border-gray-100">{{ item.category }}</td>
          <td scope="col" class="px-6 py-2 border-b border-2 border-gray-100">{{ item.cost }} per {{ item.unit }}</td>
          <td scope="col" class="px-6 py-2 border-b border-2 border-gray-100">{{ item.min }}</td>
          <td scope="col" class="px-6 py-2 border-b border-2 border-gray-100">{{ item.last_count }}</td>
          <td scope="col" class="px-6 py-2 border-b border-2 border-gray-100">{{ item.committed }}</td>
          <td scope="col" class="px-6 py-2 border-b border-2 border-gray-100"
            :class="onHand(item.last_count, item.committed) < item.min ? 'bg-red-200' : ''">
            {{ onHand(item.last_count, item.committed) }}</td>
          <td scope="col" class="px-6 py-2 border-b border-2 border-gray-100"><input v-model="qty[index]" type="number"
              min="0" class="text-blue-600 rounded-md w-10 mx-auto text-center bg-gray-100"><span
              class="ml-1">{{ item.unit }}</span>
          </td>
          <td class=" px-6 py-2">
            <Icon name="line-md:edit-twotone" class="text-blue-600 " />
          </td>
        </tr>
      </tbody>
    </table>
    <button @click.prevent="updateOrder" value="update" class="bg-blue-600 rounded-md text-white px-2">Update
      Order</button>

  </div>
</template>
<script setup>
definePageMeta({
  layout: "dashboard",
});
import debounce from 'lodash.debounce'
const supabase = useSupabaseClient()
const orderItems = []
const ordering = ref(false)
const qty = []
let category = 0

let searchItem = ref('')
const onHand = (last_count, committed) => {
  return last_count - committed
}
const setSearch = (item) => {
  console.log(item)
  searchItem.value = item
}
const updateQty = (item, index) => {
  console.log(item, index)
}
const getCategory = async (cat) => {
  console.log('emit received ', cat)
  category = cat
  return
}
const getInventory = async (filter, searchItem) => {
  if (!filter && !searchItem) {
    return await supabase.from('inventory').select('*').order('item', { ascending: true })
  }
  else if (filter) {
    return await supabase.from('inventory').select('*').order('item', { ascending: true }).eq('category', '5')
  }
}
let { data: inventory, error } = await getInventory(null, null)
// @todo: filter by category, item name

let isSearching = ref(false)
let items = ref(null)
const search = async () => {
  let catNum = category
  isSearching.value = true
  items.value = await supabase.from('inventory').select('*').order('item', { ascending: true }).filter('id', 'eq', catNum)
  isSearching.value = false
}

watch(() => searchItem.value, async () => {
  if (!searchItem.value) {
    setTimeout(() => {
      items.value = ''
      isSearching.value = false
      return
    }, 500)
  }
  search()
})
</script>