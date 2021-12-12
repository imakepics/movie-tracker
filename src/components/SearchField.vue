<template>
  <v-text-field
    v-model="_value"
    class="search-field"
    solo
    flat
    single-line
    hide-details="auto"
    background-color="rgba(255, 255, 255, 0.3)"
    :autofocus="isAutofocus"
    :clearable="isClearable"
    :label="label"
    prepend-inner-icon="mdi-magnify"
    @click:clear="_value=''"
  >
  </v-text-field>
</template>

<script>
export default {
  name: "SearchField",
  model: {
    prop: "value",
    event: "onChange",
  },
  props: {
    value: {
      type: String,
      default: undefined,
    },
    label: {
      type: String,
      default: undefined,
    },
    isAutofocus: {
      type: Boolean,
      default: false,
    },
    isClearable: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    _value: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("onChange", value);
      },
    },
  },
};
</script>
