<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <slot />
      <template v-if="device!=='mobile'">
        <ProjectView class="right-menu-item hover-effect" title="项目助手" />
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
        <!--
        <el-tooltip content="全局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
        -->
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img src="@/assets/img/avatar.jpg" class="user-avatar"> -->
          <span class="user-name">{{ userInfo.real_name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item disabled style="color:#606266">{{ userInfo.real_name }}</el-dropdown-item> -->
          <slot name="dropdown-items">
            <router-link to="/">
              <el-dropdown-item>控制面板</el-dropdown-item>
            </router-link>
          </slot>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退 出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { EventBus } from '@framework/utils';
import { AppEventTypeEnum } from '@framework/enums';
import Breadcrumb from './Breadcrumb';
import Hamburger from './Hamburger';
import Screenfull from './Screenfull';
import ProjectView from './ProjectView';

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    ProjectView
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'sidebar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    },
    async logout() {
      EventBus.$emit(AppEventTypeEnum.LOGIN_OUT);
    }
  }
};
</script>

<style lang="scss" scoped>
    .navbar {
        height: 50px;
        overflow: hidden;
        position: relative;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

        .hamburger-container {
            line-height: 46px;
            height: 100%;
            float: left;
            cursor: pointer;
            transition: background .3s;
            -webkit-tap-highlight-color: transparent;

            &:hover {
                background: rgba(0, 0, 0, .025)
            }
        }

        .breadcrumb-container {
            float: left;
        }

        .errLog-container {
            display: inline-block;
            vertical-align: top;
        }

        .right-menu {
            float: right;
            height: 100%;
            line-height: 50px;

            &:focus {
                outline: none;
            }

            .right-menu-item {
                display: inline-block;
                padding: 0 8px;
                height: 100%;
                font-size: 14px;
                color: #5a5e66;
                vertical-align: text-bottom;

                &.hover-effect {
                    cursor: pointer;
                    transition: background .3s;

                    &:hover {
                        background: rgba(0, 0, 0, .025)
                    }
                }
            }

            .avatar-container {
                margin-right: 30px;
                .avatar-wrapper {
                  position: relative;
                  .user-name{
                    font-size: 14px;
                  }
                  .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                  }
                  .el-icon-caret-bottom {
                      cursor: pointer;
                      position: absolute;
                      right: -15px;
                      top: 20px;
                      font-size: 12px;
                  }
                }
            }
        }
    }
</style>
