<template>
  <div class="main">
    <h3>전체 문의 목록입니다</h3>
    <ul v-for="voc in vocs" v-bind:key="voc">
      <li>
        <table>
          <tr>
            <td class="td-yellow td-label text-center"><b>작성자</b></td>
            <td class="text-center" >{{voc.userid}}</td>
            <td class="td-yellow td-label text-center"><b>작성일시</b></td>
            <td class="text-center">{{ dateFormat(voc.crdt) }} </td>
          </tr>
          <tr>
            <td class="td-yellow td-label text-center"><b>제목</b></td>
            <td colspan="3" class="text-left">{{voc.title}}</td>
          </tr>
          <tr>
            <td class="td-yellow" colspan="4"><b>문의 내용</b> </td>
          </tr>
          <tr colspan="4">
            <td colspan="4" class="text-left">{{ voc.content }}</td>
          </tr>
        </table>
      </li>

      <ul v-for="response in voc.responses" v-bind:key="response">
        <li>
          <table class="response">
            <tr>
              <td class="td-brown"><b>답변내용</b></td>
            </tr>
            <tr>
              <td><b>{{response.content}}</b></td>
            </tr>
            <tr>
              <td class="td-brown"><b>답변일시</b></td>
            </tr>
            <tr>
              <td><b>{{ dateFormat(response.crdt) }}</b></td>
            </tr>
          </table>
          </li>
        </ul>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
/* eslint-disable */
import vueMoment from 'vue-moment'
/* eslint-enable */

export default {
  component: vueMoment,
  name: 'main',
  props: {
    msg: String
  },
  data () {
    return {
      vocs: []
    }
  },
  methods: {
    getVocs () {
      axios.get('http://localhost:8080/v1/customer/vocs')
        .then((res) => {
          console.log('getVocs:', res.data)
          this.vocs = res.data
        })
    },
    dateFormat (s) {
      const yyyyMMdd = String(s)
      const sYMD = yyyyMMdd.substring(0, 10)
      const sHMS = yyyyMMdd.substring(11, 19)

      return sYMD + ' ' + sHMS
    }
  },
  beforeMount () {
    this.getVocs()
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
.text-center{
  text-align: center;
}
.text-left{
  text-align: left;
}
.td-label{
  width : 5em;
}
.td-yellow{
  background-color: #EFE4B0;
}
.td-brown{
  background-color: #B97A57;
}
table {
  width: 40em;
  border: 1px solid #444444;
  border-collapse: collapse;
  margin-bottom: 1em;
}
td, tr {
    border: 1px solid #444444;
}
.response{
  margin-bottom: 2em;
}
</style>
