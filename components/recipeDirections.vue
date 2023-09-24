<template>
  <div>
    <p v-for="(item, index) in newLines" :key="index" :class="item.style">{{ item.direction }}</p>
  </div>
</template>
<script setup>
const props = defineProps({
  directions: Array
})
const len = props.directions.length;
console.log(len)
const newLines = []
for (let i = 0; i < len; i++) {
  if (props.directions[i][0] == '#') {
    // heading - remove # and make bold
    newLines.push({ direction: props.directions[i].substring(1), style: 'font-semibold text-md mt-4 mb-1' })
  } else {
    newLines.push({ direction: props.directions[i], style: 'font-normal text-sm' })
  }
  // else if (directions[i][0] == '-') {
  //   // dot point list - replace - with dot
  //   directions[i][0] = '&#x2022; ';
  //   newLines.push({ direction: directions[i], style: 'text-sm' })
  // }
}



</script>
