<template>
  <svg aria-hidden="true" v-on="$listeners" class="svg-icon">
    <use :xlink:href="`#icon-${iconName}`" />
  </svg>
</template>

<script>
export default {
  name: 'GtSvgIcon',
  props: {
    iconName: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
