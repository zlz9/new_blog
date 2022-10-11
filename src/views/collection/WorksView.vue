<template>
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in workList" :key="item.id" class="col">
          <el-card :body-style="{ padding: '0px' }" class="card">
            <img v-lazy="item.img[0].url" class="image" />
            <div style="padding: 14px">
              <span></span>
              <div class="bottom">
                <time class="time">{{ day(item.createTime).format("YYYY-MM-DD") }}</time>
                <el-button text class="button" @click="goWorkInfo(item.id)"
                  >查看详情</el-button
                >
              </div>
            </div>
          </el-card>
          <div
        /></el-col>
        <el-col
          :span="4"
          style="
            height: 210px;
            padding-right: 10px;
            padding-left: 10px;
            position: relative;
            top: 10px;
            font-size: 60px;
          "
        >
          <div class="plus" @click="showUpload">
            <el-icon style="width: 100%; height: 100%" size="100"><Plus /></el-icon>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>

  <upload-work ref="$upload" @handle="refresh" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import "vue-waterfall-plugin-next/style.css";
import { getWorksApi } from "@/api";
import { useRouter } from "vue-router";
const router = useRouter();
const $upload = ref();

let workList = ref([]);

const getWorkList = () => {
  return getWorksApi().then((res) => {
    if (res.code == 200) {
      workList.value = res.data.workList;
    }
  });
};

onMounted(() => {
  getWorkList();
});
const goWorkInfo = (id) => {
  router.push({ path: "/work/info", query: { id } });
};

const showUpload = () => {
  $upload.value.isShowDrawer = true;
};
const refresh = () => {
  // 再次请求数据
  getWorkList();
};
</script>

<style scoped lang="scss">
$font-famliy: "Comic Sans MS", cursive;
.card {
  background: #ffff;
  .text {
    text-align: center;
    font-family: $font-famliy;
  }
}
::v-deep .el-card,
.is-always-shadow {
  width: 100%;
  height: 100%;
}

.col {
  margin-top: 20px;
  .time {
    font-size: 12px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .button {
    padding: 0;
    min-height: auto;
  }

  ::v-deep .image {
    width: 100%;
    height: 150px;
    display: block;
  }
}
.plus {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #fff;
}
</style>
