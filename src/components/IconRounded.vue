<script>

export default {
  data() {
    return {
    }
  },

  props:{
    item: String
  }
}
</script>

<template>
  <div class="rounded-full shadow-xl bg-transparent">
    {{ item }}
  </div>
</template>