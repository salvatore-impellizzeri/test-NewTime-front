<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: null,
      updatedUser: {
        name: '',
        surname: '',
        email: '',
      },
      confirmBox: false,
    };
  },

  mounted() {
    this.getUser();
  },

  methods: {
    getUser() {
      const userId = this.$route.params.id;
      axios
        .get(`http://127.0.0.1:8000/api/users/${userId}`)
        .then((res) => {
          this.user = res.data;
          this.updatedUser = {
            name: res.data.name,
            surname: res.data.surname,
            email: res.data.email,
          };
        })
        .catch((err) => {
          console.error("Errore nella richiesta API:", err);
        });
    },

    saveUser() {
      const userId = this.$route.params.id;
      axios
        .put(`http://127.0.0.1:8000/api/users/${userId}`, this.updatedUser)
        .then(() => {
          this.$router.push('/');
          this.confirmBox = true;
        })
        .catch((err) => {
          console.error("Errore durante il salvataggio:", err);
        });
    },
  },
};
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <div v-if="user" class="w-[500px]">
      <div class="text-center text-white drop-shadow-lg font-bold text-4xl mb-6">
        {{ user.name }} {{ user.surname }}
      </div>
      <div class="space-y-6">
        <!-- Nome -->
        <div>
          <label for="name" class="block text-white font-medium drop-shadow-md">
            Nome
          </label>
          <input
            type="text"
            id="name"
            v-model="updatedUser.name"
            class="w-full mt-2 p-3 shadow-md rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white/25 text-white"
          />
        </div>

        <!-- Cognome -->
        <div>
          <label for="surname" class="block text-white font-medium drop-shadow-md">
            Cognome
          </label>
          <input
            type="text"
            id="surname"
            v-model="updatedUser.surname"
            class="w-full mt-2 p-3 shadow-md rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none  bg-white/25 text-white"
          />
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-white font-medium drop-shadow-md">
            Email
          </label>
          <input
            type="email"
            id="email"
            v-model="updatedUser.email"
            class="w-full mt-2 p-3 shadow-md rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white/25 text-white"
          />
        </div>
      </div>
      <button
        @click="saveUser"
        class="mt-12 w-full text-white py-3 px-4 rounded-lg shadow-lg transition-all ease-in-out duration-200 border-white border hover:bg-white hover:text-cyan-500 hover:scale-105"
      >
        Salva
      </button>
    </div>

    <!-- Loading -->
    <div v-else>
      <div class="text-center text-white text-xl">Caricamento...</div>
    </div>

    <!-- Box Conferma Edit -->
    <transition name="confirm-fade">
      <div v-if="confirmBox" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-4 rounded-lg shadow-lg text-center text-lg z-50">
        L'utente è stato eliminato con successo!
      </div>   
    </transition>
  </div>
</template>

<style scoped>

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

</style>