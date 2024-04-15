<template>
  <div class="bj_img">
  <div class="login_div">
    <div class="login_text">登录</div>
    <!-- 登录表单 -->
    <el-form :model="loginForm" :rules="loginRules" ref="loginRef" label-width="100px" class="login_from">
      <!-- 账号输入框 -->
      <el-form-item label="账号" prop="userAccount">
        <el-input prefix-icon="icon iconfont icon-yonghu1" v-model="loginForm.userAccount"></el-input>
      </el-form-item>

      <!-- 密码输入框 -->
      <el-form-item label="密码" prop="userPassword">
        <el-input prefix-icon="icon iconfont icon-mima1" type="password" v-model="loginForm.userPassword"></el-input>
      </el-form-item>

      <!-- 登录按钮 -->
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="success" @click="reset">召唤牢大-重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
       userAccount: null,
       userPassword: null
      },
      loginRules: {
        userAccount: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        userPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    };
  },

  methods: {
    login() {
      this.$refs.loginRef.validate((valid) => {
        if (valid) {
          this.$http({
            method: "post",
            data: this.loginForm,
            url: "/user/login"
          }).then(res => {

            if(res.data.code==200){
            //  登录成功
            //  保存token
              window.sessionStorage.setItem("token", res.data.data.token);
            //  保存id
              window.sessionStorage.setItem("id", res.data.data.id);
            //  保存name
              window.sessionStorage.setItem("name", res.data.data.name);
              window.sessionStorage.setItem("userImg", res.data.data.userImg);
            //  路由跳转
              this.$router.push("/ok");
            }else {
              //登录失败
              this.$message.error(res.data.message);
              reset();
            }

            // if (res.data=="err") { // 假设服务端返回的状态为fail表示登录失败
            //   // 提示重新登录
            //   this.$message.error('输入错误,无法复活牢大');
            //   reset();
            // } else {
            //   //将字符串保存在本地
            //   window.sessionStorage.setItem("token", res.data);
            //   // 跳转路由
            //
            // }
          })
        } else {
          this.$message.error('输入错误');
          return false;
        }
      });
    },
    //重置
    reset() {
      this.$refs.loginRef.resetFields();
    }
  }
};
</script>

<style scoped>
.login_div{
  border:1px solid #dccfcf;
  width: 350px;
  margin:0px auto;
  padding: 35px 80px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
  background-color:rgba(255,255,255,0.7);
  position: relative;
  top: 100px;
}

.login_text{
  font-size: 50px;
  text-indent:30px;
}
.bj_img{
  background-attachment: fixed; /* 添加这一行来固定背景图片的位置 */
  background-image: url('~@/assets/Camera_XHS_17115917523041040g2sg30vj9njj5ls405pc5.jpg');
}

</style>
