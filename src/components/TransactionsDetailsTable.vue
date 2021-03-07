<template>
  <!-- Wrap entire table with div :key="type" to rerender when type changes -->
  <!-- https://michaelnthiessen.com/key-changing-technique/ -->
  <!-- <div :key="type"> -->
  <!-- <div :key="$route.params.type"> -->
  <div>
    <h2
      class="max-w-6xl px-4 mx-auto mt-8 text-lg font-medium text-gray-900 leading-6 sm:px-6 lg:px-8"
    >
      Recent activity
    </h2>
    <!-- <button @click="handleFilterByAccount">Filter by Account</button> -->

    <!-- Activity list (smallest breakopoint only) -->
    <!-- This WILL display rows even at smallest viewport -->
    <div class="shadow sm:hidden">
      <ul
        v-for="transaction in transactions"
        :key="transaction.id"
        class="mt-2 overflow-hidden shadow divide-y divide-gray-200 sm:hidden"
      >
        <!-- TODO Could be TransactionDetailsRow :transactions="transactions" :type="accountType" -->
        <li>
          <div class="block px-4 py-4 bg-white hover:bg-gray-50">
            <span class="flex items-center space-x-4">
              <span class="flex flex-1 truncate space-x-2">
                <!-- Heroicon name: cash -->
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="flex flex-col text-sm text-gray-500 truncate">
                  <!-- <span class="truncate">{{ transaction.accountType }}</span> -->
                  <!-- Colored background 'pill'. Could make dynamic based on Account Type -->
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize"
                  >
                    {{ transaction.accountType }}
                  </span>
                  <span
                    ><span class="font-medium text-gray-900"
                      >${{ transaction.transactionAmount }}</span
                    >
                    RMB</span
                  >
                  <span>{{
                    format(transaction.createdAt.toDate(), "MM/dd/yyyy")
                  }}</span>
                </span>
              </span>
              <!-- Heroicon name: chevron-right -->
              <!-- <svg -->
              <!--   class="flex-shrink-0 w-5 h-5 text-gray-400" -->
              <!--   xmlns="http://www.w3.org/2000/svg" -->
              <!--   viewBox="0 0 20 20" -->
              <!--   fill="currentColor" -->
              <!--   aria-hidden="true" -->
              <!-- > -->
              <!--   <path -->
              <!--     fill-rule="evenodd" -->
              <!--     d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" -->
              <!--     clip-rule="evenodd" -->
              <!--   /> -->
              <!-- </svg> -->
            </span>
          </div>
        </li>

        <!-- More items... -->
      </ul>

      <!-- Disabling Pagination buttons for now -->
      <!-- <nav -->
      <!--   class="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200" -->
      <!--   aria-label="Pagination" -->
      <!-- > -->
      <!--   <div class="flex justify-between flex-1"> -->
      <!--     <a -->
      <!--       href="#" -->
      <!--       class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500" -->
      <!--     > -->
      <!--       Previous -->
      <!--     </a> -->
      <!--     <a -->
      <!--       href="#" -->
      <!--       class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500" -->
      <!--     > -->
      <!--       Next -->
      <!--     </a> -->
      <!--   </div> -->
      <!-- </nav> -->
    </div>

    <!-- Activity table (small breakopoint and up) -->
    <!-- Without this, ONLY smallest viewport displays transaction rows -->
    <div class="hidden sm:block">
      <div class="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div class="flex flex-col mt-2">
          <div
            class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-200">
              <!-- Define the static table column headers -->
              <thead>
                <tr>
                  <th
                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50"
                  >
                    Transaction
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase bg-gray-50"
                  >
                    Amount
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50 md:block"
                  >
                    Account
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50"
                  >
                    Balance
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase bg-gray-50"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <!-- Loop over transactions -->
              <!-- Experimenting with filtered transactions (original v-for is transaction in transactions) -->
              <!-- v-for="transaction in computedTransactionsUsingGetCollectionWithRouteParams" -->
              <tbody
                v-for="transaction in transactions"
                :key="transaction.id"
                class="bg-white divide-y divide-gray-200"
              >
                <tr class="bg-white">
                  <td
                    class="w-full px-6 py-4 text-sm text-gray-900 max-w-0 whitespace-nowrap"
                  >
                    <div class="flex">
                      <div class="inline-flex text-sm truncate group space-x-2">
                        <!-- Heroicon name: cash -->
                        <svg
                          class="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <p
                          class="text-gray-500 truncate group-hover:text-gray-900"
                        >
                          {{ transaction.notes }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                  >
                    <span class="font-medium text-gray-900"
                      >¥{{ transaction.transactionAmount }}
                    </span>
                    RMB
                  </td>
                  <td
                    class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap md:block"
                  >
                    <!-- Colored background 'pill'. Could make dynamic based on Account Type -->
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize"
                    >
                      {{ transaction.accountType }}
                    </span>
                  </td>
                  <td
                    class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                  >
                    <span class="font-medium text-gray-900"
                      >¥{{ transaction.currentBalance }}
                    </span>
                    RMB
                  </td>
                  <!-- <td -->
                  <!--   class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap" -->
                  <!-- > -->
                  <!--   ¥{{ transaction.currentBalance }} -->
                  <!-- </td> -->
                  <td
                    class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                  >
                    {{ format(transaction.createdAt.toDate(), "MM/dd/yyyy") }}
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Pagination -->
            <nav
              class="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6"
              aria-label="Pagination"
            >
              <div v-if="transactions.length > 0" class="hidden sm:block">
                <p class="text-sm text-gray-700">
                  Showing
                  <!-- <span class="font-medium">1</span> -->
                  <!-- to -->
                  <!-- <span v-if="transactionsCount < 10" class="font-medium">{{ -->
                  <!--   transactionsCount -->
                  <!-- }}</span> -->
                  <!-- <span v-else class="font-medium">10</span> -->
                  <!-- of -->
                  <!-- Make results a calculated total of transactions -->
                  <span class="font-medium">{{ transactionsCount }}</span>
                  results
                </p>
              </div>
              <div v-else class="hidden sm:block">
                <p class="text-sm text-gray-700">No transactions recorded</p>
              </div>
              <!-- Disabling Pagination buttons for now -->
              <!-- <div class="flex justify-between flex-1 sm:justify-end"> -->
              <!--   <a -->
              <!--     href="#" -->
              <!--     class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50" -->
              <!--   > -->
              <!--     Previous -->
              <!--   </a> -->
              <!--   <a -->
              <!--     href="#" -->
              <!--     class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50" -->
              <!--   > -->
              <!--     Next -->
              <!--   </a> -->
              <!-- </div> -->
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watch,
  onMounted,
  onUnmounted,
  onUpdated,
} from "vue";
import { format } from "date-fns";
export default defineComponent({
  name: "TransactionsDetailsTable",
  props: ["transactions"],
  setup(props) {
    // Testing out the different Hooks to see when they fire
    onMounted(() => console.log("MOUNTED"));
    onUnmounted(() => console.log("UNMOUNTED"));
    onUpdated(() => console.log("UPDATED"));

    // Get a total count of transactions for Pagination
    // Using computed()
    const transactionsCount = computed(() => {
      console.log("transactionCount triggered!");
      if (props.transactions) {
        console.log("props.transactions.length: ", props.transactions.length);
        return props.transactions.length;
      }
    });
    // Using watch()
    // UPDATE It prints in template: () => { Object(_vue_reactivity__WEBPACK....)}
    // const transactionsCountWatch = watch(props.transactions, () => {
    //   console.log("transactionsCountWatch triggered!");
    //   return props.transactions.length;
    // });

    return { transactionsCount, format };
  },
});
</script>

<style>
</style>
