<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue';
import {useRouter} from 'vue-router'

let isCollapse = ref(false)
let collapseBtnClick = ref(false)

const router = useRouter()

interface Pages {
  id: string;
  PageName: string;
  PageTitle: string;
  PageIcon: string;
}

let btn_icon = ref('DArrowLeft')
const collapseStatus = () => {
  collapseBtnClick.value =!collapseBtnClick.value;
  isCollapse.value = !!collapseBtnClick.value;
  btn_icon.value = collapseBtnClick.value ? 'DArrowRight' : 'DArrowLeft';
  console.log(isCollapse.value)
}

const collapseOpen = () => {
  if (!collapseBtnClick.value) return;
  isCollapse.value = false;
}

const collapseClose = () => {
  if (!collapseBtnClick.value) return;
  isCollapse.value = true;
}

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

let current_Page = ref("Home");
let Pages_List : Pages[] = [
  {
    id: "1",
    PageName: 'Home',
    PageTitle: '首页',
    PageIcon: 'House'
  },
  {
    id: "2",
    PageName: 'Function',
    PageTitle: '功能点度量',
    PageIcon: 'Finished'
  },
  {
    id: "3",
    PageName: 'UseCase',
    PageTitle: '用例点度量',
    PageIcon: 'MessageBox'
  },
  {
    id: "4",
    PageName: 'Cyclo',
    PageTitle: '圈复杂度度量',
    PageIcon: 'Odometer'
  },
  {
    id: "5",
    PageName: 'oock',
    PageTitle: '面向对象的CK度量',
    PageIcon: 'PieChart'
  },
  {
    id: "6",
    PageName: 'oolk',
    PageTitle: '面向对象的LK度量',
    PageIcon: 'DataAnalysis'
  },
  {
    id: "7",
    PageName: 'oolk_new',
    PageTitle: '加了大模型的LK度量',
    PageIcon: 'DataLine'
  },
  {
    id: "8",
    PageName: 'Loc',
    PageTitle: '代码行度量',
    PageIcon: 'Tickets'
  }
];

const changePage = (index)=>{
  console.log(current_Page.value)
  current_Page.value = index;
  router.push({
    path:"/Main_windows/"+index
  })
}



</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside
        width="auto"
        height="100vh"
        :style="{overflow: 'hidden'}"
        @mouseenter.native="collapseOpen"
        @mouseleave.native="collapseClose">
        <el-menu :collapse="isCollapse"
                 class="el-menu-vertical-demo"
                 :default-active="current_Page"
                 @select="changePage"
                 @open="handleOpen"
                 @close="handleClose">
          <el-menu-item @click="collapseStatus()">
              <el-icon><component :is="btn_icon"></component></el-icon>
            <template #title class = 'PageTitle_font'>软件度量实验</template>
          </el-menu-item>
          <el-menu-item v-for="(page) in Pages_List" :index = "page.PageName" >
            <el-icon><component :is="page.PageIcon"></component></el-icon>
            <span class = 'PageTitle_font'>{{ page.PageTitle }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main><RouterView :key = "router.currentRoute.value.fullPath"></RouterView></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

.common-layout{
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
}

.el-menu-vertical-demo{
  min-width: 63px!important;
  height: 100vh;
  overflow: hidden !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 300px;
}

/* 菜单项字体和图标 */
.el-menu-vertical-demo .el-menu-item {
  font-weight: bold;
  font-size: 25px;
}

.el-menu-vertical-demo .el-icon {
  font-size: 40px !important;
  margin-right: 10px;
}

.PageTitle_font {
  margin-left: 10px;
  font-size: 20px;
}

</style>
