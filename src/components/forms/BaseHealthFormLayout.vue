<template>
  <form class="space-y-8 min-w-min">
    <div class="space-y-8">
      <!-- NOTE I define named slots in CHILD then inside PARENT (eg. StudentForm), -->
      <!-- I use <template v-slot:name></template> -->
      <slot name="temperature">DEFAULT CONTENT HERE</slot>
      <slot name="conditions"></slot>
      <slot name="student"></slot>
      <slot name="parent_name"></slot>
      <slot name="parent_phone"></slot>
      <slot name="kindly_reminder"></slot>
      <div>
        <button
          type="submit"
          class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent group rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HealthFormBaseLayout",
  setup() {
    const conditionOne = "This is condition one from within CHILD";

    return { conditionOne };
  }
});
</script>

<style></style>
