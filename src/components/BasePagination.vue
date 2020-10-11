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
        v-bind:class="{'pagination__link--disabled': page === pages.length}"
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
import constants from '../constants';

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
      const length = Math.ceil(this.count / this.perPage);
      const pagesList = [];
      for (let i = 0; i < length; i++) {
        const pageItem = {
          title: i + 1,
          index: i + 1,
          disabled: false,
        };
        pagesList.push(pageItem);
      }
      return pagesList;
    },
    croppedPagesList() {
      const localThis = this;
      const croppedPagesList = this.pages.map((pageItem, index) => {
        pageItem = {
          title: index + 1,
          index: index + 1,
          disabled: false,
          visible: localThis.isVisible(index + 1),
        };
        return pageItem;
      });
      if (this.page > constants.PAGES_CROP_THRESHOLD && this.page !== croppedPagesList.length) {
        const cropThresholdJump = this.page === constants.PAGES_CROP_THRESHOLD + 1;
        const cropDelete = cropThresholdJump ? 0 : 1;
        const cropStart = cropThresholdJump ? this.page - 1 : this.page - 2;
        croppedPagesList.splice(cropStart, cropDelete, constants.POINTS_OBJ);
      }
      if (this.pages.length > constants.PAGES_CROP_THRESHOLD) {
        croppedPagesList.splice((croppedPagesList.length - 1), 0, constants.POINTS_OBJ);
      }
      return croppedPagesList.filter((pageItem) => pageItem.visible);
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
    scrollPage(direction) {
      this.paginate(direction);
    },
    isVisible(index) {
      return index === this.page
      || index <= constants.PAGES_CROP_THRESHOLD
      || index === this.pages.length;
    },
  },
};
</script>
