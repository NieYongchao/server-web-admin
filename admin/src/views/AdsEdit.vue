<template>
  <div>
    <h2>{{ id ? "编辑" : "新建" }}广告位</h2>
    <el-form label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button
          type="default"
          style="margin-bottom: 10px"
          @click="model.items.push({})"
          class="el-icon-plus"
          >添加广告</el-button
        >
        <el-row>
          <el-col :span="24" v-for="(item, i) in model.items" :key="i">
            <el-form-item label="图片链接" style="margin-bottom: 15px">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="广告图片">
              <el-upload
                class="avatar-uploader"
                :action="picUrl"
                :show-file-list="false"
                :on-success="(res) => $set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-button
              type="danger"
              style="margin: 10px"
              @click="model.items.splice(i, 1)"
              >删除</el-button
            >
          </el-col>
        </el-row>
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
      model: {
        items: [],
      },
      picUrl: this.$http.defaults.baseURL + "/upload",
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
      let name = this.model.name;
      let model = this.model;
      if (name == "") {
        this.$message({
          type: "warning",
          message: "请输入名称",
        });
        return;
      }
      if (this.id) {
        const res = await this.$http.put(`/rest/ads/${this.id}`, model);
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "编辑成功",
          });
          this.$router.push("/ads/list");
        }
      } else {
        const res = await this.$http.post("/rest/ads", model);
        if (res) {
          this.$message({
            type: "success",
            message: "保存成功",
          });
          this.model = {};
          this.$router.push("/ads/list");
        }
      }
    },
    async fetch() {
      const res = await this.$http.get(`/rest/ads/${this.id}`);
      this.model = res.data;
    },
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
  width: 180px;
  height: 90px;
  line-height: 90px;
  text-align: center;
}
.avatar {
  width: 180px;
  height: 90px;
  display: block;
}
</style>
