<template>
<ul class="footer__social social">
  <li v-for="socialLink in social" v-bind:key="socialLink.name" class="social__item">
    <a class="social__link" href="#" v-bind:aria-label="socialLink.name">
      <svg v-bind:width="socialLink.width" v-bind:height="socialLink.height" fill="currentColor">
        <use v-bind:xlink:href="socialLink.xlink" />
      </svg>
    </a>
  </li>
</ul>
</template>

<script>
import social from '@/data/social';

export default {
  data() {
    return {
      social,
    };
  },
};
</script>
