<style lang="scss" scoped>
  .project-box {
    display: flex; flex-wrap: wrap; max-width: 224px; margin-bottom: -15px;
    .title {
      width: 100%; margin-bottom: 15px;
    }
    .logo {
      display: block; width: 40px; margin: 0 8px 15px 8px; cursor: pointer; transition: all .5s ease; background: #666; border-radius: 8px; overflow: hidden;
      &:hover {
        transform: scale(1.3); opacity: 0.5;
      }
    }
  }
</style>

<template>
  <el-popover placement="bottom-end" trigger="hover" v-if="project.length">
    <gt-svg-icon icon-name="component" slot="reference" />
    <div class="project-box">
      <!--<div class="title">项目助手</div>-->
      <a target="_blank" v-for="item in project" :key="item.url" :href="item.url" :title="item.title">
        <img class="logo" :src="`${item.url}/static/logo.png`">
      </a>
    </div>
  </el-popover>
</template>

<script>
import projectData from '@framework/config/project';
import Settings from '@/config/settings';

export default {
  computed: {
    project() {
      const env = process.env.NODE_ENV;
      const { showHelper = false, project } = Settings[env] || {};
      if (!showHelper) return [];

      if (project) return project;

      return projectData[env] || [];
    }
  }
};
</script>
