<template>
  <div>
    <el-dialog v-model="dialogVisible" title="搜索文章">
      <AutocompleteView></AutocompleteView>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AutocompleteView from "./AutocompleteView.vue";
import { defineExpose } from "vue";
const dialogVisible = ref(false);
// 将defineExpose
defineExpose({ dialogVisible });
</script>

<style scoped lang="scss"></style>
