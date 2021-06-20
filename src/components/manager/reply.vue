<template>
  <div class="main">
    <h3>접수하신 VOC 목록입니다.</h3>
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
            <td colspan="4" class="text-left">{{voc.content}}</td>
          </tr>
        </table>
        <div v-if="voc.replied === 'N'">
          <p><textarea id="content" type="text" v-model="content" placeholder='답변내용'/></p>
          <p><button @click="reply(voc.id);">등록</button></p>
        </div>
        <div v-if="voc.replied === 'Y'">
          <p>답변 완료</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import cookies from '../../utils/cookies'
/* eslint-disable */
axios.defaults.headers.common['Authorization'] = 'Bearer ' + cookies.getAuthFromCookie()
/* eslint-disable */
export default {
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
    dateFormat (s) {
      const yyyyMMdd = String(s)
      const sYMD = yyyyMMdd.substring(0, 10)
      const sHMS = yyyyMMdd.substring(11, 19)

      return sYMD + ' ' + sHMS
    },
    validation (e) {
      if (this.content) {
        return true
      }
      this.errors = []
      if (!this.content) {
        alert('답변 내용을 입력하세요.')
      }
      e.preventDefault()
    },
    getVocs () {
      axios.get('http://localhost:8080/v1/manager/vocs', {
        params: {
          manager: cookies.getUserFromCookie()
        },
        headers: {
          Authorization: 'Bearer ' + cookies.getAuthFromCookie()
        }
      })
        .then((res) => {
          console.log('getVocs:', res.data)
          this.vocs = res.data
        })
    },
    changeStatus (vocid) {
      axios.patch('http://localhost:8080/v1/manager/vocs/replied/' + vocid + '?mngid=' + cookies.getUserFromCookie(), {
      })
        .then((res) => {
          console.log('changeStatusVocs:', res.data)
          alert(res.data)
          location.reload()
        })
    },
    reply (vocid) {
      if(!this.validation()){
        return
      }
      axios.post('http://localhost:8080/v1/manager/responses/', {
        vocid: vocid,
        mngid: cookies.getUserFromCookie(),
        content: this.content,
      })
        .then((res) => {
          console.log('reply:', res.data)
          this.changeStatus(vocid)
        })
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
table {
  width: 40em;
  border: 1px solid #444444;
  border-collapse: collapse;
}
textarea {
  width: 40em;
}
td, tr {
    border: 1px solid #444444;
}
.td-yellow{
  background-color: #EFE4B0;
}
</style>
