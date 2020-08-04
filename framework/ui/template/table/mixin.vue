<script>
let resizeTimeOut = null;

export default {
  provide() {
    return {
      tableTplMIXIN: this
    };
  },
  data() {
    return {
      searchData: {

      },
      resultData: {
        list: []
      },
      pagination: {
        current: 1,
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
        page,
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
              current: server_page,
              size: page_size,
              total
            };
          }
          if (this.searchSuccessHandler) {
            this.searchSuccessHandler();
          }
        }
      }, () => {

      }).finally(() => {
        this.reqLoading = false;
      });
    },

    reset() {
      this.searchData = {};
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
      // tableT
      const el = this.$el.querySelector('.gt-table-template__search-result');
      if (el) {
        const { height } = el.getBoundingClientRect();
        if (this.pagination) {
          this.tableHeight = height - 75;
        } else {
          this.tableHeight = height - 20;
        }
      }
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
  },

  activated() {
    this.search();
  },

  watch: {
    searchData: {
      handler() {
        if (this.pagination) {
          this.pagination.current = 1;
        }
        this.search();
      },
      deep: true
    }
  }

};
</script>
