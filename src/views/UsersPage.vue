<script>
import axios from 'axios';
import Card from '../components/Card.vue';

export default {
  data() {
    return {
      users: [],
      titles:[
        '<i class="fa-solid fa-user"></i>',
        'Full Name',
        'Email',
        'Action'
      ]
    }
  },

  components: {
    Card,
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
  <div>
    <div class="text-center text-white drop-shadow-lg text-5xl font-semibold">
      Utenti
    </div>
    <div 
      class="rounded-3xl grid grid-cols-3 gap-5 p-10 overflow-y-auto h-[500px]"
      style="height: calc((176px * 3) + (20px * 2));"
    >
      <Card v-for="(user, index) in this.users" 
        :key="index"
        :name="user.name"
        :surname="user.surname"
        :email="user.email"
      />
    </div>
  </div>
</template>
<style scoped>
.shadow-icon{
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.144);
}

.bg-icon{
  background-color: rgba(255, 255, 255, 0.185);
}
</style>