<template>
  <div>
    <slot v-if="hasAuth()" />
    <template v-else>
      <slot v-if="hasCustomNoAuthComponent" name="noauth" />
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
  name: 'giant-auth',
  data() {
    return {
      hasCustomNoAuthComponent: this.$slots.noauth
    };
  },
  props: {
    code: {
      type: [Array, String],
      required: true
    }
  },

  created() {

  },

  mounted() {
    console.log(this.$slots);
  },

  methods: {
    hasAuth() {
      return this.codes.includes(this.code);
    }
  },

  computed: {
    ...mapGetters({
      codes: 'USER_GET_AUTHORIZATION_CODES'
    })
  }
};
</script>
