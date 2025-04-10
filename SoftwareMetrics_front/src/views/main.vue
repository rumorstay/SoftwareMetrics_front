<script setup lang="ts">
import FunctionModel from '@/components/FunctionModel.vue'
import {ref} from "vue";
let FunctionName = ref('软件度量与开发实验')


</script>
<template>
  <FunctionModel :function_name = "FunctionName">
    <div class="team_information">
      <el-divider style="margin-top: 5px;margin-bottom: 5px"></el-divider>

      <span style="font-weight: bold;font-size: 30px">软件度量与开发实验</span>
      <br/>
      <span>小组成员：王昱凯，王淼蕙，樊康旭，陈菲</span>
      <br/>
      <el-divider style="margin-top: 10px;margin-bottom: 5px"></el-divider>

      <span style="font-weight: bold;font-size: 25px">实验内容:</span>
      <br>
      1. 完成功能点度量
      <br>
      2. 完成用例点度量
      <br>
      3. 完成圈复杂度度量
      <br>
      4. 完成面向对象CK度量
      <br>
      5. 完成面向对象LK度量
      <br>
      6. 完成代码行度量
      <br>
    </div>
  </FunctionModel>
</template>

<style>
.team_information{
  font-size: 20px;
  margin-left: 10px;
}

</style>

