<template>
  <div>
    <slot v-if="hasAuth()"></slot>
    <template v-else>
      <slot v-if="hasCustomNoAuthComponent" name="noauth"></slot>
      <div v-else>
        <!--TODO 默认没有权限组件 -->
        没有权限
      </div>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'mtl-auth',
  data() {
    return {
      hasCustomNoAuthComponent: this.$slots.noauth,
    };
  },
  props: {
    code: {
      type: Array || String,
    },
  },

  created() {

  },

  mounted() {
    console.log(this.$slots);
  },

  methods: {
    hasAuth() {
      return this.codes.includes(this.code);
    },
  },

  computed: {
    ...mapGetters({
      codes: 'USER_GET_AUTHORIZATION_CODES',
    }),
  },
};
</script>
