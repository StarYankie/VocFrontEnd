<template>
  <div class="home">
    <TopMenu/>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import TopMenu from '@/components/manager/topMenu.vue'

export default {
  name: 'managerHome',
  components: {
    TopMenu
  }
}
</script>
