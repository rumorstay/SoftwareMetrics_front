<script setup lang="ts">
import {ref, watch} from "vue";
import {
  ElMessage,
  ElMessageBox,
  genFileId, UploadInstance,
  UploadProps,
  UploadRawFile,
  UploadUserFile
} from "element-plus";
import FunctionModel from "@/components/FunctionModel.vue";
import { getOO_LK} from "@/api/all_api";

let Page_name = "面向对象的LK度量"

let loading = ref(false)

interface OLK{
  className: string,
  NOA: number,
  NOO: number,
  SI: string,
}

const CS = ref(0)
const ShowtheTable = ref(false);
const tableData = ref<OLK[]>([])



const fileData:UploadUserFile[]=([
  {
    name: 'ClassDiagram1.xml',
    url: "H:\\Code\\软件度量实验\\new\\Experiment4SoftwareMetrics\\Backend\\test_case\\ClassDiagram1.xml"
  },
  {
    name:'ClassDiagram2.xml',
    url: "H:\\Code\\软件度量实验\\new\\Experiment4SoftwareMetrics\\Backend\\test_case\\ClassDiagram2.xml"
  }
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
  const fileurl = file1 ? file1.url : "H:\\Code\\软件度量实验\\new\\Experiment4SoftwareMetrics\\Backend\\test_case\\ClassDiagram2.xml";
  formInline.file_path = fileurl;
  onSubmit(formInline)
}

import { reactive } from 'vue'

interface RuleForm {
  file_path: string
}
const formInline = reactive<RuleForm>({
  file_path: 'H:\\Code\\软件度量实验\\new\\Experiment4SoftwareMetrics\\Backend\\test_case\\ClassDiagram1.xml',
})

const onSubmit = async (formInline) => {
  console.log('submit!')
  console.log(formInline.file_path)
  loading.value = true
  await getOO_LK(formInline).then((res)=>{
    tableData.value = []
    ShowtheTable.value = true
    console.log(res);
    CS.value = res.data.CS
    const NOAdata = res.data.NOA
    const NOOdata = res.data.NOO
    const SIdata = res.data.SI
    console.log(NOAdata)
    const classname = Object.keys(NOAdata);

    const NOAarray = Object.keys(NOAdata).map(className => ({
      NOA: NOAdata[className],
    }));
    const NOOarray = Object.keys(NOOdata).map(className => ({
      NOO: NOOdata[className],
    }));
    const SIarray = Object.keys(SIdata).map(className => ({
      SI: SIdata[className],
    }));
    for(let name of classname){
      let olk :OLK={
        className: name,
        NOA: NOAarray[classname.indexOf(name)].NOA,
        NOO: NOOarray[classname.indexOf(name)].NOO,
        SI: SIarray[classname.indexOf(name)].SI,
      }
      tableData.value.push(olk)
      loading.value = false
    }
      console.log(tableData)

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
      <el-divider ></el-divider>
      <h1 style="margin-bottom: 5px">结果如下：</h1>
      <el-descriptions  border style="max-width: 200px; margin-bottom: 10px">
        <el-descriptions-item label="CS">{{ CS}}</el-descriptions-item>
      </el-descriptions>
      <el-table :data="tableData" v-loading="loading" style="width: 100%"  height="250">
        <el-table-column prop="className" label="类名" />
        <el-table-column prop="NOA" label="NOA" />
        <el-table-column prop="NOO" label="NOO" />
        <el-table-column prop="SI" label="SI" />
      </el-table>
    </div>

  </FunctionModel>
</template>

<style>

</style>


