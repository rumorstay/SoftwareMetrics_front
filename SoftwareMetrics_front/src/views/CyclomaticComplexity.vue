<script setup lang="ts">
import FunctionModel from "@/components/FunctionModel.vue";
import {ref} from "vue";
import {ElMessage, ElMessageBox, UploadProps, UploadUserFile} from "element-plus";
import {getCC, getLOC, getOO_CK, getOO_CK_file, getOO_LK, getUC} from "@/api/all_api";

let Page_name = "圈复杂度度量";
const ShowtheTable = ref(false);

const fileData:UploadUserFile[]=([
  {
    name: 'control.dot',
    url: "H:\\Code\\软件度量实验\\new1\\Experiment4SoftwareMetrics\\Backend\\image\\control.dot"
  },
  {
    name:'use_case.dot',
    url: "H:\\Code\\软件度量实验\\new1\\Experiment4SoftwareMetrics\\Backend\\image\\use_case.dot"
  }
])

const tableData =ref<CC>({
  filename: '请上传文件',
  nodes: 0,
  edges: 0,
  connected_components: 0,
  cyclomatic_complexity: 0,
})


interface CC {
  filename: string,
  nodes: number,
  edges: number,
  connected_components: number,
  cyclomatic_complexity: number,
}

const handleFolderSelect = async (file)=>{
  console.log(file.name); // 当前选中的文件对象
  if (!file.name) return null; // 如果 name 无效，返回 null
  const file1 = fileData.find(f => f.name === file.name);
  const fileurl = file1 ? file1.url : "H:\\Code\\软件度量实验\\new1\\Experiment4SoftwareMetrics\\Backend\\image\\control.dot";
  formInline.dot_file = fileurl;
  let formData = new FormData();
  formData.append('dot_file', fileurl);
  console.log(formData.get('dot_file'))
  onSubmit(formData)
}
import { reactive } from 'vue'

interface RuleForm {
  dot_file: string
}

const formInline = reactive<RuleForm>({
  dot_file: 'H:\\Code\\软件度量实验\\new1\\Experiment4SoftwareMetrics\\Backend\\image\\control.dot',
})
const onSubmit = async (formInline) => {
  console.log('submit!')
  await getCC(formInline).then((res)=>{
    ShowtheTable.value = true
    console.log(res)
    tableData.value = {
      filename: res.data.filename,
      nodes: res.data.nodes,
      edges: res.data.edges,
      connected_components: res.data.connected_components,
      cyclomatic_complexity: res.data.cyclomatic_complexity,
    };
    console.log(tableData.value)
  }).catch(error=>{
    console.log(error)
  })
}

import { genFileId } from 'element-plus'
import type { UploadInstance, UploadRawFile } from 'element-plus'

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  console.log(file.name)
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
</script>

<template>
  <FunctionModel :function_name = "Page_name">
    <el-form :model="formInline"
             class="demo-ruleForm"
             size="large"
             label-width="auto"
             label-position="right"
    >
      <el-form-item label="请输入文件/文件夹路径">
        <el-input v-model="formInline.dot_file" placeholder="请输入文件/文件夹路径" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(formInline)" >提交</el-button>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-upload
      :auto-upload="false"
      ref="upload"
      class="upload-demo"
      :limit="1"
      :on-exceed="handleExceed"
      :on-change="handleFolderSelect"
    >
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
        <br/>
      </template>

      <template #tip>
        <div class="el-upload__tip text-red">
          limit 1 file, new file will cover the old file
        </div>
        <div class="el-upload__tip">
          已选文件：
        </div>
      </template>
    </el-upload>
    <div v-if="ShowtheTable">
      <el-divider></el-divider>
      <h1 style="margin-bottom: 5px">结果如下：</h1>
      <el-descriptions direction="vertical" border column="3">
        <el-descriptions-item :rowspan="2" label="filename">{{ tableData.filename }}</el-descriptions-item>
        <el-descriptions-item label="nodes">{{ tableData.nodes }}</el-descriptions-item>
        <el-descriptions-item label="edges">{{ tableData.edges }}</el-descriptions-item>
        <el-descriptions-item label="connected_components">{{ tableData.connected_components }}</el-descriptions-item>
        <el-descriptions-item label="cyclomatic_complexity">{{ tableData.cyclomatic_complexity }}</el-descriptions-item>
      </el-descriptions>

    </div>



  </FunctionModel>
</template>

<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>

