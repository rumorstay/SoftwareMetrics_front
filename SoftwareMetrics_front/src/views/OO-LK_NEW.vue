<script setup lang="ts">
import {ref, watch} from "vue";
import {  ElMessage,
  ElMessageBox,
  genFileId, UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadUserFile} from "element-plus";
import FunctionModel from "@/components/FunctionModel.vue";
import { getOO_LK_new} from "@/api/all_api";

let Page_name = "加入了MLLM的LK度量"

let loading = ref(false)

const fileData:UploadUserFile[]=([
  {
    name: 'Class1.png',
    url: "D:\\study\\软件度量\\实验\\Experiment4SoftwareMetrics\\Backend\\test_case\\Class1.png"
  },
])

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  console.log(file.name)
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const handleFolderSelect = async (file)=>{
  console.log(file.name); // 当前选中的文件对象
  if (!file.name) return null; // 如果 name 无效，返回 null
  const file1 = fileData.find(f => f.name === file.name);
  const fileurl = file1 ? file1.url : "D:\\study\\软件度量\\实验\\Experiment4SoftwareMetrics\\Backend\\test_case\\Class1.png";
  formInline.image_path = fileurl;
  onSubmit(formInline)
}


interface OLK_N{
  className: string,
  AddedMethods: number,
  CS: number,
  InheritedAttributes: number,
  InheritedMethods: number,
  Level: number,
  NOA: number,
  NOO: number,
  OverriddenMethods: number,
  SI: string,
  TotalAttributes: number,
  TotalMethods: number,
}


const ShowtheTable = ref(false);
const tableData = ref<OLK_N[]>([])

import { reactive } from 'vue'

interface RuleForm {
  image_path: string
}
const formInline = reactive<RuleForm>({
  image_path: 'D:\\study\\软件度量\\实验\\Experiment4SoftwareMetrics\\Backend\\test_case\\Class1.png',
})

const onSubmit = async (formInline) => {
  console.log('submit!')
  console.log(formInline.image_path)
  loading.value = true
  await getOO_LK_new(formInline).then((res)=>{
    ShowtheTable.value = true
    loading.value = false
    tableData.value = []
    console.log(res)
    const data = res.data.metrics
    const tableDataArray = Object.keys(data).map(className => ({
      className: className,
      AddedMethods: data[className].AddedMethods,
      CS: data[className].CS,
      InheritedAttributes: data[className].InheritedAttributes,
      InheritedMethods: data[className].InheritedMethods,
      Level: data[className].Level,
      NOA: data[className].NOA,
      NOO: data[className].NOO,
      OverriddenMethods: data[className].OverriddenMethods,
      SI: data[className].SI,
      TotalAttributes: data[className].TotalAttributes,
      TotalMethods: data[className].TotalMethods,
    }));
    tableData.value = tableDataArray;
    console.log(tableData.value)

  }).catch(error=>{
    loading.value = false
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
        <el-input v-model="formInline.image_path" placeholder="请输入文件/文件夹路径" clearable  />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(formInline)" :loading = "loading">提交</el-button>
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
        <el-button type="primary" style="margin-top: 10px" :loading = "loading">选择文件</el-button>
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
      <el-divider ></el-divider>
      <h1 style="margin-bottom: 5px">结果如下：</h1>
      <el-table :data="tableData" style="width: 100%" :v-show="ShowtheTable" height="250">
        <el-table-column prop="className" label="类名" />
        <el-table-column prop="AddedMethods" label="添加方法" />
        <el-table-column prop="CS" label="类规模度量" />
        <el-table-column prop="InheritedAttributes" label="继承属性" />
        <el-table-column prop="InheritedMethods" label="继承方法" />
        <el-table-column prop="Level" label="层数" />
        <el-table-column prop="NOA" label="增加方法数量" />
        <el-table-column prop="NOO" label="方法重写数量" />
        <el-table-column prop="OverriddenMethods" label="方法重载数量" />
        <el-table-column prop="SI" label="特征化指数" />
        <el-table-column prop="TotalAttributes" label="总属性数" />
        <el-table-column prop="TotalMethods" label="总方法数" />
      </el-table>
    </div>

  </FunctionModel>
</template>

<style>

</style>


