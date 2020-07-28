import Vue from 'vue';

Vue.directive('giant-auth', {
  inserted(el, binding) {
    const { expression } = binding;
    const { authorizationCodes } = this.$store.state.user;
    if (authorizationCodes.includes(expression)) {
      el.remove();
    }
  }
});
