<template>
<div>
  <button @click="test">测试按钮</button>
</div>
</template>

<script>
export default {
  name: "Test",
  methods:{
    test(){
      this.$http({method:"get",data:null,url:"/user/test"}).then(res=>{
      //  回调函数
        alert(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
