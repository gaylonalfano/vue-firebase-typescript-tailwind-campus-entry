<template>
  <Navbar />
  <!-- Page header -->
  <div v-if="member && filteredTransactions">
    <header class="relative z-0 flex-1 overflow-y-auto">
      <div class="bg-white shadow">
        <div class="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <div
            class="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200"
          >
            <div class="flex-1 min-w-0">
              <!-- Profile -->
              <div class="flex items-center">
                <img
                  class="hidden w-16 h-16 rounded-full sm:block"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                  alt=""
                />
                <div>
                  <div class="flex items-center">
                    <h1
                      class="ml-3 text-2xl font-bold text-gray-900 leading-7 sm:leading-9 sm:truncate"
                    >
                      Good morning, {{ member.name }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="flex mt-6 space-x-3 md:mt-0 md:ml-4"> -->
            <!--   <button -->
            <!--     type="button" -->
            <!--     class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-500 border border-transparent shadow-sm rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" -->
            <!--   > -->
            <!--     + Transaction -->
            <!--   </button> -->
            <!-- </div> -->
          </div>
        </div>
      </div>
    </header>

    <!-- Accounts Cards Overview -->
    <main class="pt-8 pb-8 bg-indigo-100">
      <div class="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <h2 class="text-lg font-medium text-gray-900 leading-6">Overview</h2>
        <div>
          <!-- Simple Account Card -->
          <!-- <dl class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-3"> -->
          <!--   <div -->
          <!--     v-for="account in member.accounts" -->
          <!--     :key="account.type" -->
          <!--     class="overflow-hidden bg-white rounded-lg shadow" -->
          <!--   > -->
          <!--     <AccountDetailsStatsCard :member="member" /> -->
          <!--     <!-1- <div class="px-4 py-5 sm:p-6"> -1-> -->
          <!--     <!-1-   <dt class="text-sm font-medium text-gray-500 truncate"> -1-> -->
          <!--     <!-1-     {{ account.type }} -1-> -->
          <!--     <!-1-   </dt> -1-> -->
          <!--     <!-1-   <dd class="mt-1 text-3xl font-semibold text-gray-900"> -1-> -->
          <!--     <!-1-     ¥{{ account.currentBalance }} -1-> -->
          <!--     <!-1-   </dd> -1-> -->
          <!--     <!-1- </div> -1-> -->
          <!--   </div> -->
          <!-- </dl> -->
          <!-- Account Stats Card -->
          <!-- UPDATE: After adding :account to AccountDetailsStatsCard, I now need to v-for over the -->
          <!-- member  accounts, otherwise :account="type" isn't enough and account will be undefined -->
          <dl class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="account in member.accounts"
              :key="account"
              class="flex flex-col overflow-hidden bg-white rounded-lg shadow"
            >
              <AccountDetailsStatsCard :member="member" :account="account" />
            </div>
          </dl>
          <!-- <AccountDetailsStatsCard :member="member" :account="type" /> -->
          <!-- <!-1- Top part of AccountDetailsStatsCard -1-> -->
          <!-- <dl class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"> -->
          <!--   <div -->
          <!--     v-for="account in member.accounts" -->
          <!--     :key="account.type" -->
          <!--     class="flex flex-col overflow-hidden bg-white rounded-lg shadow" -->
          <!--   > -->
          <!--     <div class="flex-grow px-4 py-5 sm:p-6"> -->
          <!--       <div class="flex items-center"> -->
          <!--         <div class="flex-1 w-0 ml-5"> -->
          <!--           <dt class="text-sm font-medium text-gray-500 truncate"> -->
          <!--             {{ account.type }} -->
          <!--           </dt> -->
          <!--           <dd class="flex items-baseline"> -->
          <!--             <div class="text-2xl font-semibold text-gray-900"> -->
          <!--               ¥{{ account.currentBalance }} -->
          <!--             </div> -->
          <!--             <!-1- Latest Transaction Arrow Indicator -1-> -->
          <!--             <div -->
          <!--               v-if="account.latestTransactionAmount > 0" -->
          <!--               class="flex items-baseline ml-2 text-sm font-semibold text-green-600" -->
          <!--             > -->
          <!--               <svg -->
          <!--                 class="self-center flex-shrink-0 w-5 h-5 text-green-500" -->
          <!--                 fill="currentColor" -->
          <!--                 viewBox="0 0 20 20" -->
          <!--                 aria-hidden="true" -->
          <!--               > -->
          <!--                 <path -->
          <!--                   fill-rule="evenodd" -->
          <!--                   d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" -->
          <!--                   clip-rule="evenodd" -->
          <!--                 /> -->
          <!--               </svg> -->
          <!--               <span class="sr-only"> Increased by </span> -->
          <!--               {{ account.latestTransactionAmount }} -->
          <!--             </div> -->
          <!--             <div -->
          <!--               v-else -->
          <!--               class="flex items-baseline ml-2 text-sm font-semibold text-red-600" -->
          <!--             > -->
          <!--               <svg -->
          <!--                 class="self-center flex-shrink-0 w-5 h-5 text-red-500" -->
          <!--                 fill="currentColor" -->
          <!--                 viewBox="0 0 20 20" -->
          <!--                 aria-hidden="true" -->
          <!--               > -->
          <!--                 <path -->
          <!--                   fill-rule="evenodd" -->
          <!--                   d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" -->
          <!--                   clip-rule="evenodd" -->
          <!--                 /> -->
          <!--               </svg> -->
          <!--               <span class="sr-only"> Decreased by </span> -->
          <!--               {{ account.latestTransactionAmount }} -->
          <!--             </div> -->
          <!--           </dd> -->
          <!--         </div> -->
          <!--       </div> -->
          <!--     </div> -->
          <!--   </div> -->
          <!-- </dl> -->
        </div>
      </div>

      <TransactionsDetailsTable :transactions="filteredTransactions" />
    </main>
  </div>
  <div v-else>
    <h3>
      {{ errorGetDocument }}
    </h3>
    <h3>
      <!-- {{ errorGetCollection }} -->
    </h3>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watchEffect,
  onMounted,
  onUpdated,
  onUnmounted,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import AccountDetailsStatsCard from "@/components/AccountDetailsStatsCard.vue";
import TransactionsDetailsTable from "@/components/TransactionsDetailsTable.vue";
import getDocument from "@/composables/getDocument";
import getCollection from "@/composables/getCollection";
import getCollectionWithQuery from "@/composables/getCollectionWithQuery";
import getCollectionShaunJs from "@/composables/getCollectionShaunJs";

export default defineComponent({
  name: "MemberAccountsTransactionsDetails",
  components: { Navbar, AccountDetailsStatsCard, TransactionsDetailsTable },
  props: ["id", "type"],
  setup(props) {
    // Testing out the different Hooks to see when they fire
    onMounted(() => {
      console.log("MOUNTED");
    });
    onUnmounted(() => console.log("UNMOUNTED"));
    onUpdated(() => console.log("UPDATED"));

    // Let's get our full member document to pass to embedded AccountDetailsStatsCard
    const { document: member, error: errorGetDocument } = getDocument(
      "members",
      props.id
    );

    const {
      documents: transactions,
      error: errorGetCollectionWithQuery,
    } = getCollectionWithQuery(`members/${props.id}/transactions`);

    const filteredTransactions = computed(() => {
      console.log("filteredTransactions triggered!");
      if (transactions.value) {
        // === Filter ONLY
        // return transactions.value.filter((doc) => {
        //   // console.log(doc); // Proxy {previousBalance: 30, memberId: ...}
        //   // Q: How to access the doc data like we did using .map()?
        //   // return doc.accountType == "savings"  // Error 'accountType' doesn't exist on type { 'data' ...}
        //   // return ...doc.accountType == "savings"  // Error cannot find 'doc'
        //   // console.log(tempDoc); // REAL DATA {transaction: -10, ...}
        //   // console.log(tempDoc.accountType); // WEIRD! It does log 'spending', 'savings', etc. BUT compile Error TS2339 'accountType' does not exist...
        //   // console.log(doc.accountType); // WEIRD! It does log 'spending', 'savings', etc. BUT compile Error TS2339 'accountType' does not exist...
        //   // Q: Is this a TS issue that's preventing this from working???
        //   // A: OMG! If I ts-ignore it works!!! WTF!? What the hell is wrong with TS2339!?
        //   // @ts-ignore
        //   // return doc.accountType == "savings"; // WORKS!
        //   return doc.accountType == props.type; // WORKS!
        // });
        // === Filter + Sort Descending (-1)
        return transactions.value
          .filter((transaction) => {
            // @ts-ignore
            return transaction.accountType == props.type;
          }) // @ts-ignore
          .sort((a, b) => b.createdAt - a.createdAt);
      }
    });

    return {
      member,
      transactions,
      filteredTransactions,
      errorGetDocument,
      errorGetCollectionWithQuery,
    };
  },
});
</script>

<style>
</style>
