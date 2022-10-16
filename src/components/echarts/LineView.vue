<template>
  <div>
    <el-card>
      <div id="line" style="width: 100%; height: 100%"></div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, reactive, ref, watch } from "vue";
import { getArticleMonth } from "@/api";
let distribution = ref([]);
getArticleMonth().then((res) => {
  if (res.code == 200) {
    distribution.value = res.data;
  }
});
let time = ref();
let count = ref();
watch(distribution, () => {
  time.value = distribution.value.map((item) => {
    return item.time;
  });
  count.value = distribution.value.map((item) => {
    return item.count;
  });
  console.log(time, count, "time,count");
});

const init = () => {
  var chartDom = document.getElementById("line");
  var myChart = echarts.init(chartDom);
  var option;
  option = {
    title: {
      text: "近30天文章用户文章发布情况",
      /*textVerticalAlign:'center'*/
      left: "center",
    },
    xAxis: {
      type: "category",
      data: time.value,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: count.value,
        type: "line",
        smooth: true,
      },
    ],
  };
  option && myChart.setOption(option);
};
onMounted(() => {
  init();
});
watch(distribution, () => {
  init();
});
</script>

<style scoped lang="scss">
:deep(.el-card__body) {
  height: 500px;
}
</style>
