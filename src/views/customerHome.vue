<template>
  <div class="home">
    <Main/>
  </div>
</template>

<script>
// @ is an alias to /src
import Main from '@/components/customer/main.vue'

export default {
  name: 'customerHome',
  components: {
    Main
  }
}
</script>
