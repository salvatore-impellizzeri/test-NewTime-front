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

  mounted(){
    this.getUsers();
  },  

  methods: {
    getUsers(){
      axios
      .get('http://127.0.0.1:8000/api/users')
      .then((res) => {
        this.users = res.data;
        console.log(this.users);
      })
      .catch((err) => {
        console.error("Errore nella richiesta API:", err);
      });
    }
  }
}
</script>

<template>
  <div class="rounded-3xl shadow-lg py-7 px-5 bg-white/10">
    <div class="text-white font-semibold text-center">
      <div>
        {{ name }} {{ surname }}
      </div>
      <div class="text-sm mt-4">
        {{ email }}
      </div>
      <div class="flex justify-center space-x-4 mt-5">
      <!-- Icona Modifica -->
      <div class="rounded-full shadow-md w-[40px] text-black bg-gradient-to-br from-gray-300 to-white aspect-square flex items-center justify-center">
        <i class="fa-solid fa-user-pen"></i>
      </div>
      <!-- Icona Elimina -->
      <div class="rounded-full shadow-md w-[40px] bg-gradient-to-br from-black to-gray-600 aspect-square flex items-center justify-center">
        <i class="fa-solid fa-trash"></i>
      </div>
</div>

    </div>
  </div>
</template>