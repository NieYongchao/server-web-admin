<template>
  <div>
    <h2>{{ id ? "编辑" : "新建" }}物品</h2>
    <el-form label-width="120px">
      <el-form-item label="分类">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="iconUrl"
          :headers="getAuthorization()"
          :show-file-list="false"
          :on-success="handleUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      iconUrl: this.$http.defaults.baseURL + '/upload'
    };
  },
  props: {
    id: {},
  },
  created() {
    this.id && this.fetch();
    console.log(this.iconUrl)
  },
  methods: {
    async save() {
      if (this.model.name == "") {
        this.$message({
          type: "warning",
          message: "请输入名称",
        });
        return;
      }
      if (this.id) {
        const res = await this.$http.put(`/rest/items/${this.id}`, this.model);
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "编辑成功",
          });
          this.$router.push("/items/list");
        }
      } else {
        const res = await this.$http.post("/rest/items", this.model);
        if (res) {
          this.$message({
            type: "success",
            message: "保存成功",
          });
          this.model = {};
          this.$router.push("/items/list");
        }
      }
    },
    async fetch() {
      const res = await this.$http.get(`/rest/items/${this.id}`);
      console.log(res)
      this.model = res.data;
    },
    // 图片上传
    handleUpload(res) {
      this.$set(this.model, 'icon', res.url)
    }
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
