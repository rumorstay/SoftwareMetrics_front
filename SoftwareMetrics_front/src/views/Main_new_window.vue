<script setup lang="ts">
// import FunctionModel from '@/components/FunctionModel.vue'
import {onMounted, onUnmounted, ref} from 'vue';
import {useRouter} from 'vue-router'
import {DArrowLeft} from "@element-plus/icons-vue";


let FunctionName = ref('')
const box = ref<HTMLElement | null>(null);

// let screenWidth = document.body.clientWidth;
let isCollapse = ref(false)
let collapseBtnClick = ref(false)

const router = useRouter()

interface Pages {
  PageName: string;
  PageTitle: string;
  PageIcon: string;
}

let btn_icon = ref('DArrowLeft')
const collapseStatus = () => {
  collapseBtnClick.value = isCollapse.value;
  isCollapse.value = !isCollapse.value;
  btn_icon.value = isCollapse.value ? 'DArrowRight' : 'DArrowLeft';
}

const collapseOpen = () => {
  if (collapseBtnClick.value) return;
  isCollapse.value = false;
}

const collapseClose = () => {
  if (collapseBtnClick.value) return;
  isCollapse.value = true;
}

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

// 局部组件刷新
const isRouterAlive = ref(true);
let current_Page = ref('');
let Pages_List : Pages[] = [
  {
    PageName: 'Home',
    PageTitle: '首页',
    PageIcon: 'House'
  },
  {
    PageName: 'Function',
    PageTitle: '功能点度量',
    PageIcon: 'Finished'
  },
  {
    PageName: 'UseCase',
    PageTitle: '用例点度量',
    PageIcon: 'MessageBox'
  },
  {
    PageName: 'Cyclo',
    PageTitle: '圈复杂度度量',
    PageIcon: 'Odometer'
  },
  {
    PageName: 'oock',
    PageTitle: '面向对象的CK度量',
    PageIcon: 'PieChart'
  },
  {
    PageName: 'oolk',
    PageTitle: '面向对象的LK度量',
    PageIcon: 'DataAnalysis'
  },
  {
    PageName: 'Loc',
    PageTitle: '代码行度量',
    PageIcon: 'Tickets'
  }
];


const asideWidth = ref<number>(300); // 初始宽度
let isResizing = false;
let startX = 0;
let startWidth = 0;

const startResizing = (event: MouseEvent) => {
  isResizing = true;
  startX = event.clientX;
  startWidth = asideWidth.value;

  document.addEventListener('mousemove', resizeAside);
  document.addEventListener('mouseup', stopResizing);
};

const resizeAside = (event: MouseEvent) => {
  if (isResizing) {
    const newWidth = startWidth + (event.clientX - startX);
    asideWidth.value = newWidth > 100 ? newWidth : 100; // 设置最小宽度为 100px
    isCollapse.value = newWidth <= 200;
  }
};

const stopResizing = () => {
  isResizing = false;
  document.removeEventListener('mousemove', resizeAside);
  document.removeEventListener('mouseup', stopResizing);
};

onMounted(() => {
  document.addEventListener('mouseup', stopResizing);
});

onUnmounted(() => {
  document.removeEventListener('mouseup', stopResizing);
});


const changePage = (PageName:string)=>{
  console.log(current_Page.value)
  current_Page.value = PageName;
  router.push({
    path:"/Main_windows/"+PageName
  })
}



</script>

<template>
  <div class="common-layout">
    <!--    <el-container>-->
    <!--&lt;!&ndash;      <el-aside :class = "{'keep':!isCollapse,'col':isCollapse}">&ndash;&gt;-->
    <!--      <el-aside :style="{ width: `${asideWidth}px` , overflow: 'hidden', maxWidth:'300px'}">-->
    <!--        <div class="Title">-->
    <!--          <span class="title_name"> 软件度量实验 </span>-->
    <!--          <button @click="collapseStatus">-->
    <!--            <i class="el-icon-d-arrow-right"></i>-->
    <!--          </button>-->
    <!--        </div>-->

    <!--        <el-divider :style="{ width: `${asideWidth}px` , margin: '5px'}"></el-divider>-->
    <!--        <el-menu-->
    <!--          default-active="2"-->
    <!--          class="el-menu-vertical-demo"-->
    <!--          :collapse="isCollapse"-->
    <!--          @open="handleOpen"-->
    <!--          @close="handleClose"-->
    <!--        >-->
    <!--          <el-menu-item v-for="(page) in Pages_List" @click = "changePage(page.PageName)">-->
    <!--            <el-icon><component :is="page.PageIcon"></component></el-icon>-->
    <!--            <template #title class = 'PageTitle_font'>{{ page.PageTitle }}</template>-->
    <!--          </el-menu-item>-->
    <!--        </el-menu>-->
    <!--        <div class="resizer" @mousedown="startResizing">-->
    <!--        </div>-->
    <!--      </el-aside>-->
    <!--      <el-container>-->
    <!--        <el-main><RouterView :key = "router.currentRoute.value.fullPath"></RouterView></el-main>-->
    <!--      </el-container>-->
    <!--    </el-container>-->


    <el-container>
      <el-aside
        width="auto"
        height="100vh"
        :style="{overflow: 'hidden'}"
        @mouseenter.native="collapseOpen"
        @mouseleave.native="collapseClose">
        <!--          <el-divider :style="{ width: `${asideWidth}px` , margin: '5px'}"></el-divider>-->
        <el-menu :collapse="isCollapse"
                 default-active="2"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose">
          <el-menu-item>
            <el-button
              @click="collapseStatus"
              link
            >
              <el-icon><component :is="btn_icon"></component></el-icon>
            </el-button>
            <template #title class = 'PageTitle_font'>软件度量实验</template>
          </el-menu-item>
          <el-menu-item v-for="(page) in Pages_List" @click = "changePage(page.PageName)">
            <el-icon><component :is="page.PageIcon"></component></el-icon>
            <template #title class = 'PageTitle_font'>{{ page.PageTitle }}</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
      </el-main>
    </el-container>
  </div>

  <!--  <div class="window-left">-->
  <!--    <div class="go-back">-->
  <!--      <a href="javascript:;">-->
  <!--        <i class="i-icon"></i>-->
  <!--      </a>-->
  <!--    </div>-->
  <!--    <div class="menu-list">-->
  <!--      <ul>-->
  <!--        <li class="first-menu">-->
  <!--          <a href="javascript:;"><i class="i-icon"></i></a>-->
  <!--          <span class="hover-tit">首页</span>-->
  <!--        </li>-->
  <!--        <li class="first-menu">-->
  <!--          <a href="javascript:;"><i class="i-icon"></i></a>-->
  <!--          <span class="hover-tit">菜单1</span>-->
  <!--          <ul>-->
  <!--            <li class="second-menu">-->
  <!--              <a href="javascript:;">子菜单1-1</a>-->
  <!--            </li>-->
  <!--            <li class="second-menu">-->
  <!--              <a href="javascript:;">子菜单1-2</a>-->
  <!--            </li>-->
  <!--            <li class="second-menu">-->
  <!--              <a href="javascript:;">子菜单1-3</a>-->
  <!--            </li>-->
  <!--            <li class="second-menu">-->
  <!--              <a href="javascript:;">子菜单1-4</a>-->
  <!--            </li>-->
  <!--          </ul>-->
  <!--        </li>-->
  <!--        <li class="first-menu">-->
  <!--          <a href="javascript:;"><i class="i-icon"></i></a>-->
  <!--          <span class="hover-tit">菜单2</span>-->
  <!--          <ul>-->
  <!--            <li class="second-menu">-->
  <!--              <a href="javascript:;">子菜单2-1</a>-->
  <!--            </li>-->
  <!--            <li class="second-menu">-->
  <!--              <a href="javascript:;">子菜单2-2</a>-->
  <!--            </li>-->
  <!--            <li class="second-menu">-->
  <!--              <a href="javascript:;">子菜单2-3</a>-->
  <!--            </li>-->
  <!--          </ul>-->
  <!--        </li>-->
  <!--        <li class="first-menu">-->
  <!--          <a href="javascript:;"><i class="i-icon"></i></a>-->
  <!--          <span class="hover-tit">菜单3</span>-->
  <!--          <ul>-->
  <!--            <li class="second-menu">-->
  <!--              <a href="javascript:;">子菜单3-1</a>-->
  <!--            </li>-->
  <!--            <li class="second-menu">-->
  <!--              <a href="javascript:;">子菜单3-2</a>-->
  <!--            </li>-->
  <!--          </ul>-->
  <!--        </li>-->
  <!--      </ul>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<style scoped>
.common-layout{
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
}

.el-aside {
  position: relative;
}

.resizer {
  position: absolute;
  top: 0;
  right: 0;
  width: 5px;
  height: 100%;
  cursor: ew-resize;
  background-color: rgba(0, 0, 0, 0.2);
}

.el-menu-vertical-demo{
  /*width:100% !important;
  min-width:150px;*/
  height: 100vh;
  overflow: hidden !important;
}



/*
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
*/
/*
.el-menu-vertical-demo .el-menu {
  height: 100vh !important;
  overflow: hidden !important;
}

 */

.keep{
  width: 25% !important;
  max-width: 300px !important;
  min-width: 150px !important;
  border-right: 1px solid #e1e1e1;
  overflow: hidden !important;
}
.col{
  width: 120px !important;
  border-right: 1px solid #e1e1e1;
  overflow: hidden !important;

}

.Title{
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  position: relative;
  padding: 10px 0;

}

.title_name{
  font-style: italic;
  font-size: 20px;
  align-content: center;
}
/*
.header-wrap{
  background:#fff repeat-x;
  height:50px;
  width:100%;
  box-shadow:0 1px 2px #999;
}

.navbar{
  height:50px;
  width: 100%;
  position:relative;
}
.navbar a{
  float:left;
  width:auto;
  text-align:center;
  height:50px;
  line-height:50px;
  color:#000;
  padding:0 15px;
  text-decoration:none;
  font-size:15px;
  white-space:nowrap;
  border:0;
  position:relative
}
.navbar a:hover{
  background-color:#999;
  color:#000;
  text-decoration:none;

}
*/


</style>
