<template>
  <div>
<!--      面包系-->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/ok' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户信息</el-breadcrumb-item>
    </el-breadcrumb>


<!--    查询条件-->
      <el-row>
          <el-col :span="6" style="margin-top: 20px">
        <el-input placeholder="请输入查询条件" v-model="userParam.userName" class="input-with-select">
           <el-button slot="append" icon="el-icon-search" @click="getUserlist()"></el-button>
        </el-input>
          </el-col>
        <el-col :span="2" style="margin-top: 20px">
        <el-button type="primary" @click="showAdd()">新增</el-button>
        </el-col>
      </el-row>


<!--    数据表格-->
    <el-table
      :data="tableData"
      style="width: 100%;margin-top: 20px;"
      stripe>

      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>

      <el-table-column
        prop="userName"
        label="用户名称">
      </el-table-column>
      <el-table-column
        prop="userAccount"
        label="用户账号">
      </el-table-column>
      <el-table-column
        prop="userPassword"
        label="用户密码">
      </el-table-column>
      <el-table-column
        prop="userImg"
        label="用户头像">
        <template slot-scope="scope">
          <!--          {{scope.row}}-->
          <img style="width: 40px;height: 40px;" :src="scope.row.userImg"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="userRoot"
        label="用户权限">
      </el-table-column>
<!--      操作-->
      <el-table-column
        label="操作栏">
<!--        插槽，可以获取每一行的所有数据-->
        <template slot-scope="scope">
<!--          {{scope.row}}-->
          <el-button size="small" type="text" @click="update(scope.row)">编辑</el-button>
          <el-button size="small" type="text" @click="re(scope.row)">删除</el-button>
          <el-button size="small" type="text" @click="detail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

<!--  分页-->
    <div class="block" style="margin-left: 20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userParam.page"
        :page-sizes="[1,2,3,4,5,6,7,8,9,10]"
        :page-size="userParam.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

<!--    对话框-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">

      <el-form ref="addForm" :model="addUserData">
        <el-form-item label="用户名称" label-width="120px" >
          <el-input v-model="addUserData.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户账号"  label-width="120px">
          <el-input v-model="addUserData.userAccount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码"  label-width="120px">
          <el-input v-model="addUserData.userPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户权限"  label-width="120px">
          <el-select v-model="addUserData.userRoot" placeholder="请选择权限">
            <el-option label="管理员" value="1"></el-option>
            <el-option label="普通用户" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户头像"  label-width="120px">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8888/user/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "User",
  data(){
    return{
      userParam:{
        page:1,
        size:3,
        userName:""
      },//分页查询参数
      tableData:[{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      total:3,//总页数
    //  新增数据绑定
      dialogFormVisible: false,   //控制对话窗口打开
      addUserData:{
         userName: "",
        userAccount:"",
        userPassword:"",
        userRoot:null,
        userImg:"",
        title:"",
        userId:null
      },
      imageUrl: "",  //回显
      title:"",
    }
  },
  methods: {
    //-----------------------------分页查询方法-----------------------------------------
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    //  每页显示的size改变
      this.userParam.size = val;
    //  重新加载数据表格
      this.getUserlist();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    //  修改页数
      this.userParam.page=val;
    //  加载数据
      this.getUserlist();
    },
    getUserlist(){
      this.$http({method:"get",params:this.userParam,url:"/user/selectPage"}).then(res=>{
      this.tableData = res.data.data.list;  //数据加载
      this.total = res.data.data.total;    //总行数
      })
    },
  //  ---------新增-----------------------------------------------------------------
    showAdd(){
      //打开窗口
      this.title = "新增用户"
      this.dialogFormVisible = true;
    },
    // 图片上传成功回显
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.data;
    //  给用户userUrl赋值
      this.addUserData.userImg = res.data;
    },
    //图片上传成功验证
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
  //  新增数据
    add() {
      //判断是新增还是修改
      if (this.title == "新增用户") {
        this.$http({method: "post", data: this.addUserData, url: "/user/add"}).then(res => {
          //1清空表单，关闭弹窗/
          this.$refs.addForm.resetFields();
          this.dialogFormVisible = false;
          //2.加载数据表格
          this.getUserlist();
        })
      }else if (this.title == "修改用户"){
        //修改
        this.$http({method: "post", data: this.addUserData, url: "/user/update"}).then(res => {
          //1清空表单，关闭弹窗/
          this.$refs.addForm.resetFields();
          this.dialogFormVisible = false;
          //2.加载数据表格
          this.getUserlist();
        })
      }
    },
  //  修改
    update(row){
     // alert(row.userId)
      this.title = "修改用户"
      this.dialogFormVisible = true;
      //将数据渲染到表格
      this.addUserData.userName = row.userName;
      this.addUserData.userAccount = row.userAccount;
      this.addUserData.userPassword = row.userPassword;
      this.addUserData.userRoot = row.userRoot;
      this.addUserData.userImg = row.userImg;
      this.addUserData.userId = row.userId;
      this.imageUrl = row.userImg;
},
  //  删除
    re(row){
      this.$http({method: "get", params: {id:row.userId}, url: "/user/delete"}).then(res => {

        //2.加载数据表格
        this.getUserlist();
      })
    },
    //详情
    detail(row){
      this.$http({method: "get", params: {id:row.userId}, url: "/user/detail"}).then(res => {
        //1.将数据赋值给addUserData
        this.addUserData = res.data.data;
        //2.打开窗口
        this.dialogFormVisible = true;
      })
    }
  },
  //-------------钩子函数新增---------------------------------------------------------
  mounted(){
  //  加载数据
    this.getUserlist()
  }
}
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
