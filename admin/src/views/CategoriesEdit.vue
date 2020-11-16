<template>
  <div>
    <h2>{{ id ? "编辑" : "新建" }}分类</h2>
    <el-form label-width="120px">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent" placeholder="请选择" @change="handleChange">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类">
        <el-input v-model="model.name"></el-input>
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
      model: {},
      parents: []
    };
  },
  props: {
    id: {},
  },
  created() {
    this.id && this.fetch();
    this.getParents()
  },
  methods: {
    async save() {
      let name = this.model.name;
      let parent = this.model.parent;
      if (name == "") {
        this.$message({
          type: "warning",
          message: "请输入名称",
        });
        return;
      }
      if (this.id) {
        const res = await this.$http.put(`/rest/categories/${this.id}`, { name });
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "编辑成功",
          });
          this.$router.push("/categories/list");
        }
      } else {
        const res = await this.$http.post("/rest/categories", { name, parent });
        if (res) {
          this.$message({
            type: "success",
            message: "保存成功",
          });
          this.model = {};
          this.$router.push("/categories/list");
        }
      }
    },
    async fetch() {
      const res = await this.$http.get(`/rest/categories/${this.id}`);
      this.model = res.data;
    },
    // 获取父级分类
    async getParents() {
      const res = await this.$http.get('/rest/categories')
      this.parents = res.data.filter(item => !item.parent)
    },
    // 下拉框数据变化
    handleChange() {
      // this.model.value = e
    }
  },
};
</script>

<style></style>
