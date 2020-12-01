<template>
  <div>
    <h2>{{ id ? "编辑" : "新建" }}管理员</h2>
    <el-form label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="save"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  props: {
    id: {},
  },
  created() {
    this.id && this.fetch();
  },
  methods: {
    async save() {
      let model = this.model;
      if (!model.username) {
        this.$message({
          type: "warning",
          message: "请输入名称",
        });
        return;
      } else if(!model.password) {
        this.$message({
          type: "warning",
          message: "请输入密码",
        });
        return;
      }
      if (this.id) {
        const res = await this.$http.put(`/rest/admin_users/${this.id}`, model);
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "编辑成功",
          });
          this.$router.push("/admin_users/list");
        }
      } else {
        const res = await this.$http.post("/rest/admin_users", model);
        if (res) {
          this.$message({
            type: "success",
            message: "保存成功",
          });
          this.model = {};
          this.$router.push("/admin_users/list");
        }
      }
    },
    async fetch() {
      const res = await this.$http.get(`/rest/admin_users/${this.id}`);
      this.model = res.data;
    }
  },
};
</script>

<style></style>
