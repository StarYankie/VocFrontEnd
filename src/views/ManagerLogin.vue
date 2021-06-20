<template>
  <div>
      <h2>관리자 로그인</h2>
      <form @submit="onSubmit">
          <p><input placeholder="ID" v-model="username"></p>
          <p><input type="password" placeholder="Password" v-model="password"></p>
      </form>
      <input type="submit" value="로그인" @click="login">
      <p>사전 입력 된 매니저 계정은 아래 2개입니다.</p>
      <p>ID : manager1 / PW : password1 </p>
      <p>ID : manager2 / PW : password2 </p>
  </div>
</template>

<script>
import axios from 'axios'
import cookies from '../utils/cookies'

const ai = axios.create({
  baseURL: 'http://localhost:8080/authenticate/'
})

export default {
  data () {
    return {
      username: '',
      password: '',
      message: '로그인 하세요.'
    }
  },
  methods: {
    login () {
      cookies.deleteCookie('accessUser')
      cookies.deleteCookie('accessToken')
      ai.post(
        'http://localhost:8080/authenticate',
        {
          username: this.username,
          password: this.password
        })
        .then(res => {
          if (res.status === 200) {
            this.message = this.username + '로 로그인 되었습니다.'
            cookies.saveAuthToCookie(res.data.token)
            cookies.saveUserToCookie(this.username)
            this.$router.push({ name: 'manager' })
          } else {
            alert('로그인 정보를 확인하세요.')
          }
        })
        .catch(e => {
          alert('로그인 정보를 확인하세요.')
        })
    },
    init () {
      if (cookies.getAuthFromCookie) {

      } else {
        cookies.deleteCookie('accessUser')
        cookies.deleteCookie('accessToken')
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style>

</style>
