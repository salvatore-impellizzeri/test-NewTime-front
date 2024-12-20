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
      })
      .catch((err) => {
        console.error("Errore nella richiesta API:", err);
      });
    },

    handleScroll(event) {
      event.preventDefault();
      const container = event.currentTarget;
      const scrollAmount = 176 + 20; 
      
      if (event.deltaY > 0) {
        container.scrollTop += scrollAmount;
      } else {
        container.scrollTop -= scrollAmount;
      }
    },
  }
}
</script>

<template>
  <div class="flex flex-wrap flex-col">
    <div class="text-center text-white drop-shadow-lg text-5xl font-semibold">
      Utenti
    </div>
    <div 
      class="rounded-3xl grid 2xl:grid-cols-3 max-lg:grid-cols-1 max-2xl:grid-cols-2 gap-x-5 gap-y-1 mt-10 px-10 scroll-transition overflow-y-auto custom-scrollbar"
      style="height: calc((176px * 3) + (20px * 3));"
      @wheel="handleScroll"
    >
      <Card
        v-for="(user, index) in this.users"  
        :key="index"
        :name="user.name"
        :surname="user.surname"
        :email="user.email"
      />
    </div>
  </div>
</template>
<style scoped>

.scroll-transition{
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

.shadow-icon{
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.144);
}

.bg-icon{
  background-color: rgba(255, 255, 255, 0.185);
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
</style>
