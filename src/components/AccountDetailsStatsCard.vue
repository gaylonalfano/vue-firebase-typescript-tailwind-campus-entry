<template>
  <!-- UPDATE: Had to move top-level <dl> and <div> UP inside MemberAccountsTable -->
  <!-- <dl class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"> -->
  <!-- Error: Getting only last item in array since :key=account.type isn't unique! -->
  <!-- Originally moved on and used router-links with :key=account.type but want to see if I can fix -->
  <!-- I believe :key=account is actually more unique since  'type' prop is the same for ALL accounts -->
  <!-- UPDATE: I moved the v-for="account in member.accounts" UP inside MemberAccountsTable -->
  <!-- <div -->
  <!--   v-for="account in member.accounts" -->
  <!--   :key="account" -->
  <!--   class="flex flex-col bg-white overflow-hidden shadow rounded-lg" -->
  <!-- > -->
  <!-- Wrap a router-link around top portion of card to go to details -->
  <router-link
    :to="{
      name: 'MemberAccountsTransactionsDetails',
      params: { id: member.id, type: account.type },
    }"
  >
    <div class="flex-grow px-4 py-5 sm:p-6">
      <div class="flex items-center">
        <div class="ml-5 w-0 flex-1">
          <dt class="text-sm font-medium text-gray-500 truncate">
            {{ account.type }}
          </dt>
          <dd class="flex items-baseline">
            <div class="text-2xl font-semibold text-gray-900">
              ¥{{ account.currentBalance }}
            </div>
            <!-- Latest Transaction Arrow Indicator -->
            <div
              v-if="account.latestTransactionAmount > 0"
              class="ml-2 flex items-baseline text-sm font-semibold text-green-600"
            >
              <svg
                class="self-center flex-shrink-0 w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="sr-only"> Increased by </span>
              {{ account.latestTransactionAmount }}
            </div>
            <div
              v-else
              class="flex items-baseline ml-2 text-sm font-semibold text-red-600"
            >
              <svg
                class="self-center flex-shrink-0 w-5 h-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="sr-only"> Decreased by </span>
              {{ account.latestTransactionAmount }}
            </div>
          </dd>
        </div>
      </div>
    </div>
  </router-link>
  <!-- Bottom footer section of card -->
  <div class="bg-gray-100 px-4 py-4 sm:px-6">
    <div class="flex justify-between text-sm">
      <!-- USING ROUTE LINKS -->
      <!-- Add Transaction Router Link -->
      <!-- <router-link -->
      <!--   :to="{ -->
      <!--     name: 'AddTransaction', -->
      <!--     params: { id: member.id, type: account.type }, -->
      <!--   }" -->
      <!--   class="font-medium text-indigo-600 hover:text-indigo-500" -->
      <!-- > -->
      <!--   Edit -->
      <!-- </router-link> -->
      <!-- View Transactions Router Link -->
      <!-- <router-link -->
      <!--   :to="{ -->
      <!--     name: 'MemberAccountsTransactionsDetails', -->
      <!--     params: { id: member.id, type: account.type }, -->
      <!--   }" -->
      <!--   class="font-medium text-gray-600 hover:text-gray-500" -->
      <!-- > -->
      <!--   View -->
      <!-- </router-link> -->
      <!-- Delete Account Router Link -->
      <!-- <router-link -->
      <!--   :to="{ -->
      <!--     name: 'DeleteAccount', -->
      <!--     params: { id: member.id, type: account.type }, -->
      <!--   }" -->
      <!--   class="font-medium text-red-600 hover:text-red-500" -->
      <!-- > -->
      <!--   Delete -->
      <!-- </router-link> -->

      <!-- USING MEMBER AND ACCOUNT PROPS (NO LINKS) -->
      <!-- Add Transaction Modal (No route) -->
      <p
        @click="showAddTransactionModal = true"
        class="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
      >
        Edit
      </p>
      <AddTransactionModal
        v-if="showAddTransactionModal"
        :member="member"
        :account="account"
        @close="showAddTransactionModal = false"
      />

      <!-- Delete Account Modal (No route) -->
      <p
        @click="showDeleteAccountModal = true"
        class="cursor-pointer font-medium text-red-600 hover:text-red-500"
      >
        Delete
      </p>
      <DeleteAccount
        v-if="showDeleteAccountModal"
        :member="member"
        :account="account"
        @close="showDeleteAccountModal = false"
      />
      <!-- Testing out embedding DeleteAccount and passing member and account as PROPS -->
      <!-- instead of using a router-link -->
      <!-- <div class="ml-4 mt-2 flex-shrink-0 space-x-4"> -->
      <!--   <button -->
      <!--     @click="showDeleteAccount = true" -->
      <!--     type="button" -->
      <!--     class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" -->
      <!--   > -->
      <!--     <svg -->
      <!--       class="w-5 h-5" -->
      <!--       fill="currentColor" -->
      <!--       stroke="currentColor" -->
      <!--       viewBox="0 0 24 24" -->
      <!--       xmlns="http://www.w3.org/2000/svg" -->
      <!--     > -->
      <!--       <path -->
      <!--         stroke-linecap="round" -->
      <!--         stroke-linejoin="round" -->
      <!--         stroke-width="2" -->
      <!--         d="M20 12H4" -->
      <!--       ></path> -->
      <!--     </svg> -->
      <!--   </button> -->
      <!--   <!-1- Add Delete Member Modal -1-> -->
      <!-- <DeleteAccount -->
      <!--   v-if="showDeleteAccount" -->
      <!--   :member="member" -->
      <!--   :account="account" -->
      <!--   @close="showDeleteAccount = false" -->
      <!-- /> -->
      <!-- </div> -->
    </div>
  </div>
  <!-- </div> -->
  <!-- </dl> -->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DeleteAccountModal from "@/views/DeleteAccountModal.vue";
import DeleteAccount from "@/views/DeleteAccount.vue";
import AddTransactionModal from "@/views/AddTransactionModal.vue";

export default defineComponent({
  name: "AccountDetailsStatsCard",
  components: { DeleteAccountModal, DeleteAccount, AddTransactionModal },
  props: ["member", "account"],
  setup(props) {
    // UPDATE Fixed it to where I can now update/use the Modal component
    const showDeleteAccountModal = ref<boolean>(false);
    // Show DeleteAccount (NOT DeleteAccountModal!) boolean ref
    const showDeleteAccount = ref<boolean>(false);

    const showAddTransactionModal = ref<boolean>(false);

    return {
      showDeleteAccount,
      showDeleteAccountModal,
      showAddTransactionModal,
    };
  },
});
</script>

<style>
</style>

