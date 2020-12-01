<template>
  <div class="login">
    <el-form
      label-width="80px"
      @submit.prevent.native="login"
    >
      <el-form-item>
        <h3>请登录</h3>
      </el-form-item>
      <el-form-item label="用户名：">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" size="medium">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      model: {}
    }
  },
  methods: {
    async login() {
      const res = await this.$http.post('login', this.model)
      localStorage.setItem('token', res.data.token)
      this.$message({
        type: 'success',
        message: '登陆成功'
      })
      this.$router.push('/')
    }
  }
};
</script>

<style scoped>
.login {
  padding: 1rem;
  width: 28rem;
  margin: 10rem auto;
  border: 1px solid #ccc; 
  background-color: skyblue;
}
</style>