<script>

export default {
  data() {
    return {

    }
  },

  methods:{
    
  }

}
</script>

<template>
  <div class="text-white flex justify-center items-center h-full w-full flex-wrap flex-col scale-125">
    <div class="text-5xl font-bold">
       ERROR 404
    </div>
    <p class="mt-7 text-xl">
      La pagina che stai cercando non esiste.
    </p>
    <router-link to="/">
            <button
                class="mt-7 w-full text-white py-3 px-4 rounded-lg shadow-lg transition-all ease-in-out duration-200 bg-black hover:scale-105 hover:bg-white hover:text-black"
            >
                Torna alla Home
            </button>
        </router-link>
  </div>
</template>

<style scoped>

</style>