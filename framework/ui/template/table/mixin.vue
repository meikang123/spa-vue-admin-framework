<script>
import { debounce } from '@framework/utils/utils';

let resizeTimeOut = null;

export default {
  provide() {
    return {
      tableTplMIXIN: this
    };
  },
  data() {
    return {
      searchFun: null,
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
    this.searchFun = debounce(this.search, 500);
  },

  methods: {

    search(pagination) {
      const { SearchService } = this;
      if (!SearchService) return;
      this.reqLoading = true;
      const paginationParams = pagination || this.pagination;
      let params = {
        ...this.searchData
      };

      //
      if (paginationParams) {
        const { current: page, size } = paginationParams;
        params = {
          ...params,
          page,
          page_size: size
        };
      }


      SearchService.getList(params).then(resource => {
        const { data: { data, page: server_page, page_size, total } } = resource;
        if (data && data instanceof Array) {
          this.resultData.list = data.map((record, index) => ({
            tableIndex: index + 1,
            ...record
          }));
          // 如果预置 pagination 为 false/null pagination将做为无pagination table的标识
          if (server_page && this.pagination) {
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
    this.searchFun();
    this.$nextTick(() => {
      this.setTableHeight();
    });
    window.addEventListener('resize', this.documentResizeHandler);
  },

  destroyed() {
    window.removeEventListener('resize', this.documentResizeHandler);
  },

  activated() {
    this.searchFun();
  },

  watch: {
    searchData: {
      handler() {
        if (this.pagination) {
          this.pagination.current = 1;
        }
        this.searchFun();
      },
      deep: true
    }
  }

};
</script>
