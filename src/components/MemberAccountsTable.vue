<template>
  <div class="bg-white px-4 py-5 sm:px-6">
    <div
      class="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap"
    >
      <div class="ml-4 mt-2">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          {{ member.name }}
        </h3>
      </div>
      <div class="ml-4 mt-2 flex-shrink-0 space-x-4">
        <button
          @click="showDeleteMemberModal = true"
          type="button"
          class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 12H4"
            ></path>
          </svg>
        </button>
        <!-- Add Delete Member Modal -->
        <DeleteMember
          v-if="showDeleteMemberModal"
          :member="member"
          @close="showDeleteMemberModal = false"
        />
      </div>
    </div>
  </div>
  <!-- Account Details Stats Card -->
  <!-- UPDATE I refactored v-for loop over member.accounts UP to here instead of inside child component -->
  <!-- instead of within AccountDetailsStatsCard! Should pass :member AND :account props -->
  <!-- Q: Should :key be account or account.type? -->
  <!-- A: I think account... Yep, seems to work! -->
  <!-- UPDATE: Had to move <dl> and <div> UP to this component for styling -->
  <dl class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="account in member.accounts"
      :key="account"
      class="flex flex-col bg-white overflow-hidden shadow rounded-lg"
    >
      <AccountDetailsStatsCard :member="member" :account="account" />
    </div>
  </dl>
  <!-- Add Account Modal Form Button Toggle -->
  <div class="justify-center mt-5 py-2 sm:mt-4 sm:flex sm:flex-row-reverse">
    <button
      @click="showAddAccountModal = true"
      type="button"
      class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
    >
      + Account
    </button>
    <AddAccountModal
      v-if="showAddAccountModal"
      :member="member"
      @close="showAddAccountModal = false"
    />
  </div>
  <!-- Table header and rows -->
  <!-- <div class="flex flex-col"> -->
  <!--   <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"> -->
  <!--     <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"> -->
  <!--       <div -->
  <!--         class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg" -->
  <!--       > -->
  <!--         <table class="min-w-full divide-y divide-gray-200"> -->
  <!--           <AccountDetailsHeader /> -->
  <!--           <AccountDetailsRow :accounts="member.accounts" /> -->
  <!--         </table> -->
  <!--       </div> -->
  <!--     </div> -->
  <!--   </div> -->
  <!-- </div> -->
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";
import AddAccount from "@/components/AddAccount.vue";
import AddAccountModal from "@/views/AddAccountModal.vue";
import AccountDetailsStatsCard from "@/components/AccountDetailsStatsCard.vue";
import DeleteMember from "@/views/DeleteMember.vue";
import useDocument from "@/composables/useDocument";

export default defineComponent({
  name: "MemberAccountsTable",
  components: {
    AddAccount,
    AccountDetailsStatsCard,
    DeleteMember,
    AddAccountModal,
  },
  props: ["member"],
  setup(props) {
    // UPDATE Adding DeleteMember Modal so need a boolean ref to show
    const showDeleteMemberModal = ref<boolean>(false);
    // Adding AddAccountModal so need a ref to show
    const showAddAccountModal = ref<boolean>(false);

    return { showDeleteMemberModal, showAddAccountModal };
  },
});
</script>

<style>
</style>
