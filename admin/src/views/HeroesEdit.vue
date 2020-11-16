<template>
  <div>
    <h2>{{ id ? "编辑" : "新建" }}物品</h2>
    <el-form label-width="120px">
      <el-tabs value="skill" type="border-card">
        <el-tab-pane label="基础信息" name="base">
          <el-form-item label="分类">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="图标">
            <el-upload
              class="avatar-uploader"
              :action="iconUrl"
              :show-file-list="false"
              :on-success="handleUpload"
            >
              <img v-if="model.icon" :src="model.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
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
          <el-form-item label="难度">
            <el-rate
              v-model="model.scores.difficulty"
              :max="10"
              style="margin-top: 0.7rem"
              show-score
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              v-model="model.scores.skill"
              :max="10"
              style="margin-top: 0.7rem"
              show-score
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              v-model="model.scores.attack"
              :max="10"
              style="margin-top: 0.7rem"
              show-score
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              v-model="model.scores.survive"
              :max="10"
              style="margin-top: 0.7rem"
              show-score
            ></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" placeholder="请选择" multiple>
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" placeholder="请选择" multiple>
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTip"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTip"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTip"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能信息" name="skill">
          <el-button
            type="primary"
            style="margin-bottom: 10px"
            @click="model.skills.push({})"
            >添加技能</el-button
          >
          <el-row>
            <el-col :span="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="技能名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="技能图标">
                <el-upload
                  class="avatar-uploader"
                  :action="iconUrl"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="技能表述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tip"></el-input>
              </el-form-item>
              <el-button type="danger" style="margin: 10px" @click="model.skills.splice(i,1)">删除</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <el-button
      style="margin: 20px"
      type="primary"
      native-type="submit"
      @click="save"
      >提交</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        name: "",
        title: "",
        categories: [],
        scores: {
          difficulty: 0,
          attack: 0,
          skill: 0,
          survive: 0,
        },
        skills: [],
      },
      iconUrl: this.$http.defaults.baseURL + "/upload",
      categories: [],
      items: [],
    };
  },
  props: {
    id: {},
  },
  created() {
    this.id && this.fetch();
    this.fetchCatgories();
    this.fetchItems();
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
        const res = await this.$http.put(`/rest/heroes/${this.id}`, this.model);
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "编辑成功",
          });
          this.$router.push("/heroes/list");
        }
      } else {
        const res = await this.$http.post("/rest/heroes", this.model);
        if (res) {
          this.$message({
            type: "success",
            message: "保存成功",
          });
          this.model = {};
          this.$router.push("/heroes/list");
        }
      }
    },
    async fetch() {
      const res = await this.$http.get(`/rest/heroes/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
      console.log(this.model);
    },
    // 获取分类
    async fetchCatgories() {
      const res = await this.$http.get(`/rest/categories`);
      this.categories = res.data;
    },
    // 获取装备
    async fetchItems() {
      const res = await this.$http.get(`/rest/items`);
      this.items = res.data;
      console.log(res);
    },
    // 图片上传
    handleUpload(res) {
      this.$set(this.model, "icon", res.url);
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
  width: 90px;
  height: 90px;
  line-height: 90px;
  text-align: center;
}
.avatar {
  width: 90px;
  height: 90px;
  display: block;
}
</style>
