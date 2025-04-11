<script setup lang="ts">
import FunctionModel from "@/components/FunctionModel.vue";
import {ref, reactive} from "vue";
import {

  FormInstance,
  FormRules, UploadProps, UploadUserFile,

} from "element-plus";
import { getFP} from "@/api/all_api";

let Page_name = "功能点度量";

let loading = ref(false)

const tableData =ref<UC>({ fp: 0, ufc: 0, vaf: 0 })

let fp = ref(0)
let ufc = ref(0)
let vaf = ref(0)

let fp_change = ref(false)
let ufc_change = ref(false)
let vaf_change = ref(false)

let fp_big = ref(false)
let ufc_big = ref(false)
let vaf_big = ref(false)

let fp_before = ref(0.000000)
let ufc_before = ref(0.000000)
let vaf_before = ref(0.000000)

interface RuleForm {
  image_path: string
  ilfComplexity: string
  eifComplexity: string
  eiComplexity: string
  eoComplexity: string
  eqComplexity: string
  reliability: number
  performance: number
  throughput: number
  concurrency: number
  onlineInput: number
  distributed: number
  complexLogic: number
  reusability: number
  installation: number
  operation: number
  multiSite:number
  dataCommunication: number
  complexAlgorithm: number
  complexDataStructure: number

}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  image_path: 'H:\\Code\\软件度量实验\\new1\\Experiment4SoftwareMetrics\\Backend\\uploads\\DFD1.png',
  ilfComplexity: '一般',
  eifComplexity: '简单',
  eiComplexity: '复杂',
  eoComplexity: '复杂',
  eqComplexity: '简单',
  reliability: 2,
  performance: 4,
  throughput: 1,
  concurrency: 2,
  onlineInput: 3,
  distributed: 4,
  complexLogic:5,
  reusability: 3,
  installation: 2,
  operation: 1,
  multiSite: 3,
  dataCommunication: 1,
  complexAlgorithm: 4,
  complexDataStructure: 2

})

const rules = reactive<FormRules<RuleForm>>({
  image_path: [
    { required: true, message: '请输入图片文件路径', trigger: 'input' },
  ],
})

interface UC {
  fp: number,
  ufc: number,
  vaf: number,
}


const onSubmit = async (ruleForm) => {
  loading.value = true
  console.log('submit!')
  console.log(ruleForm)
  fp_before.value = fp.value
  ufc_before.value = ufc.value
  vaf_before.value = vaf.value
  await getFP(ruleForm).then((res)=>{
    loading.value = false
    show_Data.value = true
    console.log(res)
    fp.value = res.data.fp
    ufc.value = res.data.ufc
    vaf.value = res.data.vaf
    if(fp_before.value != 0 ||ufc_before.value!= 0 ||vaf_before.value!= 0){
      fp_change.value = fp.value === fp_before.value
      ufc_change.value = ufc.value === ufc_before.value
      vaf_change.value = vaf.value === vaf_before.value
      fp_big.value = fp.value > fp_before.value
      ufc_big.value = ufc.value > ufc_before.value
      vaf_big.value = vaf.value > vaf_before.value
    }
    else{
      fp_change.value = false
      ufc_change.value = false
      vaf_change.value = false
    }

    tableData.value = {
      fp: res.data.fp,
      ufc: res.data.ufc,
      vaf: res.data.vaf
    };
    console.log(tableData.value)
    show_Data.value = true

  }).catch(error=>{
    loading.value=false
    console.log(error)
  })
}
let show_Data = ref(false)

const fileData:UploadUserFile[]=([
  {
    name: '1.png',
    url: "H:\\Code\\软件度量实验\\new1\\Experiment4SoftwareMetrics\\Backend\\uploads\\1.png"
  },
  {
    name:'DFD1.png',
    url: "H:\\Code\\软件度量实验\\new1\\Experiment4SoftwareMetrics\\Backend\\uploads\\DFD1.png"
  }
])
const handleFolderSelect = async (file)=>{
  console.log(file.name); // 当前选中的文件对象
  if (!file.name) return null; // 如果 name 无效，返回 null
  const file1 = fileData.find(f => f.name === file.name);
  const fileurl = file1 ? file1.url : "H:\\Code\\软件度量实验\\new1\\Experiment4SoftwareMetrics\\Backend\\uploads\\DFD1.png";
  ruleForm.image_path = fileurl;
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
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      width="auto"
      class="demo-ruleForm"
      size="default"
      status-icon
    >
      <el-form-item label="图片文件路径" prop="image_path" >
        <el-input v-model="ruleForm.image_path" />
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
        </el-upload>
      </el-form-item>
      <el-form-item label="内部逻辑文件复杂性" prop="ilfComplexity">
        <el-select v-model="ruleForm.ilfComplexity" placeholder="请选择复杂性">
          <el-option label="简单" value="简单" />
          <el-option label="一般" value="一般" />
          <el-option label="复杂" value="复杂" />
        </el-select>
      </el-form-item>
      <el-form-item label="外部接口文件复杂性" prop="eifComplexity">
        <el-select v-model="ruleForm.eifComplexity" placeholder="请选择复杂性">
          <el-option label="简单" value="简单" />
          <el-option label="一般" value="一般" />
          <el-option label="复杂" value="复杂" />
        </el-select>
      </el-form-item>
      <el-form-item label="外部输入复杂性" prop="eiComplexity">
        <el-select v-model="ruleForm.eiComplexity" placeholder="请选择复杂性">
          <el-option label="简单" value="简单" />
          <el-option label="一般" value="一般" />
          <el-option label="复杂" value="复杂" />
        </el-select>
      </el-form-item>
      <el-form-item label="外部输出复杂性" prop="eoComplexity">
        <el-select v-model="ruleForm.eoComplexity" placeholder="请选择复杂性">
          <el-option label="简单" value="简单" />
          <el-option label="一般" value="一般" />
          <el-option label="复杂" value="复杂" />
        </el-select>
      </el-form-item>
      <el-form-item label="外部查询复杂性" prop="eqComplexity">
        <el-select v-model="ruleForm.eqComplexity" placeholder="请选择复杂性">
          <el-option label="简单" value="简单" />
          <el-option label="一般" value="一般" />
          <el-option label="复杂" value="复杂" />
        </el-select>
      </el-form-item>
      <el-form-item label="可靠性要求" prop="reliability">
        <el-slider v-model="ruleForm.reliability"  show-stops :max="5"/>
      </el-form-item>
      <el-form-item label="高性能要求" prop="performance">
        <el-slider v-model="ruleForm.performance"  show-stops :max="5"/>
      </el-form-item>
      <el-form-item label = "高吞吐量要求" prop="throughput">
        <el-slider v-model="ruleForm.throughput"  show-stops :max="5"/>
      </el-form-item>
      <el-form-item label="高并发要求" prop="concurrency">
        <el-slider v-model="ruleForm.concurrency"  show-stops :max="5"/>
      </el-form-item>
      <el-form-item label="在线数据输入" prop="onlineInput">
        <el-slider v-model="ruleForm.onlineInput"  show-stops :max="5"/>
      </el-form-item>
      <el-form-item label="分布式处理" prop="distributed">
        <el-slider v-model="ruleForm.distributed"  show-stops :max="5"/>
      </el-form-item>
      <el-form-item label="复杂处理逻辑" prop="complexLogic">
        <el-slider v-model="ruleForm.complexLogic"  show-stops :max="5"/>
      </el-form-item>
      <el-form-item label="重用性要求" prop="reusability">
        <el-slider v-model="ruleForm.reusability"  show-stops :max="5"/>
      </el-form-item>
      <el-form-item label="安装要求" prop="installation">
        <el-slider v-model="ruleForm.installation"  show-stops :max="5"/>
      </el-form-item>
      <el-form-item label = "操作要求" prop="operation">
        <el-slider v-model="ruleForm.operation" show-stops :max="5"/>
      </el-form-item>
      <el-form-item label = "多站点运行" prop="multiSite">
        <el-slider v-model="ruleForm.multiSite"  show-stops :max="5"/>
      </el-form-item>
      <el-form-item label = "数据通信要求" prop="dataCommunication">
        <el-slider v-model="ruleForm.dataCommunication"  show-stops :max="5"/>
      </el-form-item>
      <el-form-item  label = "复杂处理算法" prop="complexAlgorithm">
        <el-slider v-model="ruleForm.complexAlgorithm"  show-stops :max="5"/>
      </el-form-item>
      <el-form-item  label = "复杂数据结构" prop="complexDataStructure">
        <el-slider v-model="ruleForm.complexDataStructure"  show-stops :max="5"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(ruleForm)" :loading="loading">
          提交
        </el-button>
      </el-form-item>
    </el-form>
    <div v-if="show_Data">
      <el-divider></el-divider>
      <h1 style="margin-bottom: 5px" >结果如下：</h1>

      <el-row :gutter="16">
        <el-col :span="8">
          <div class="statistic-card">
            <el-statistic precision = "6"  :value="fp.toFixed(6)">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  功能点
                  <el-tooltip
                    effect="dark"
                    content="功能点（function point）的数量"
                    placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item" v-if="fp_change">
                <span>相较调整前变化了</span>
                <span class="green" v-if="fp_big">
                  {{ (((fp-fp_before) / fp_before)*100).toFixed(2) }}%
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
                <span class="red" v-if="!fp_big">
                  {{ (((fp_before - fp) / fp_before)*100).toFixed(2) }}%
                  <el-icon>
                    <CaretBottom />
                  </el-icon>
                </span>
              </div>
            </div>
          </div>

        </el-col>
        <el-col :span="8">
          <div class="statistic-card">
            <el-statistic precision = "6" :value="ufc">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  未调整前的功能点数
                  <el-tooltip
                    effect="dark"
                    content="(Unadjusted Function Counting)"
                    placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item" v-if="ufc_change">
                <span>相较调整前变化了</span>
                <span class="green" v-if="ufc_big">
                  {{ (((ufc-ufc_before) / ufc_before)*100).toFixed(2) }}%
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
                <span class="red" v-if="!ufc_big">
                  {{ (((ufc_before - ufc) / ufc_before)*100).toFixed(2) }}%
                  <el-icon>
                    <CaretBottom />
                  </el-icon>
                </span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="statistic-card">
            <el-statistic precision = "6" :value="vaf">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  复杂度调整系数
                  <el-tooltip
                    effect="dark"
                    content="复杂度调整系数"
                    placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
            <div class="statistic-footer">
              <div class="footer-item" v-if="vaf_change">
                <span>相较调整前变化了</span>
                <span class="green" v-if="vaf_big ">
                  {{ (((vaf-vaf_before) / vaf_before)*100).toFixed(2) }}%
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
                <span class="red" v-if="!vaf_big ">
                  {{ (((vaf_before - vaf) / vaf_before)*100).toFixed(2) }}%
                  <el-icon>
                    <CaretBottom />
                  </el-icon>
                </span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
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
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}

</style>
