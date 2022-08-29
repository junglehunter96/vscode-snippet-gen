

<template>
  <div class="flex flex-col justify-center h-100">

    <div>将vscode代码转换成snippet配置</div>

    <div class="content">
      <Form />
      <Pannel />
    </div>
  </div>
</template>

<script setup lang="ts">
import Form from "./components/Form.vue"
import Pannel from "./components/Pannel.vue"
</script>

<style scoped>
.content {
  top: 2vh;
  position: relative;
  width: 100%;
  height: 80vh;
  display: grid;
  grid-template-columns: 50% 50%;
}
</style>