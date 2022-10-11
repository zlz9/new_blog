<template>
  <div>
    <upload-tool ref="$upload" @handle="refresh"></upload-tool>
    <el-row :gutter="20">
      <transition-group
        mode="out-in"
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <el-col :span="6" v-for="(item, index) in tools" :key="item.id"
          ><div class="tool">
            <el-card>
              <img v-lazy="item.cover" alt="" class="cover" />
              <div class="footer">
                <el-link class="link" size="20" :href="item.link">链接</el-link>
                <el-tooltip effect="dark" placement="top">
                  <template #content>
                    <div class="detail">
                      {{ item.summary }}
                    </div>
                  </template>
                  <el-link class="summary" size="20"> 详情 </el-link></el-tooltip
                >
              </div>
            </el-card>
          </div></el-col
        >
      </transition-group>
      <el-col :span="4">
        <div class="plus" @click="showUpload">
          <el-icon style="width: 100%; height: 100%" size="100"><Plus /></el-icon>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { getToolApi } from "@/api";
const $upload = ref();
const showUpload = () => {
  $upload.value.upload = true;
};

let tools = ref([]);
const getToolList = () => {
  return getToolApi().then((res) => {
    if (res.code == 200) {
      tools.value = res.data.data;
    }
  });
};
console.log(tools, "tools");

onMounted(() => {
  getToolList();
});
const refresh = () => {
  // 再次请求数据
  getToolList();
};
</script>

<style lang="scss" scoped>
.cover {
  width: 100%;
  height: 270px;
}
.footer {
  display: flex;
  justify-content: space-around;
}
.tool {
  position: relative;
  margin: 10px;
}
.detail {
  width: 300px;
  text-indent: 2em;
}
.plus {
  width: 300px;
  height: 330px;
  margin: 10px;
  background-color: #fff;
  font-size: 30px;
}
</style>
