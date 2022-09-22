<template>
  <div>
    <Waterfall :list="list" backgroundColor="">
      <template #item="{ item, url, index }">
        <div class="card">
          <LazyImg :url="item.src" />
          <p class="text">这是内容</p>
        </div>
      </template>
    </Waterfall>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next";
import "vue-waterfall-plugin-next/style.css";
const list = ref([
  {
    src:
      "https://bpic.588ku.com/element_origin_min_pic/19/04/22/1a4323b5ed12b04af11057134f30adf3.jpg",
  },
  {
    src:
      "https://pic2.zhimg.com/v2-35337484e7087db539bd922a74f790e8_720w.jpg?source=172ae18b",
  },
  {
    src:
      "https://ts1.cn.mm.bing.net/th/id/R-C.cf23526f451784ff137f161b8fe18d5a?rik=F9%2by9DNUlPcyug&riu=http%3a%2f%2fvue.awesometiny.com%2flogo.png&ehk=iRCrccZ5rRQ7bD4aal9%2f6yyNiPw3s8xLT4bBNd%2f0cmQ%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    src:
      "https://tse4-mm.cn.bing.net/th/id/OIP-C.-0Yo1Z8tZqAv5NzpULpH4QHaDi?pid=ImgDet&rs=1",
  },
  {
    src: "https://cdn.filestackcontent.com/IEMTnwZrR2SJNoRUw6Tq",
  },
  {
    src: "https://cdn.filestackcontent.com/IEMTnwZrR2SJNoRUw6Tq",
  },
  {
    src: "https://cdn.filestackcontent.com/IEMTnwZrR2SJNoRUw6Tq",
  },
  {
    src: "https://cdn.filestackcontent.com/IEMTnwZrR2SJNoRUw6Tq",
  },

  {
    src:
      "https://pic2.zhimg.com/v2-35337484e7087db539bd922a74f790e8_720w.jpg?source=172ae18b",
  },
  {
    src:
      "https://ts1.cn.mm.bing.net/th/id/R-C.cf23526f451784ff137f161b8fe18d5a?rik=F9%2by9DNUlPcyug&riu=http%3a%2f%2fvue.awesometiny.com%2flogo.png&ehk=iRCrccZ5rRQ7bD4aal9%2f6yyNiPw3s8xLT4bBNd%2f0cmQ%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    src:
      "https://tse4-mm.cn.bing.net/th/id/OIP-C.-0Yo1Z8tZqAv5NzpULpH4QHaDi?pid=ImgDet&rs=1",
  },
  {
    src: "https://cdn.filestackcontent.com/IEMTnwZrR2SJNoRUw6Tq",
  },
  {
    src: "https://cdn.filestackcontent.com/IEMTnwZrR2SJNoRUw6Tq",
  },
]);
</script>

<style scoped lang="scss">
.card {
  background: #ffff;
}
</style>
