<template>
  <v-btn
    :text="isText"
    :icon="isIcon"
    :color="color"
    @click.stop="$emit('onClick', $event)"
  >
    <v-icon v-if="isIcon">
      {{ icon }}
      }}</v-icon
    >
    <div v-else>{{ label }}</div>
  </v-btn>
</template>

<script>
export default {
  name: "MovieButton",
  props: {
    label: {
      type: String,
      default: undefined,
    },
    icon: {
      type: String,
      default: undefined,
    },
    color: {
      type: String,
      default: "primary",
    },
    isText: {
      type: Boolean,
      default: false,
    },
    isIcon: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
