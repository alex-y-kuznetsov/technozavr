<template>
  <BaseFormField v-bind:title="title" v-bind:error="error">
    <input
      class="form__input"
      v-model="dataValue"
      v-bind:type="type"
      v-bind:placeholder="placeholder"
    />
  </BaseFormField>
</template>

<script>
import formFieldMixin from "@/mixins/formFieldMixin";
export default {
  props: {
    type: {
      default: 'text',
      type: String,
    },
  },
  mixins: [formFieldMixin]
};
</script>