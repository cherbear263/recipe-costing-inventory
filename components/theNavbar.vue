<template>
  <nav class="bg-ochre-100 border-gray-200 dark:bg-gray-900 relative">
    <div class="max-w-screen-xl  mx-auto p-4">
      <NuxtLink to='/' class="text-center">
        <img class="max-w-[50px] mx-auto pb-7" src="~/assets/SVG/bunny.svg" />
        <p class="self-center text-2xl display  text-slate-600 whitespace-nowrap dark:text-white">La Folie
        </p>
        <p class="uppercase mt-3 tracking-wide font-thin text-base  text-slate-600">P&acirc;tisserie</p>
        <p class="text-sm tracking-wide  uppercase font-thin text-slate-600">Bundaberg</p>
      </NuxtLink>
      <button data-collapse-toggle="navbar-default" type="button" @click="menuOpen = !menuOpen"
        class="z-100 absolute top-5 right-3 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div :class="!menuOpen ? 'hidden' : ''" class="w-full md:block md:w-auto " id="navbar-default">

        <ul
          class=" z-10 font-light text-sm uppercase flex flex-col p-4 md:p-0 mt-4 border rounded-lg bg-teal-50 md:flex-row  md:space-x-8
            md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 top-0 right-3 absolute md:w-[230px] w-[70%] ">
          <span
            class="absolute top-0 right-0 text-xl text-gray-400 font-bold hover:gray-500 cursor-pointer p-3 z-100 hover:bg-gray-100"
            @click="menuOpen = !menuOpen" :class="!menuOpen ? 'hidden' : ''">x</span>
          <li>
            <NuxtLink to="/"
              class="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent hover:bg-ochre-100 md:text-teal-700 md:p-0 dark:text-white md:dark:text-teal-500"
              aria-current="page">
              <Icon name="mdi-home" class="text-teal-600 text-xl hover:teal-400" /><span
                class="text-teal-700 ml-5 md:hidden">home</span>
            </NuxtLink>
          </li>

          <li>
            <a href="#"
              class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-ochre-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              <Icon name="mdi-instagram" class="text-teal-600 text-xl " /><span class="text-teal-700 ml-5 md:hidden">our
                instagram</span>
            </a>
          </li>
          <li>
            <a href="#"
              class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-ochre-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              <Icon name="mdi-cart" class="text-teal-600 text-xl " /><span class="text-teal-700 ml-5 md:hidden">your
                cart</span>
            </a>
          </li>
          <li>
            <a href="#"
              class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-ochre-100 md:hover:bg-transparent md:border-0 md:hover:text-teal-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              <Icon name="mdi-account-outline" class="text-teal-600 text-xl" /><span
                class="text-teal-700 ml-5 md:hidden">your account</span>
            </a>
          </li>
        </ul>
      </div>

    </div>
  </nav>
</template>
<script setup>
const menuOpen = ref(false)
</script>
<style>
.slidein-enter-active,
.slidein-leave-active {
  transition: all 0.3s ease-in-out;
}

.slidein-enter-from,
.slidein-leave-from {
  transform: translateX(30px);
  opacity: 0;
}
</style>