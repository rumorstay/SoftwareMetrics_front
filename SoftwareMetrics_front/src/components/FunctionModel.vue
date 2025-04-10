<script setup lang="ts">

import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
import {ref} from "vue";


const props = defineProps({
  function_name: {
    type: String,
    default: "1111"
  }
})
</script>

<template>
  <div class = "FM-outside">
    <div class="FM-main">
      <div class="FM-Namespace">
        {{props.function_name}}
      </div>
      <div class="FM-content">
        <slot>


        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.FM-outside {
  display: flex;
  width: 98%;
  min-width: 500px;
  min-height: 420px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

}

.FM-main {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 98%;
  height: 90%;
  border-radius: 12px;
  background-color: #ffffff;
  padding: 20px 10px;
  margin: 10px 0;
  box-shadow:0 2px 10px #9d9d9d;
}


.FM-Namespace {
  position: relative;
  align-content: center;
  width: 350px;
  font-size: 30px;
  font-weight: 700;
  color: #000000;
  text-align: center;
  border-left: 3px solid red;
  /*
  background-color: #d37373;
*/
}
.FM-content{
  position: relative;
  width: 98%;
  height: auto;
  margin-top: 10px;
  padding: 10px 20px;

}

</style>
