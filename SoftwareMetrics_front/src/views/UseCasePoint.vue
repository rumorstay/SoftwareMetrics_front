<script setup lang="ts">
import FunctionModel from "@/components/FunctionModel.vue";
import {ref, watch , reactive} from "vue";
import {genFileId, UploadUserFile} from 'element-plus'

import {

  FormInstance,
  FormRules, UploadProps,
  UploadInstance, UploadRawFile

} from "element-plus";
import { getUC} from "@/api/all_api";

let Page_name = "用例点度量";

let image_path = ref('D:\\study\\软件度量\\实验\\Experiment4SoftwareMetrics\\Backend\\test_case\\DFD_examples\\DFD1.png')

interface Env_RuleForm {
  image_path: string
  UML_Familiarity:number
  App_develop_ex:number
  O_O_ex: number
  Main_Analyst_Capability: number
  excitation_mechanism: number
  concuStability_of_demandrrency: number
  complex_programming_skills: number
}

const Env_ruleFormRef = ref<FormInstance>()
const Env_ruleForm = reactive<Env_RuleForm>({
  image_path: 'D:\\study\\软件度量\\实验\\Experiment4SoftwareMetrics\\Backend\\test_case\\DFD_examples\\DFD1.png',
  UML_Familiarity:0,
  App_develop_ex:1,
  O_O_ex: 2,
  Main_Analyst_Capability: 1,
  excitation_mechanism: 1,
  concuStability_of_demandrrency: 3,
  complex_programming_skills: 1,
})

interface Skill_RuleForm {
  Distributed_System: number
  Response_performance: number
  End_user_efficiency: number
  Complex_internal_processing: number
  Code_must_be_reused: number
  installability: number
  Ease_of_use: number
  portability: number
  Modifiability: number
  concurrency: number
  safety: number
  Third_interface: number
}

const Skill_ruleForm = reactive<Skill_RuleForm>({
  Distributed_System: 1,
  Response_performance: 4,
  End_user_efficiency: 5,
  Complex_internal_processing: 3,
  Code_must_be_reused: 2,
  installability: 1,
  Ease_of_use: 3,
  portability: 2,
  Modifiability: 5,
  concurrency: 1,
  safety: 2,
  Third_interface: 1

})

let env_param = ref(1.4
  - Env_ruleForm.UML_Familiarity * 0.045
  - Env_ruleForm.App_develop_ex * 0.015
  - Env_ruleForm.O_O_ex * 0.03
  - Env_ruleForm.Main_Analyst_Capability * 0.015
  - Env_ruleForm.excitation_mechanism * 0.03
  + Env_ruleForm.concuStability_of_demandrrency * 0.03
  + Env_ruleForm.complex_programming_skills* 0.03
)
env_param.value = parseFloat(env_param.value.toFixed(4));
let skill_param = ref(0.6 +
  Skill_ruleForm.Distributed_System * 0.02 +
  Skill_ruleForm.Response_performance * 0.01 +
  Skill_ruleForm.End_user_efficiency * 0.01 +
  Skill_ruleForm.Complex_internal_processing * 0.01 +
  Skill_ruleForm.Code_must_be_reused * 0.01 +
  Skill_ruleForm.installability * 0.005 +
  Skill_ruleForm.Ease_of_use * 0.005 +
  Skill_ruleForm.portability * 0.02 +
  Skill_ruleForm.Modifiability * 0.01 +
  Skill_ruleForm.concurrency * 0.01 +
  Skill_ruleForm.safety * 0.01 +
  Skill_ruleForm.Third_interface * 0.1
)
skill_param.value = parseFloat(skill_param.value.toFixed(4));
watch(Env_ruleForm,(newValue) => {
    env_param.value = 1.4
      - newValue.UML_Familiarity * 0.045
      - newValue.App_develop_ex * 0.015
      - newValue.O_O_ex * 0.03
      - newValue.Main_Analyst_Capability * 0.015
      - newValue.excitation_mechanism * 0.03
      + newValue.concuStability_of_demandrrency * 0.03
      + newValue.complex_programming_skills* 0.03;
    env_param.value = parseFloat(env_param.value.toFixed(4));
  console.log(env_param.value, skill_param.value)
  },
  { immediate: true } // 立即执行一次，确保初始值正确
);

watch(Skill_ruleForm,(newValue) => {
    skill_param.value =  0.6 +
      newValue.Distributed_System * 0.02 +
      newValue.Response_performance * 0.01 +
      newValue.End_user_efficiency * 0.01 +
      newValue.Complex_internal_processing * 0.01 +
      newValue.Code_must_be_reused * 0.01 +
      newValue.installability * 0.005 +
      newValue.Ease_of_use * 0.005 +
      newValue.portability * 0.02 +
      newValue.Modifiability * 0.01 +
      newValue.concurrency * 0.01 +
      newValue.safety * 0.01 +
      newValue.Third_interface * 0.1;
    skill_param.value = parseFloat(skill_param.value.toFixed(4));
    console.log(env_param.value, skill_param.value)
  },
  { immediate: true } // 立即执行一次，确保初始值正确
);
const rules = reactive<FormRules<Env_RuleForm>>({
  image_path: [
    { required: true, message: '请输入图片文件路径', trigger: 'input' },
  ],
})

let g_UCP = ref(0)


const onSubmit = async () => {
  console.log('submit!')

  const formData = new FormData()
  formData.append('use_case', Env_ruleForm.image_path)
  formData.append('env_factors', env_param.value)
  formData.append('tech_factors', skill_param.value)
  console.log(formData.get('use_case'))
  console.log(formData.get('env_factors'))
  console.log(formData.get('tech_factors'))

  await getUC(formData).then((res)=>{
    console.log(res)
    g_UCP.value = res.data.UCP;
    console.log(g_UCP.value)
  }).catch(error=>{
    g_UCP.value = 3.5
    console.log(g_UCP.value)
    console.log(error)
  })
}

let env_param_change = ref(false)
let env_param_change_big = ref(true)

let skill_param_change = ref(false)
let skill_param_change_big = ref(true)

let work_size_change = ref(true)
let work_size_change_big = ref(true)

let env_param_before = ref(0)
let skill_param_before = ref(0)
let work_size_before = ref(0)

let per_case_per_person_hour = ref(0)
let per_mouth_per_person_hour = ref(0)
let work_size = ref(0)

watch(
  [
    () => per_case_per_person_hour.value,
    () => per_mouth_per_person_hour.value
  ],
  ([newValue1, newValue2], [per_case_per_person_hour, per_mouth_per_person_hour]) => {
    console.log(newValue1, newValue2)
    work_size_before.value = work_size.value
    work_size.value = newValue1 * newValue2 * g_UCP.value;
    work_size.value = parseFloat(work_size.value.toFixed(5));

    if(work_size_before.value === work_size.value){
      work_size_change.value = false
    }
    else{
      work_size_change.value = true
      work_size_change_big.value = work_size.value > work_size_before.value
    }

  },
  { immediate: true } // 立即执行一次，确保初始值正确
);

let activeStep = ref(0)
const before_step = () => {
  if (activeStep.value-- <=0) activeStep.value = 0
  else if (activeStep.value === 1){
    env_param_before.value = env_param.value
  }
  else if (activeStep.value === 2){
    skill_param_before.value = skill_param.value
    console.log(skill_param_before.value)

    // work_size_before.value = work_size.value
  }
}
const next = () => {
  if (activeStep.value++ > 3) activeStep.value = 3
  if (activeStep.value === 2){
    if(env_param_before.value === 0){
      env_param_before.value = env_param.value
    }
  }
  if (activeStep.value == 3){
    console.log(work_size_before.value)
    if(skill_param_before.value === 0){
      skill_param_before.value = skill_param.value
    }
    if(env_param_before.value === env_param.value){
      env_param_change.value = false
    }
    else{
      env_param_change.value = true
      env_param_change_big.value = env_param.value > env_param_before.value
    }
    if(skill_param_before.value === skill_param.value){
      skill_param_change.value = false
    }
    else{
      skill_param_change.value = true
      skill_param_change_big.value = skill_param.value > skill_param_before.value
    }
    if(work_size_before.value === work_size.value){
      work_size_change.value = false
    }
    else{
      work_size_change.value = true
      work_size_change_big.value = work_size.value > work_size_before.value
    }
    onSubmit()
  }

}

const upload = ref<UploadInstance>()

const fileData:UploadUserFile[]=([
  {
    name: 'DFD1.png',
    url: "D:\\study\\软件度量\\实验\\Experiment4SoftwareMetrics\\Backend\\test_case\\DFD_examples\\DFD1.png"
  },
])


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
  const fileurl = file1 ? file1.url : "D:\\study\\软件度量\\实验\\Experiment4SoftwareMetrics\\Backend\\test_case\\DFD_examples\\DFD1.png";
  image_path.value = fileurl;
}


</script>

<template>
  <FunctionModel :function_name = "Page_name">
    <el-steps size="large" :active="activeStep" align-center finish-status="success">
      <el-step title="选择文件" description="请输入文件路径" />
      <el-step title="环境因素设置" description="请设置环境因素" />
      <el-step title="技术因素设置" description="请设置技术因素" />
      <el-step title="结果" description="结果如下" />
    </el-steps>
    <el-divider></el-divider>

    <div v-if = "activeStep === 0">
      <el-form
        ref="Env_ruleFormRef"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        size="default"
        status-icon
      >
        <h1 style="margin-bottom: 10px">请输入文件路径</h1>
        <el-form-item label="图片路径" prop="image_path">
          <el-input v-model="image_path"  placeholder="请输入文件/文件夹路径" clearable/>
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
        </el-form-item>
        <el-form-item style="margin-top: 10px">
          <el-button type="primary" @click="next">
            下一步
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-if = "activeStep === 1">
      <el-form
        ref="Env_ruleFormRef"
        :model="Env_ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        size="default"
        status-icon
      >
        <h1 style="margin-bottom: 10px" >请设置环境因素</h1>

        <el-form-item label="熟悉UML程度" prop="UML_Familiarity">
          <el-slider v-model="Env_ruleForm.UML_Familiarity"  show-stops :max="5"/>
        </el-form-item>
        <el-form-item label="应用程序开发经验" prop="App_develop_ex">
          <el-slider v-model="Env_ruleForm.App_develop_ex"  show-stops :max="5"/>
        </el-form-item>
        <el-form-item label = "面向对象经验" prop="O_O_ex">
          <el-slider v-model="Env_ruleForm.O_O_ex"  show-stops :max="5"/>
        </el-form-item>
        <el-form-item label="主分析师能力" prop="Main_Analyst_Capability">
          <el-slider v-model="Env_ruleForm.Main_Analyst_Capability"  show-stops :max="5"/>
        </el-form-item>
        <el-form-item label="激励机制" prop="excitation_mechanism">
          <el-slider v-model="Env_ruleForm.excitation_mechanism"  show-stops :max="5"/>
        </el-form-item>
        <el-form-item label="需求稳定度" prop="concuStability_of_demandrrency">
          <el-slider v-model="Env_ruleForm.concuStability_of_demandrrency"  show-stops :max="5"/>
        </el-form-item>
        <el-form-item label="具有复杂程序" prop="complex_programming_skills">
          <el-slider v-model="Env_ruleForm.complex_programming_skills"  show-stops :max="5"/>
        </el-form-item>
        <el-descriptions direction="vertical" border>
          <el-descriptions-item label="环境因素">{{ env_param }}</el-descriptions-item>
        </el-descriptions>
        <el-form-item style="margin-top: 10px">
          <el-button type="primary" @click="before_step">
            上一步
          </el-button>
          <el-button type="primary" @click="next">
            下一步
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-if = "activeStep === 2">
      <el-form
        ref="Env_ruleFormRef"
        :model="Skill_ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        size="default"
        status-icon
      >
        <h1 style="margin-bottom: 10px">设置技术因素</h1>
        <el-form-item label="分布式系统" prop="reusability">
          <el-slider v-model="Skill_ruleForm.Distributed_System"  show-stops :max="5"/>
        </el-form-item>
        <el-form-item label="响应或吞吐量" prop="installation">
          <el-slider v-model="Skill_ruleForm.Response_performance"  show-stops :max="5"/>
        </el-form-item>
        <el-form-item label = "终端用户效率" prop="operation">
          <el-slider v-model="Skill_ruleForm.End_user_efficiency" show-stops :max="5"/>
        </el-form-item>
        <el-form-item label = "复杂内部处理" prop="multiSite">
          <el-slider v-model="Skill_ruleForm.Complex_internal_processing"  show-stops :max="5"/>
        </el-form-item>
        <el-form-item label = "代码必须重用" prop="dataCommunication">
          <el-slider v-model="Skill_ruleForm.Code_must_be_reused"  show-stops :max="5"/>
        </el-form-item>
        <el-form-item  label = "易安装性" prop="complexAlgorithm">
          <el-slider v-model="Skill_ruleForm.installability"  show-stops :max="5"/>
        </el-form-item>
        <el-form-item  label = "易用性" prop="complexDataStructure">
          <el-slider v-model="Skill_ruleForm.Ease_of_use"  show-stops :max="5"/>
        </el-form-item>
        <el-form-item  label = "可移植性" prop="complexDataStructure">
          <el-slider v-model="Skill_ruleForm.portability"  show-stops :max="5"/>
        </el-form-item>
        <el-form-item  label = "易更改性" prop="complexDataStructure">
          <el-slider v-model="Skill_ruleForm.Modifiability"  show-stops :max="5"/>
        </el-form-item>
        <el-form-item  label = "并发性" prop="complexDataStructure">
          <el-slider v-model="Skill_ruleForm.concurrency"  show-stops :max="5"/>
        </el-form-item>
        <el-form-item  label = "安全性" prop="complexDataStructure">
          <el-slider v-model="Skill_ruleForm.safety"  show-stops :max="5"/>
        </el-form-item>
        <el-form-item  label = "第三方接口" prop="complexDataStructure">
          <el-slider v-model="Skill_ruleForm.Third_interface"  show-stops :max="5"/>
        </el-form-item>
        <el-descriptions direction="vertical" border>
          <el-descriptions-item label="技术因素">{{ skill_param }}</el-descriptions-item>
        </el-descriptions>
        <el-form-item style="margin-top: 10px">
          <el-button type="primary" @click="before_step">
            上一步
          </el-button>
          <el-button type="primary" @click="next">
            下一步
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-if = "activeStep === 3">
      <h1 style="margin-bottom: 5px">结果如下：</h1>
      <div class="tips_outside">
        <span class="tips">UCP = UUCP * TCF * EF</span>
      </div>
      <el-descriptions border style="max-width: 200px">
        <el-descriptions-item label="用例点">{{ g_UCP }}</el-descriptions-item>
      </el-descriptions>
      <el-input
        v-model="per_case_per_person_hour"
        style="max-width: 200px; margin:10px 0"
        placeholder="请输入完成一个用例需要的人时"
        type="number"
        clearable
        min="0"
      >
        <template #append>人时</template>
      </el-input>
      <br/>
      <el-input
        v-model="per_mouth_per_person_hour"
        style="max-width: 200px; margin:10px 0"
        placeholder="请输入一个人月对应的人时"
        type="number"
        clearable
        min="0"
      >
        <template #append>人时</template>
      </el-input>

<!--      <el-descriptions border style="max-width: 200px">-->
<!--        <el-descriptions-item label="预计工作量">{{ work_size }}</el-descriptions-item>-->
<!--      </el-descriptions>-->

      <el-row :gutter="16">
        <el-col :span="8">
          <div class="statistic-card">
            <el-statistic precision = "3"  :value="env_param">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  环境因素
                  <el-tooltip
                    effect="dark"
                    content="环境因素对这个项目的影响程度"
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
              <div class="footer-item" v-if="env_param_change">
                <span>相较调整前变化了</span>
                <span class="green" v-if="env_param_change_big && env_param_change">
                  {{ (((env_param-env_param_before) / env_param_before)*100).toFixed(2) }}%
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
                <span class="red" v-if="!env_param_change_big && env_param_change">
                  {{ (((env_param_before - env_param) / env_param_before)*100).toFixed(2) }}%
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
            <el-statistic precision = "3" :value="skill_param">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  技术因素
                  <el-tooltip
                    effect="dark"
                    content="技术因素对这个项目的影响程度"
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
              <div class="footer-item" v-if="skill_param_change">
                <span>相较调整前变化了</span>
                <span class="green" v-if="skill_param_change_big && skill_param_change">
                  {{ (((skill_param-env_param_before) / skill_param_before)*100).toFixed(2) }}%
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
                <span class="red" v-if="!skill_param_change_big && skill_param_change">
                  {{ (((skill_param_before - skill_param) / skill_param_before)*100).toFixed(2) }}%
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
            <el-statistic precision = "2"  :value="work_size">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  预计工作量
                  <el-tooltip
                    effect="dark"
                    content="预计完成需要的工作量"
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
              <div class="footer-item" v-if="work_size_change">
                <span>相较调整前变化了</span>
                <span class="green" v-if="work_size_change_big && work_size_change">
                  {{ (((work_size-work_size_before) / work_size_before)*100).toFixed(2) }}%
                  <el-icon>
                    <CaretTop />
                  </el-icon>
                </span>
                <span class="red" v-if="!work_size_change_big && work_size_change">
                  {{ (((work_size_before - work_size) / work_size_before)*100).toFixed(2) }}%
                  <el-icon>
                    <CaretBottom />
                  </el-icon>
                </span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <div style="margin-top: 10px">
        <el-button type="primary" @click="before_step">
          上一步
        </el-button>
      </div>

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

.tips_outside{
  margin: 10px 0;
  display: flex;
}
.tips{
  margin: 5px 10px 5px 0;
  width: 300px;
  border-left: #343333 3px solid;
  background: #b9b9b9;
  align-items: center;
  font-size: 25px;
  font-style: italic;
}
</style>
