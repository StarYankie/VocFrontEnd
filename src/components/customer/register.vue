<template>
  <div class="main">
    <form id="form" @submit.prevent="submitForm">
      <p><input v-model="form.userid" id="userid" type="text" placeholder='ID'/></p>
      <p><input v-model="form.title" id="title" type="text" placeholder='제목'/></p>
      <p><textarea v-model="form.content" id="content" type="text" placeholder='문의내용'/></p>
      <p v-if="errors.length">
        <b>에러 발생 :</b>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
  </p>
      <button id="submit" onclick="submitForm();">등록</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'register',
  props: {
    msg: String
  },
  data () {
    return {
      errors: [],
      form: {
        userid: '',
        title: '',
        content: ''
      }
    }
  },
  methods: {
    validation (e) {
      if (this.userid && this.title && this.content) {
        return true
      }
      this.errors = []
      if (!this.userid) {
        this.errors.push('ID를 입력하세요.')
      }
      if (!this.title) {
        this.errors.push('제목을 입력하세요.')
      }
      if (!this.content) {
        this.errors.push('문의내용을 입력하세요.')
      }
      e.preventDefault()
    },
    submitForm () {
      if (!this.validation()) {
        return
      }
      axios.post('http://localhost:8080/v1/customer/vocs', {
        userid: this.userid,
        title: this.title,
        content: this.content
      })
        .then((res) => {
          alert(res.data)
          this.$router.push('/customer')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input {
  width: 30%;
}
textarea {
  width: 30%;
  height: 10em
}
</style>
