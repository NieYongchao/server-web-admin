<template>
  <div>
    <h1>管理员列表</h1>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="_id" label="_id"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/admin_users/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="deleteItem(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await this.$http.get("/rest/admin_users");
      if (res.status === 200) {
        this.tableData = res.data;
        return;
      }
      this.$message.error("数据获取失败");
    },
    // 删除
    async deleteItem(row) {
      this.$confirm(`是否要删除${row.name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`/rest/admin_users/${row._id}`);
        console.log(res)
        if (res.data.success) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getList()
        }
      }).catch(()=>{})
    },
  },
};
</script>

<style></style>
