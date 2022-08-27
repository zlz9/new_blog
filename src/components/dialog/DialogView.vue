<template>
  <el-dialog v-model="dialogVisible" title="发布文章">
    <div>
      <el-checkbox v-model="checked1" label="java" size="large" />
      <el-checkbox v-model="checked2" label="python" size="large" />
      <el-checkbox v-model="checked3" label="vue" size="large" />
      <el-checkbox v-model="checked4" label="springboot" size="large" />
      <el-checkbox v-model="checked5" label="react" size="large" />
      <el-checkbox v-model="checked6" label="Linux" size="large" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { defineExpose } from "vue";
const dialogVisible = ref(false);
const checked1 = ref(true);
const checked2 = ref(false);
const checked3 = ref(false);
const checked4 = ref(false);
const checked5 = ref(false);
const checked6 = ref(false);
/**
 * 将dialogVisible暴露出去
 */
defineExpose({ dialogVisible });
</script>

<style scoped lang="scss"></style>
