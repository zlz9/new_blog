<template>
  <div class="write_article">
    <div class="title">
      <div class="title">did you study today</div>
    </div>
    <DialogView ref="$dialog"></DialogView>
    <v-md-editor v-model="text" height="800px" @save="save"></v-md-editor>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import DialogView from "@/components/dialog/DialogView.vue";
const text = ref("");
const $dialog = ref<InstanceType<typeof DialogView> | null>(null);
const save = (text: any, html: any) => {
  $dialog.value.dialogVisible = true;
  console.log(text, html);
};
onMounted(() => {
  console.log(text);
});
</script>

<style scoped lang="scss">
.write_article {
  .title {
    color: aliceblue;
    text-align: center;
    font-size: 50px;
    margin: 10px;
    font-family: "Comic Sans MS", cursive;
  }
}
</style>
