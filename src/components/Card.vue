<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
    }
  },

  components: {

  },

  props:{
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
}
</script>

<template>
  <div class="rounded-3xl shadow-lg py-7 px-5 bg-white/10 mb-4">
    <div class="text-white font-semibold text-center">
      <div>
        {{ name }} {{ surname }}
      </div>
      <div class="text-sm mt-4">
        {{ email }}
      </div>
      <div class="flex justify-center space-x-4 mt-5">
        <!-- Icona Modifica -->
        <button 
          class="rounded-full shadow-md w-[40px] text-black aspect-square flex show-button items-center justify-center transition duration-300">
          <i class="fa-solid fa-user-pen z-50"></i>
        </button>
        <!-- Icona Elimina -->
        <button 
          class="rounded-full shadow-md w-[40px] delete-button aspect-square flex items-center justify-center 
          hover:bg-gradient-to-br hover:from-gray-600 hover:to-black transition duration-300">
          <i class="fa-solid fa-trash z-50"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>

  /* SHOW BUTTON */

  .show-button,
  .show-button{
    background-color: transparent;
    border-radius: 20px;
    border: none;
    position: relative;
    transition: all 0.2s ease-in-out;
  }

  .show-button:hover{
    box-shadow: 0 0 5px white;
  }

  .show-button > span{
    position: relative;
    z-index: 2;
  }

  /* PSEUDO ELEMENTI */

  .show-button::after,
  .show-button::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 30px;
    transition: opacity 0.2s ease-in-out;
  }

  .show-button::after{
    background: linear-gradient(to bottom right, rgb(202, 202, 202), white);
    opacity: 1;
  }

  .show-button::before{
    background: linear-gradient(to bottom right, white, rgb(202, 202, 202));
    opacity: 1;
  }

  /* PSEUDO ELEMENTI HOVER */
  
  .show-button:hover::after{
    opacity: 0;
  }

  /* DELETE BUTTON */

  .delete-button,
  .delete-button{
    background-color: transparent;
    border-radius: 20px;
    border: none;
    position: relative;
    transition: all 0.2s ease-in-out;
  }

  .delete-button > span{
    position: relative;
    z-index: 2;
  }

  /* PSEUDO ELEMENTI */

  .delete-button::after,
  .delete-button::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 30px;
    transition: opacity 0.2s ease-in-out;
  }

  .delete-button::after{
    background: linear-gradient(to bottom right, black, rgb(75, 75, 75));
    opacity: 1;
  }

  .delete-button::before{
    background: linear-gradient(to bottom right, rgb(75, 75, 75), black);
    opacity: 1;
  }

  /* PSEUDO ELEMENTI HOVER */
  
  .delete-button:hover::after{
    opacity: 0;
  }

</style>