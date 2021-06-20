<template>
  <div class="home">
    <img alt="Kakao logo" src="../assets/kakao.png">
    <MainHome msg="고객 문의 시스템"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MainHome from '@/components/mainHome.vue'

export default {
  name: 'Home',
  components: {
    MainHome
  }
}
</script>
