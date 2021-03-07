<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <thead class="bg-gray-50">
    <tr>
      <th
        scope="col"
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Account
      </th>
      <th
        scope="col"
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Balance
      </th>
      <th
        scope="col"
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Latest Transaction
      </th>
      <th
        scope="col"
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        Date
      </th>
      <th scope="col" class="relative px-6 py-3">
        <span class="sr-only">Edit</span>
      </th>
    </tr>
  </thead>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AccountDetailsHeader",
});
</script>

<style>
</style>
