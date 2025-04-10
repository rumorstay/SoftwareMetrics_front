<script setup lang="ts">
import FunctionModel from "@/components/FunctionModel.vue";
import {ref} from "vue";
import {
  ElMessage,
  ElMessageBox,
  genFileId,
  UploadProps,
  UploadRawFile,
  UploadUserFile,
  UploadInstance
} from "element-plus";
import { getOO_CK, getOO_CK_file} from "@/api/all_api";

let Page_name = "面向对象的CK度量";


const fileList = ref<UploadUserFile[]>([]);
const ShowtheTable = ref(false);

const fileData:UploadUserFile[]=([
  {
    name: 'B.java',
    url: "H:\\Code\\软件度量实验\\new1\\Experiment4SoftwareMetrics\\Backend\\test_case\\java\\src\\B.java"
  },
  {
    name: 'C.java',
    url: "H:\\Code\\软件度量实验\\new1\\Experiment4SoftwareMetrics\\Backend\\test_case\\java\\src\\C.java"
  },
  {
    name: 'D.java',
    url: "H:\\Code\\软件度量实验\\new1\\Experiment4SoftwareMetrics\\Backend\\test_case\\java\\src\\D.java"
  },
  {
    name: 'Main.java',
    url: "H:\\Code\\软件度量实验\\new1\\Experiment4SoftwareMetrics\\Backend\\test_case\\java\\src\\Main.java"
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

const tableData =ref<CK[]>([])

interface CK {
  className: string,
  WMC: number,
  RFC: number,
  DIT: number,
  NOC: number,
  LCOM: number,
  CBO: number
}


const handleFolderSelect = async (file)=>{
  console.log(file.name); // 当前选中的文件对象
  if (!file.name) return null; // 如果 name 无效，返回 null
  const file1 = fileData.find(f => f.name === file.name);
  const fileurl = file1 ? file1.url : "H:\\Code\\软件度量实验\\new\\Experiment4SoftwareMetrics\\Backend\\test_case\\java";
  formInline.file_path = fileurl;
  onSubmit1(formInline)
}


import { reactive } from 'vue'

interface RuleForm {
  file_path: string
}

const formInline = reactive<RuleForm>({
  file_path: 'H:\\Code\\软件度量实验\\new\\Experiment4SoftwareMetrics\\Backend\\test_case\\java',
})
const onSubmit = async () => {
  console.log('submit!')
  console.log(fileList)
  await getOO_CK_file(fileList).then((res)=>{

    const data = res.data.data
    console.log(data)
    const tableDataArray = Object.keys(data).map(className => ({
      className: className,
      WMC: data[className].WMC,
      RFC: data[className].RFC,
      DIT: data[className].DIT,
      NOC: data[className].NOC,
      LCOM: data[className].LCOM,
      CBO: data[className].CBO
    }));
    tableData.value = tableDataArray;
    console.log(tableData.value)

  }).catch(error=>{
    console.log(error)
  })
}

const onSubmit1 = async (formInline) => {
  console.log('submit!')
  await getOO_CK(formInline).then((res)=>{
    ShowtheTable.value = true
    tableData.value = []
    const data = res.data.data
    console.log(data)
    const tableDataArray = Object.keys(data).map(className => ({
      className: className,
      WMC: data[className].WMC,
      RFC: data[className].RFC,
      DIT: data[className].DIT,
      NOC: data[className].NOC,
      LCOM: data[className].LCOM,
      CBO: data[className].CBO
    }));
    tableData.value = tableDataArray;
    console.log(tableData.value)
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
        <el-button type="primary" @click="onSubmit1(formInline)" >提交</el-button>
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
      <el-divider ></el-divider>
      <h1 style="margin-bottom: 5px">结果如下：</h1>
      <el-table :data="tableData" style="width: 100%" height="250">
        <el-table-column prop="className" label="文件名" />
        <el-table-column prop="WMC" label="WMC" />
        <el-table-column prop="RFC" label="RFC" />
        <el-table-column prop="DIT" label="DIT" />
        <el-table-column prop="NOC" label="NOC" />
        <el-table-column prop="LCOM" label="LCOM" />
        <el-table-column prop="CBO" label="CBO" />
      </el-table>
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
