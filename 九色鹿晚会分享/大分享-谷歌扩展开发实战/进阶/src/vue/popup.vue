<template>
  <Login v-if="isLogin === false" @loginSuccess="isLogin = true"></Login>
  <Main v-if="isLogin"></Main>
</template>
<script setup>
import {getToken} from '@src/js/utils/fun'
import Login from '@src/vue/components/login.vue'
import Main from '@src/vue/components/main.vue'
let isLogin = ref(null)
onMounted(async ()=>{
  let token = await getToken()
  isLogin.value = token ? true : false
})
</script>
<style lang="scss">
*{
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
body,html{
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  background: url("@src/images/bg.png") no-repeat 50%;
  background-size: cover;
  /*background: blueviolet;*/
}
#app{
  width: 100%;
  height: 100%;
}
</style>
