<script>
export default {
  name: "Ok",
  data(){
    return {
      userName: "",
        userImg: "../assets/logo.png",
      testData:[],
      menuIcon:["el-icon-user-solid","el-icon-shopping-bag-1","el-icon-folder","el-icon-s-data","el-icon-s-operation"]
      // testData: [{
      //   menuId: 1, parentId: 0, menuName: "用户管理", menuUrl: null,
      //   sonMenu: [{menuId: 3, parentId: 1, menuName: "用户列表", menuUrl: "/user"},
      //     {menuId: 4, parentId: 1, menuName: "用户测试", menuUrl: "/userTest"}
      //   ]
      // },
      //   {menuId: 2, parentId: 1, menuName: "数据管理", menuUrl: null}
      // ]
    }
  },


  methods: {
    end() {
      window.sessionStorage.clear();//清除缓存
      this.$router.push("/");
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getMenu(){
      this.$http({method:"get",url:"/menu/getMenu"}).then(res=>{
        this.testData = res.data.data;
    })
    }
  },

  mounted(){
      //页面加载完成函数，监听函数
  this.userName = window.sessionStorage.getItem("name");
  this.userImg = window.sessionStorage.getItem("userImg");
     //获取菜单
    this.getMenu();
  }
}

</script>

<template>
  <el-container>
    <el-header height="80px">
      <div class="heanderDiv">
        <img class="img_login" :src="userImg"/>
        <span>智慧养老系统</span>
      </div>
        <span>欢迎您:{{userName}}</router-link></span>
      <el-button type="info" @click="end">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="245px">
<!--        左侧菜单栏-->
        <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        router
        >
<!--        一级菜单-->
        <el-submenu :index="menu.menuId+'' " v-for="(menu, index) in testData" :key="menu.menuId">
          <template slot="title">
            <i :class="menuIcon[index]"></i>
            <span>{{menu.menuName}}</span>
          </template>
<!--          二级菜单-->
          <el-menu-item :index="son.menuUrl" v-for="son in menu.sonMenu" :key="son.menuId">{{son.menuName}}</el-menu-item>
        </el-submenu>
      </el-menu>

      </el-aside>
      <el-main>
            <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
/*设置整体高度*/
.el-container{
  height: 100%;
}
/*顶部*/
.el-header{
  display: flex;
  justify-content: space-between;
  padding-left: 0px;
  align-items: center;
  font-size: 20px;
  background-color: black;
  color: white;
}

/*左侧*/
.el-aside{
  background-color: #ffffff;
}
.el-main{
  background-color: #F0FFFF;
}
.img_login{
  width: 70px;
  height: 80px;
  border-radius:50%;
}
.el-menu{
  border-right: none;
}
.heanderDiv{
  display: flex;
  align-items: center;
    height: 70px;
}
</style>
