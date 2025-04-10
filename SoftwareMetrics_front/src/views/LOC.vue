<script setup lang="ts">
import {ref, watch} from "vue";
import {
  ElMessage,
  ElMessageBox, genFileId,
  UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadUserFile
} from "element-plus";
import FunctionModel from "@/components/FunctionModel.vue";
import {getLOC} from "@/api/all_api";

let Page_name = "代码行度量"

const ShowtheTable = ref(false);
const tableData = ref<loc[]>([])

watch(tableData.value,(newValue)=>{
  ShowtheTable.value = newValue.length > 0;
})

let file_name = ref('')

let file_before = 'H:/Code/软件度量实验/Experiment4SoftwareMetrics/Backend/test_case/exp4'

const fileData:UploadUserFile[]=([
  {
    name: 'APIConnector.java',
    url: "H:/Code/软件度量实验/Experiment4SoftwareMetrics/Backend/test_case/exp4/APIConnector.java"
  },
  {
    name: 'Demo2.java',
    url: "H:/Code/软件度量实验/Experiment4SoftwareMetrics/Backend/test_case/exp4/Demo2.java"
  },
  {
    name:'Demo1.java',
    url: "H:/Code/软件度量实验/Experiment4SoftwareMetrics/Backend/test_case/exp4/Demo1.java"
  }
])

interface loc{
  blank_lines: number,
  code_lines: number,
  comment_lines: number,
  file_name: string,
}

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  console.log(file.name)
  file_name.value = file.name
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const handleFolderSelect = async (file)=>{
  console.log(file.name); // 当前选中的文件对象
  if (!file.name) return null; // 如果 name 无效，返回 null
  file_name.value = file.name
  const file1 = fileData.find(f => f.name === file.name);
  const fileurl = file1 ? file1.url : file_before;
  formInline.file_path = file_before;
  await getLOC(formInline).then((res)=>{
    tableData.value = []
    console.log(res)
    res.data.forEach(cloc=>{
      let loc:loc={
        blank_lines: cloc.blank_lines,
        code_lines: cloc.code_lines,
        comment_lines: cloc.comment_lines,
        file_name: cloc.file_name,
      }
      if (file_name.value == loc.file_name){
        tableData.value.push(loc)
      }
    })
    ShowtheTable.value = true


  }).catch(error=>{
    console.log(error)
  })
}

import { reactive } from 'vue'

interface RuleForm {
  file_path: string
}
const formInline = reactive<RuleForm>({
  file_path: 'H:/Code/软件度量实验/Experiment4SoftwareMetrics/Backend/test_case/exp4',
})

const onSubmit = async (formInline) => {
  console.log('submit!')
  console.log(formInline.file_path)
  await getLOC(formInline).then((res)=>{
    ShowtheTable.value = true
    tableData.value = []
    console.log(res)
    res.data.forEach(cloc=>{
      let loc:loc={
        blank_lines: cloc.blank_lines,
        code_lines: cloc.code_lines,
        comment_lines: cloc.comment_lines,
        file_name: cloc.file_name,
      }
      console.log(loc)
      tableData.value.push(loc)
      console.log(tableData)
    })
  }).catch(error=>{
    console.log(error)
  })
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
        <el-input v-model="formInline.file_path" placeholder="请输入文件/文件夹路径" clearable/>
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
        <el-button type="primary" style="margin-top: 10px">选择文件</el-button>
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
      <el-table :data="tableData" style="width: 100%"  height="250">
        <el-table-column prop="file_name" label="文件名" />
        <el-table-column prop="code_lines" label="代码行数" />
        <el-table-column prop="comment_lines" label="注释行数" />
        <el-table-column prop="blank_lines" label="空白行数" />
      </el-table>
    </div>
  </FunctionModel>
</template>

<style>

</style>

