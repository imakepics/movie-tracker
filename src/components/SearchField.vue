<template>
  <v-text-field
    v-model="_value"
    class="search-field"
    solo
    flat
    single-line
    hide-details="auto"
    background-color="rgba(255, 255, 255, 0.3)"
    :clearable="isClearable"
    :label="label"
    prepend-inner-icon="mdi-magnify"
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
