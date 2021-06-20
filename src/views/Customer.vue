<template>
  <div class="home">
    <TopMenu/>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import TopMenu from '@/components/customer/topMenu.vue'

export default {
  name: 'customerHome',
  components: {
    TopMenu
  }
}
</script>
