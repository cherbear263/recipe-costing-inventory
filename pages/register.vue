<template>
  <div class="h-screen flex">
    <div class="flex-1 flex items-center justify-center bg-[#f1f1f1]">
      <form @submit.prevent="signUp" class="flex flex-col px-16 py-8 rounded-md shadow-lg max-w-screen-sm w-full">
        <div class="flex flex-items-center justify-center gap-2 mb-4 text-custom-darkblue">
          <img class="w-[100px]" src="#" />
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
const client = useSupabaseClient();
const email = ref("");
const password = ref(null);
const errorMsg = ref(null);
const successMsg = ref(null);

async function signUp() {
  try {
    const { data, error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        redirectTo: 'http://127.0.0.1:3000/'
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