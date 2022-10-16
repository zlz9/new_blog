<template>
  <el-card>
    <div id="pie" style="width: 100%; height: 100%"></div>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";
import { getUserSkills, getSystemUserKills } from "@/api";
type EChartsOption = echarts.EChartsOption;
let skillData = ref();
getSystemUserKills().then((res) => {
  if (res.code == 200) {
    skillData.value = res.data.map((item) => {
      return {
        name: item.tagName,
        value: item.articleNum,
      };
    });
    console.log(skillData.value, "skillData.value");
  }
});
const init = () => {
  var chartDom = document.getElementById("pie");
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;
  option = {
    title: {
      text: "所有文章分布情况",
      /*textVerticalAlign:'center'*/
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        type: "pie",
        radius: "50%",
        data: skillData.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  option && myChart.setOption(option);
};
watch(skillData, () => {
  init();
});
onMounted(() => {
  init();
});
</script>

<style scoped lang="scss">
:deep(.el-card__body) {
  height: 500px;
}
</style>
