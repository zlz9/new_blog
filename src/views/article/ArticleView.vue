<template>
  <div>
    <div class="article">
      <h3>关于vue</h3>
      <span>2022-12-16</span>
      <p>
        Vue (读音 /vjuː/，类似于view)
        是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue
        被设计为可以自底向上逐层应用。Vue
        的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue
        也完全能够为复杂的单页应用提供驱动。 作者：小T果农
        链接：https://www.jianshu.com/p/1506cbc89849 来源：简书
        著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
      </p>
      <div class="footer">
        <div class="tag">
          <el-tag type="success">java</el-tag>
          <el-tag type="success">python</el-tag>
        </div>
        <div class="view">
          <div>
            <el-icon class="icon"><View /></el-icon><span>22</span>
          </div>
          <div>
            <el-icon class="icon"><Reading /></el-icon><span>33</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="article">
      <h3>关于vue</h3>
      <span>2022-12-16</span>
      <p>
        Vue (读音 /vjuː/，类似于view)
        是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue
        被设计为可以自底向上逐层应用。Vue
        的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue
        也完全能够为复杂的单页应用提供驱动。 作者：小T果农
        链接：https://www.jianshu.com/p/1506cbc89849 来源：简书
        著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
      </p>
      <div class="footer">
        <div class="tag">
          <el-tag type="success">java</el-tag>
          <el-tag type="success">python</el-tag>
        </div>
        <div class="view">
          <div>
            <el-icon class="icon"><View /></el-icon><span>22</span>
          </div>
          <div>
            <el-icon class="icon"><Reading /></el-icon><span>33</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.article {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgb(195, 209, 207);
  border-radius: 10px;
  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-indent: 2em;
  }
  .footer {
    display: flex;
    width: 100%;
    .tag {
      width: 80%;
      display: flex;
      justify-content: space-around;
      margin-bottom: 10px;
    }
    .view {
      display: flex;
      height: 20px;
      width: 100px;
      justify-content: space-around;
      width: 20%;
      span {
        font-size: 12px;
        color: rgb(226, 35, 35);
      }
    }
  }
  .icon {
    color: rgb(240, 88, 88);
  }
}
</style>
