<template>
  <div>这是a页面</div>
</template>

<script>
export default {
  name: '',
  data() {
    return {};
  },
  mounted(){
    console.log(process.env.NODE_ENV)
    console.log(process.env.VUE_APP_TEST)
  }
};
</script>

<style scoped lang="scss">

</style>
