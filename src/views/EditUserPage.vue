<script>
import axios from 'axios';
import { store } from '../store';

export default {
  data() {
    return {
      store,
      user: null,
      updatedUser: {
        name: '',
        surname: '',
        email: '',
      },
      errors: {
        name: '',
        surname: '',
        email: '',
      },
      isCheckingEmail: false,
    };
  },

  mounted() {
    this.getUser();
  },

  methods: {
    async validateEmailExists() {
      // Controlla se l'email è stata modificata rispetto all'originale
      if (this.updatedUser.email === this.user.email) {
        return true; // Nessuna verifica necessaria
      }

      this.isCheckingEmail = true;

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/check-email', {
          email: this.updatedUser.email,
        });

        this.isCheckingEmail = false;

        if (response.data.exists) {
          this.errors.email = "L'email è già registrata.";
          return false;
        }

        return true;
      } catch (error) {
        console.error('Errore durante la verifica dell\'email:', error);
        this.isCheckingEmail = false;
        return false;
      }
    },

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
          console.error('Errore nella richiesta API:', err);
        });
    },

    async validateFields() {
      let isValid = true;

      // Reset dei messaggi di errore
      this.errors = {
        name: '',
        surname: '',
        email: '',
      };

      // Validazione Nome
      if (!this.updatedUser.name) {
        this.errors.name = 'Il nome è obbligatorio.';
        isValid = false;
      } else if (!/^[a-zA-Z\s]+$/.test(this.updatedUser.name)) {
        this.errors.name = 'Il nome può contenere solo lettere.';
        isValid = false;
      }

      // Validazione Cognome
      if (!this.updatedUser.surname) {
        this.errors.surname = 'Il cognome è obbligatorio.';
        isValid = false;
      } else if (!/^[a-zA-Z\s]+$/.test(this.updatedUser.surname)) {
        this.errors.surname = 'Il cognome può contenere solo lettere.';
        isValid = false;
      }

      // Validazione Email
      if (!this.updatedUser.email) {
        this.errors.email = "L'email è obbligatoria.";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(this.updatedUser.email)) {
        this.errors.email = 'Inserisci un indirizzo email valido.';
        isValid = false;
      } else if (isValid) {
        const emailIsValid = await this.validateEmailExists();
        if (!emailIsValid) {
          isValid = false;
        }
      }

      return isValid;
    },

    async saveUser() {
      const isValid = await this.validateFields();
      if (!isValid) {
        return;
      }

      const userId = this.$route.params.id;

      axios
        .put(`http://127.0.0.1:8000/api/users/${userId}`, this.updatedUser)
        .then(() => {
          store.handleUserUpdate();
          this.$router.push('/');
        })
        .catch((err) => {
          console.error('Errore durante il salvataggio:', err);
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
            class="w-full mt-2 p-3 shadow-md rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white/10 text-white"
          />
          <p v-if="errors.name" class="text-red-500 font-medium text-sm mt-1">{{ errors.name }}</p>
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
            class="w-full mt-2 p-3 shadow-md rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white/10 text-white"
          />
          <p v-if="errors.surname" class="text-red-500 font-medium text-sm mt-1">{{ errors.surname }}</p>
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
            class="w-full mt-2 p-3 shadow-md rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white/10 text-white"
          />
          <p v-if="errors.email" class="text-red-500 font-medium text-sm mt-1">{{ errors.email }}</p>
          <p v-if="isCheckingEmail" class="text-white text-sm mt-1">Verifica email in corso...</p>
        </div>
      </div>
      <button
        @click="saveUser"
        class="mt-12 w-full text-white py-3 px-4 rounded-lg shadow-lg transition-all ease-in-out duration-200 border-white border hover:bg-white hover:text-black hover:scale-105"
      >
        Salva
      </button>
      <router-link to="/">
        <button
          class="mt-5 w-full text-white py-3 px-4 rounded-lg shadow-lg transition-all ease-in-out duration-200 bg-black hover:scale-105 hover:bg-white hover:text-black"
        >
          Torna alla Home
        </button>
      </router-link>
    </div>

    <!-- Loading -->
    <div v-else>
      <div class="text-center text-white text-xl">Caricamento...</div>
    </div>
  </div>
</template>

<style scoped>
</style>