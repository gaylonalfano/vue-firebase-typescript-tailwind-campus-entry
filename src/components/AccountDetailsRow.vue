<template>
  <tbody
    v-for="account in accounts"
    :key="account.type"
    class="bg-white divide-y divide-gray-200"
  >
    <tr>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {{ account.type }}
      </td>
      <td
        ref="balanceCell"
        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
      >
        {{ account.balance }}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ¥{{ account.latestTransactionAmount }}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {{ account.latestTransactionDate }}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <a
          v-if="!isEditable"
          @click="isEditable = true"
          href="#"
          class="text-indigo-600 hover:text-indigo-900"
          >Edit</a
        >
        <a
          v-if="isEditable"
          @click="handleUpdate"
          href="#"
          class="text-indigo-600 hover:text-indigo-900"
          >Update</a
        >
      </td>
    </tr>

    <!-- More items... -->
  </tbody>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AccountDetailsRow",
  props: ["accounts"],
  setup() {
    // Create a Template Ref to my <td> for account.balance
    const balanceCell = ref<HTMLTableDataCellElement | null>(null);
    const isEditable = ref<boolean>(false);

    // FIXME The problem with Template Ref is that it gets added to ALL rows/accounts...

    function handleUpdate() {
      isEditable.value = false;
    }

    return { handleUpdate, isEditable, balanceCell };
  },
});
</script>

<style>
</style>
