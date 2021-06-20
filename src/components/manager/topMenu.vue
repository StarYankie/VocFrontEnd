<template>
  <div class="topMenu">
    <div>{{ sessionMsg }} </div>
    <div><button @click="logout();">로그아웃</button></div>
    <div id="nav">
      <router-link to="/manager/assign">미답변 목록조회</router-link> |
      <router-link to="/manager/reply">문의 답변</router-link>
    </div>
  </div>
</template>

<script>
import cookies from '../../utils/cookies'

export default {
  name: 'topMenu',
  props: {
    msg: String
  },
  methods: {
    logout () {
      cookies.deleteCookie('accessToken')
      cookies.deleteCookie('accessUser')
      alert('로그아웃 되었습니다.')
      this.$router.push({ name: 'login' })
    }
  },
  computed: {
    sessionMsg () {
      return cookies.getUserFromCookie() + '님 환영합니다.'
    }
  },
  mounted () {
    this.sessionMsg = cookies.getUserFromCookie() + '님 환영합니다.'
  }
}
</script>

<style scoped>
button {
  float: right;
  margin-right: 10%;
}
</style>
