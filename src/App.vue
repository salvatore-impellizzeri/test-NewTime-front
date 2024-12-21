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

  computed:{
    isUserEditPage() {
      return this.$route.name === 'edit-user';
    },

    isUserCreatePage() {
      return this.$route.name === 'create-user';
    },
  },

  methods: {

  }
}
</script>

<template> 
  <div class="bg-gradient-to-b w-screen relative h-screen py-16 from-cyan-500 to-blue-700 overflow-hidden flex items-center justify-center">

    <!-- Overlay -->
    <div style="background-image: url('water.jpg'); background-size: cover;"
    class="absolute top-0 left-0 right-0 h-screen opacity-20">
    </div>

    <!-- Box Main -->
    <div 
      class="w-1/2 rounded-3xl glass-box max-sm:px-5 mx-auto p-16 max-lg:w-11/12 max-2xl:w-11/12"
      :class="[
        isUserEditPage || isUserCreatePage ? 'h-auto w-auto' : ' h-[100%] 2xl:w-9/12'
      ]"
    >
      <router-view></router-view>
    </div>

  </div>
</template>

<style scoped>
.inner-shadow{
  box-shadow: inset 1px 1px 7px 1px white;
}

.glass-box {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.048); 
  border-radius: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.288); 
  box-shadow: 0 0px 10px 2px rgba(0, 0, 0, 0.1); 
}

</style>

