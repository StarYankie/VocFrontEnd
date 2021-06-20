<template>
  <div class="main">
    <h3>답변이 없는 문의 목록입니다.</h3>
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
        <div v-if="voc.mngid === null">
          <p><button @click="assign(voc.id);">접수</button></p>
        </div>
        <div v-else>
          <p>접수완료, 접수자 : {{voc.mngid}}</p>
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
      vocs: [],
      polling: null
    }
  },
  methods: {
    dateFormat (s) {
      const yyyyMMdd = String(s)
      const sYMD = yyyyMMdd.substring(0, 10)
      const sHMS = yyyyMMdd.substring(11, 19)

      return sYMD + ' ' + sHMS
    },
    getVocs () {
      axios.get('http://localhost:8080/v1/manager/vocs', {
        params: {
          replied: 'N'
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
    assign (vocid) {
      axios.patch('http://localhost:8080/v1/manager/vocs/' + vocid + '?mngid=' + cookies.getUserFromCookie(), {
        headers: {
          Authorization: 'Bearer ' + cookies.getAuthFromCookie()
        }
      })
        .then((res) => {
          console.log('assignVocs:', res.data)
          alert(res.data)
          location.reload();
        })
    },
    // 5초마다 Polling
    pollData () {
		  this.polling = setInterval(() => {
	  		this.getVocs()
	  	}, 5000)
    },
  },
  beforeDestroy () {
	   clearInterval(this.polling)
  },
  created () {
    this.getVocs()
  	this.pollData()
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
table {
  width: 40em;
  border: 1px solid #444444;
  border-collapse: collapse;
  margin-bottom: 2em;
}
td, tr {
    border: 1px solid #444444;
}
</style>
