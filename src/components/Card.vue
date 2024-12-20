<script>

import axios from 'axios';

export default {
  data() {
    return {
      users: null,
      isModal: false,
      selectedUser: null,
    }
  },

  components: {

  },

  props:{
    id: {
      type: Number,
      required: true
    },
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

  methods:{
    handleModal(user) {
      this.isModal = true;
      this.selectedUser = user; 
    },

    async deleteUser(id) {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/users/${id}`);
            this.isModal = false; 
            this.$emit('delete-event', id);
        } catch (error) {
            console.error('Errore API:', error.message);
        }
    }
  }

}
</script>

<template>
  <div class="rounded-3xl relative shadow-lg py-7 px-5 bg-white/10 mb-4">
    <div 
      class="text-white font-semibold text-center transition-all ease-in-out duration-200"
      :class="[
        isModal ? 'blur-sm' : ''
      ]"
    >
      <div>
        {{ name }} {{ surname }}
      </div>
      <div class="text-sm mt-4">
        {{ email }}
      </div>
      <div class="flex justify-center space-x-4 mt-5">
        <!-- Icona Modifica -->
        <router-link :to="{ name: 'edit-user', params: { id: id } }">
          <button 
            class="rounded-full shadow-md w-[40px] text-black aspect-square flex show-button items-center justify-center transition duration-300">
            <i class="fa-solid fa-user-pen z-20"></i>
          </button>        
        </router-link>
        <!-- Icona Elimina -->
        <button
          @click="handleModal(user)" 
          class="rounded-full shadow-md w-[40px] delete-button aspect-square flex items-center justify-center 
          hover:bg-gradient-to-br hover:from-gray-600 hover:to-black transition duration-300">
          <i class="fa-solid fa-trash z-20"></i>
        </button>
      </div>
    </div>

    <!-- Modale -->
    <transition name="modal-fade">
      <div 
        v-if="isModal" 
        class="absolute top-0 left-0 right-0 bg-black/70 h-full w-full rounded-3xl z-50 modal flex items-center justify-center flex-col"
      >
        <div class="text-white font-semibold text-cente">
          Sei sicuro di voler eliminare questo utente?
        </div>
        <div class="flex justify-center space-x-4 mt-5">
          <button @click="deleteUser(id)" class="rounded-full bg-green-500 hover:bg-green-700 text-white w-[40px] aspect-square flex items-center justify-center hover:scale-105 transition-all ease-in-out duration-200">
            <i class="fa-solid fa-check"></i>
          </button>
          <button @click="isModal = false" class="rounded-full bg-red-700 hover:bg-red-900 text-white w-[40px] aspect-square flex items-center justify-center hover:scale-105 transition-all ease-in-out duration-200">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </transition>  
  </div>
</template>
<style scoped>



  /* MODAL FADE */

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity 0.2s ease-in-out;
  }

  .modal-fade-enter-from,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-to
  .modal-fade-leave-from {
    opacity: 1;
  }

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