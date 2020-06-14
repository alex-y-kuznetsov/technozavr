<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a href="#"
        class="pagination__link pagination__link--arrow"
        v-bind:class="{'pagination__link--disabled': page === 1}"
        aria-label="Предыдущая страница"
        v-on:click.prevent="scrollPage(page - 1)">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left" />
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="(pageItem, index) in croppedPagesList" v-bind:key="index">
      <a href="#"
          class="pagination__link"
          v-bind:class="{'pagination__link--current': pageItem.index === page,
                         'pagination__link--disabled': pageItem.disabled}"
          v-on:click.prevent="paginate(pageItem.index)">
        {{ pageItem.title }}
      </a>
    </li>
    <li class="pagination__item">
      <a href="#"
        class="pagination__link pagination__link--arrow"
        v-bind:class="{'pagination__link--disabled': page === pages}"
        aria-label="Следующая страница"
        v-on:click.prevent="scrollPage(page + 1)">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right" />
        </svg>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.pagination__link--disabled,
.pagination__link--current {
  pointer-events: none;
}
</style>

<script>
export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: {
    page: {
      type: Number,
    },
    count: {
      type: Number,
    },
    perPage: {
      type: Number,
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
    croppedPagesList() {
      if (this.pages > 4) {
        if (this.page !== 1
            && this.page !== 2
            && this.page !== 3
            && this.page !== 4
            && this.page !== this.pages) {
          return [
            {
              title: 1,
              index: 1,
              disabled: false,
            },
            {
              title: 2,
              indx: 2,
              disabled: false,
            },
            {
              title: '...',
              index: 0,
              disabled: true,
            },
            {
              title: this.page,
              index: this.page,
              disabled: false,
            },
            {
              title: '...',
              index: 0,
              disabled: true,
            },
            {
              title: this.pages,
              index: this.pages,
              disabled: false,
            },
          ];
        }
        return [
          {
            title: 1,
            index: 1,
            disabled: false,
          },
          {
            title: 2,
            index: 2,
            disabled: false,
          },
          {
            title: 3,
            index: 3,
            disabled: false,
          },
          {
            title: 4,
            index: 4,
            disabled: false,
          },
          {
            title: '...',
            index: 0,
            disabled: true,
          },
          {
            title: this.pages,
            index: this.pages,
            disabled: false,
          },
        ];
      }
      return this.pages;
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
    scrollPage(direction) {
      this.$emit('paginate', direction);
    },
  },
};
</script>
