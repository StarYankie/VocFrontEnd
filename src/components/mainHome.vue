<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <h3>페이지 이동</h3>
    <ul>
      <li><router-link to="/customer">고객 페이지</router-link> </li>
      <li><router-link to="/manager">매니저 페이지</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'mainHome',
  props: {
    msg: String
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
</style>
