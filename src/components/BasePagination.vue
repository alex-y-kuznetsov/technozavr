<template>
    <ul class="catalog__pagination pagination">
      <li class="pagination__item">
        <a href="#"
          class="pagination__link pagination__link--arrow"
          v-bind:class="{'pagination__link--disabled': page === 1}"
          aria-label="Предыдущая страница"
          v-on:click.prevent="scrollPage('backward', page)">
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
        <a href="#"
          class="pagination__link pagination__link--arrow"
          v-bind:class="{'pagination__link--disabled': page === pages}"
          aria-label="Следующая страница"
          v-on:click.prevent="scrollPage('forward', page)">
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
    scrollPage(direction, page) {
      if (page < this.pages && direction === 'forward') {
        this.$emit('paginate', (page + 1));
      }
      if (page > 1 && direction === 'backward') {
        this.$emit('paginate', (page - 1));
      }
    },
  },
};
</script>
