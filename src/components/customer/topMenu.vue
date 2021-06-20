<template>
  <div class="topMenu">
      <div id="nav">
    <router-link to="/customer/register">문의 등록</router-link> |
    <router-link to="/customer/list">문의 목록</router-link>
  </div>
  </div>
</template>

<script>
export default {
  name: 'topMenu',
  props: {
    msg: String
  }
}
</script>
