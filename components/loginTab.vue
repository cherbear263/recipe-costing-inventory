<template>
  <form @submit.prevent="login" class="flex flex-col px-16 py-8 rounded-md shadow-lg max-w-screen-sm w-full bg-white">
    <div class=" justify-center gap-2 mb-4 text-custom-darkblue">
      <img class="w-[100px] mx-auto" src="#" />
      <div class="flex-row ">
        <h1 class="block text-slate-700 font-bold mb-3 mt-10">Login</h1>
        <input type="email" name="email" placeholder="email address" v-model="email"
          class="w-full py-2 rounded-md px-4 border-2 border-slate-200 focus:bg-slate-100 outline-blue-200" />
        <input type="submit"
          class="bg-blue-500 px-4 py-2 mt-4 text-white font-semibold hover:bg-blue-400 cursor-pointer rounded-md w-full disabled:cursor-not-allowed disabled:slate-300"
          :disabled="isLoading" />
        <span v-if="errorMsg" class="errors text-red-500 mt-2">{{ errorMsg }}</span>
        <span v-if="successMsg" class="errors text-green-500 mt-2">{{ successMsg }}</span>
      </div>
    </div>
  </form>
</template>
<script setup>
const client = useSupabaseClient();
const email = ref("");
const isLoading = ref(false)
const errorMsg = ref(null);
const successMsg = ref(null);

async function login() {
  try {
    const { error } = await client.auth.signInWithOtp({
      email: email.value,
      options: {
        emailRedirectTo: 'http://localhost:3000/confirm'
      }
    })
    if (error) throw error;
    successMsg.value = 'Check your email to confirm your account.'
  }

  catch (error) {
    errorMsg.value = error.message;
  }
}
</script>