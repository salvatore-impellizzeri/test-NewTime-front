<script>
import axios from 'axios';
import Card from '../components/Card.vue';
import { store } from '../store';

export default {
  data() {
    return {
      store,
      users: [],
      titles:[
        '<i class="fa-solid fa-user"></i>',
        'Full Name',
        'Email',
        'Action'
      ],
      confirmBox: false,
    }
  },

  components: {
    Card,
  },

  mounted(){
    this.getUsers();
  },  

  methods: {
    getUsers() {
        axios
          .get('http://127.0.0.1:8000/api/users')
          .then((res) => {
              this.users = res.data;
          })
          .catch((err) => {
              console.error("Errore nella richiesta API:", err);
          });
    },

    handleConfirm(userId) {
        this.users = this.users.filter(user => user.id !== userId);
        this.confirmBox = true; 
        setTimeout(() => {
            this.confirmBox = false;
        }, 3000);
    },
}

}
</script>

<template>
  <div class="grid h-full grid-cols-1">
    <div class="text-center text-white drop-shadow-lg text-5xl font-semibold max-sm:text-4xl">
       Lista utenti
    </div>

    <!-- Creation Button -->
    <router-link class="absolute top-18 right-44 max-lg:bottom-20 max-lg:scale-125 max-sm:bottom-16 max-lg:right-1/2 translate-x-1/2" to="/user-create">
      <button class="bg-gradient-to-br from-blue-400/35 to-cyan-300/35 text-2xl rounded-full shadow-icon w-[45px] aspect-square text-white hover:scale-110 transition-all ease-in-out duration-200">
        <i class="fa-solid fa-plus"></i>
      </button>
    </router-link>

    <!-- Container -->
    <div 
      class="rounded-3xl relative h-[96%] grid 2xl:grid-cols-3 max-lg:grid-cols-1 max-sm:px-0 max-2xl:grid-cols-2 gap-x-5 gap-y-1 mt-10 max-sm:mt-2 max-lg:h-[76%] max-sm:h-[90%] px-10 max-sm:scale-90 overflow-y-auto custom-scrollbar"
    >

      <!-- Cards -->
      <Card
        v-for="(user, index) in this.users"  
        :key="index"
        :id="user.id"
        :name="user.name"
        :surname="user.surname"
        :email="user.email"
        @delete-event="handleConfirm"
      />

    </div>
    <!-- Box Conferma Delete -->
    <transition name="confirm-fade">
      <div v-if="confirmBox" class="fixed max-sm:top-1/2 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-4 rounded-lg shadow-lg text-center text-lg z-50">
        L'utente è stato eliminato con successo!
      </div>   
    </transition>

    <!-- Box Conferma Edit -->
    <transition name="confirm-fade">
      <div v-if="this.store.userUpdate" class="fixed max-sm:top-1/2 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-4 rounded-lg shadow-lg text-center text-lg z-50">
        L'utente è stato aggiornato con successo!
      </div>   
    </transition>

    <!-- Box Conferma Creation -->
    <transition name="confirm-fade">
      <div v-if="this.store.userCreated" class="fixed max-sm:top-1/2 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-4 rounded-lg shadow-lg text-center text-lg z-50">
        L'utente è stato creato con successo!
      </div>   
    </transition>
  </div>
</template>
<style scoped>

.shadow-icon{
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.144);
}

.shadow-icon:hover {
  box-shadow: 0px 0px 10px 2px rgba(255, 255, 255, 0.644);
}

.bg-icon{
  background-color: rgba(255, 255, 255, 0.185);
}

/* CONFIRM FADE */

  .confirm-fade-enter-active,
  .confirm-fade-leave-active {
    transition: opacity 0.2s ease-in-out;
  }

  .confirm-fade-enter-from,
  .confirm-fade-leave-to {
    opacity: 0;
  }

  .confirm-fade-enter-to
  .confirm-fade-leave-from {
    opacity: 1;
  }


/* Stile della barra di scorrimento */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.7);
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

@media (max-width: 700px) {
  .custom-scrollbar::-webkit-scrollbar {
    display: none;
  }
}
</style>
