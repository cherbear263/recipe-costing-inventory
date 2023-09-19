<template>
  <div>
    <div class="h-screen flex">
      <div class="flex-1 flex items-center justify-center bg-[#f1f1f1] relative">
        <login-tab v-if="loginPage" />
        <register-tab v-else />
      </div>




    </div>
    <div id="login">

    </div>
  </div>
</template>
<script setup>
const loginPage = true

</script>