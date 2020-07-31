<template>
  <div class="markdown-body" v-html="content" />
</template>
<script>
import { Browser } from '@framework/utils';
import { PUBLIC_STATIC_THIRDPARTY_PATH } from '@framework/config/consts';

const { loadResources } = Browser;
const baseUrl = `${PUBLIC_STATIC_THIRDPARTY_PATH}/markdown`;

loadResources(`${baseUrl}/markdown/github-markdown.min.css`);
loadResources(`${baseUrl}/highlightjs/styles/github.min.css`);

loadResources(`${baseUrl}/highlightjs/highlight.min.js`, () => {
  document.querySelectorAll('pre code').forEach(block => {
    window.hljs.highlightBlock(block);
  });
});

export default {
  name: 'gt-markdown-display',
  props: {
    content: {
      type: String,
      default: '--'
    }
  }
};

</script>
<style>
</style>
