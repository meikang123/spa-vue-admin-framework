<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  render(createElement, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    if (icon) {
      const svgIcon = createElement('svg-icon', {
        attrs: {
          'icon-class': icon,
        },
      });
      vnodes.push(svgIcon);
    }

    if (title) {
      const itemTitle = createElement('span', {
        slot: 'title',
      }, title);

      vnodes.push(itemTitle);
    }

    return vnodes;
  },
};
</script>
