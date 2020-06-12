<template>
    <ul class="catalog__pagination pagination">
      <li class="pagination__item">
        <a
          class="pagination__link pagination__link--arrow pagination__link--disabled"
          aria-label="Предыдущая страница"
        >
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-left" />
          </svg>
        </a>
      </li>
      <li class="pagination__item" v-for="pageNumber in pages" v-bind:key="pageNumber">
        <a href="#"
           class="pagination__link"
           v-bind:class="{'pagination__link--current': pageNumber === page}"
           v-on:click.prevent="paginate(pageNumber)">
          {{ pageNumber }}
        </a>
      </li>
      <li class="pagination__item">
        <a
          class="pagination__link pagination__link--arrow"
          href="#"
          aria-label="Следующая страница"
        >
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-right" />
          </svg>
        </a>
      </li>
    </ul>
</template>

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
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
  },
};
</script>
