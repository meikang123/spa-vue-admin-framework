<script>
let resizeTimeOut = null;

export default {
  data() {
    return {
      searchData: {

      },
      resultData: {
        list: []
      },
      pagination: {
        current: 0,
        size: 20,
        total: 0
      },
      tableHeight: 0,
      reqLoading: false,
      reqLoadingText: ''
    };
  },

  created() {
    // 业务代码添加 SearchService 到vm 实例
  },
  methods: {

    search(pagination) {
      const { SearchService } = this;
      this.reqLoading = true;
      const paginationParams = pagination || this.pagination;
      const { current: page, size } = paginationParams;
      const params = {
        ...this.searchData,
        page: page + 1,
        page_size: size
      };

      SearchService.getList(params).then(resource => {
        const { data: { data, page: server_page, page_size, total } } = resource;
        if (data && data instanceof Array) {
          this.resultData.list = data.map((record, index) => ({
            tableIndex: index + 1,
            ...record
          }));
          if (server_page) {
            this.pagination = {
              current: server_page - 1,
              size: page_size,
              total
            };
          }
        }
      }, () => {

      }).finally(() => {
        this.reqLoading = false;
      });
    },

    changePage(nextCurrent) {
      this.pagination.current = nextCurrent;
      this.search(this.pagination);
    },

    changePageSize(nextSize) {
      this.pagination.size = nextSize;
      this.search(this.pagination);
    },

    setTableHeight() {
      const el = this.$refs.tablePage.$el.querySelector('.search-result');
      const { height } = el.getBoundingClientRect();
      this.tableHeight = height - 65;
    },

    documentResizeHandler() {
      clearTimeout(resizeTimeOut);
      resizeTimeOut = setTimeout(() => {
        this.setTableHeight();
      }, 100);
    }


  },
  mounted() {
    this.search();
    this.$nextTick(() => {
      this.setTableHeight();
    });

    window.addEventListener('resize', this.documentResizeHandler);
  },

  destroyed() {
    window.removeEventListener('resize', this.documentResizeHandler);
  }
};
</script>
