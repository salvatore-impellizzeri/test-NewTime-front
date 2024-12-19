<script>
import axios from 'axios';
import IconRounded from '../components/IconRounded.vue';
import IconRounded from '../components/IconRounded.vue';

export default {
  data() {
    return {
      users: [],
      th:[
        'ID',
        'Full Name',
        'Email',
        'Action'
      ]
    }
  },

  components: {
    IconRounded
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
    <table>
      <thead>
        <tr v-for="(user, index) in this.users[0]" :key="index">
          <th class="rounded-full">
            <IconRounded 

            />
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>