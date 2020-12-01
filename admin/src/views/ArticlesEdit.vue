<template>
  <div>
    <h2>{{ id ? "编辑" : "新建" }}文章</h2>
    <el-form label-width="120px">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" placeholder="请选择" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input v-model="model.title" width="300"></el-input>
      </el-form-item>
      <el-form-item label="文章详情">
        <vue-editor
          useCustomImageHandler
          @image-added="handleImageAdded"
          v-model="model.body"
        >
        </vue-editor>
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
import { VueEditor } from "vue2-editor";
export default {
  data() {
    return {
      model: {},
      categories: []
    };
  },
  components: {
    VueEditor,
  },
  props: {
    id: {},
  },
  created() {
    this.id && this.fetch();
    this.fetchCategories();
  },
  methods: {
    async save() {
      if (this.model.title == "") {
        this.$message({
          type: "warning",
          message: "请输入标题",
        });
        return;
      }
      if (this.id) {
        const res = await this.$http.put(
          `/rest/articles/${this.id}`,
          this.model
        );
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "编辑成功",
          });
          this.$router.push("/articles/list");
        }
      } else {
        const res = await this.$http.post("/rest/articles", this.model);
        if (res) {
          this.$message({
            type: "success",
            message: "保存成功",
          });
          this.model = {};
          this.$router.push("/articles/list");
        }
      }
    },
    async fetch() {
      const res = await this.$http.get(`/rest/articles/${this.id}`);
      // console.log(res);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get(`/rest/categories`);
      // console.log(res, "wenz");
      this.categories = res.data;
    },

    // 文本编辑器
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      console.log(file)
      let formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
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
