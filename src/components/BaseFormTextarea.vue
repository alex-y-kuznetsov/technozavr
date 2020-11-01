<template>
  <BaseFormField v-bind:title="title" v-bind:error="error">
    <textarea
      class="form__input form__input--area"
      v-model="dataValue"
      v-bind:placeholder="placeholder"
    ></textarea>
  </BaseFormField>
</template>

<script>
import formFieldMixin from "@/mixins/formFieldMixin";
export default {
  mixins: [formFieldMixin]
};
</script>