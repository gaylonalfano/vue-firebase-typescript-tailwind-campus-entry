<template>
  <div>
    <div class="relative mt-4">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-300"></div>
      </div>
      <div class="relative flex justify-center">
        <button
          v-if="!showForm"
          @click="showForm = true"
          type="button"
          class="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <!-- Heroicon name: plus-sm -->
          <svg
            class="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Account</span>
        </button>
      </div>
    </div>
    <!-- Display Add Account Form when showForm toggled -->
    <div class="flex m-auto justify-center">
      <form
        v-if="showForm"
        @submit.prevent="handleAddAccount"
        class="mt-1 space-y-4 max-w-md"
      >
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="type" class="sr-only">Account Type</label>
            <input
              ref="typeInputRef"
              v-model="type"
              id="type"
              name="type"
              type="text"
              autocomplete="type"
              required
              class="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Account type"
            />
          </div>
          <div>
            <label for="balance" class="sr-only">Balance</label>
            <input
              v-model.number="balance"
              id="balance"
              name="balance"
              type="number"
              autocomplete="balance"
              required
              class="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
        </div>
        <div class="flex justify-between">
          <button
            type="button"
            @click="showForm = false"
            class="justify-center py-2 px-4 border border-transparent text-xs font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            v-if="!isPending"
            class="justify-center py-2 px-4 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            + Account
          </button>
          <button
            v-else
            disabled
            class="disabled cursor-not-allowed justify-center py-2 px-4 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Adding...
          </button>
        </div>
        <div v-if="error">
          <h3 class="text-sm font-medium text-red-800">{{ error }}</h3>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { db, timestamp } from "@/firebase/config";
import useDocument from "@/composables/useDocument";

export default defineComponent({
  name: "AddAccount",
  props: ["member"],
  setup(props) {
    // Pull in useDocument() and the updateDoc() method
    const { updateDoc, error, isPending } = useDocument(
      "members",
      props.member.id
    );

    // Q: Where does the auth user and member come from? Parent via props?
    // A: Yes, we pass 'member' as prop from MemberAccountsTable
    // Create input data properties refs
    const type = ref<string>("");
    // Q: Need another var to sync with form input type field. Trying computed()....
    // Need to use this value to be the top level label for my Map account object.
    // This didn't work...
    // const accountType = computed(() => type.value);
    const balance = ref<number>(0);
    const showForm = ref<boolean>(false);
    // Q: How to auto focus to the 'type' input field?
    // A: Can use .focus() method with a Template Ref
    const typeInputRef = ref<HTMLInputElement | null>(null);
    // Now let's use onMounted() to set the input field focus
    // UPDATE Doesn't work since this mounts multiple times (per member)
    // onMounted(() => {
    //   console.log("MOUNTED:AddAccount");
    //   typeInputRef.value?.focus();
    // });

    // Handler for form submission
    async function handleAddAccount() {
      // Set the cursor focus to typeInputRef
      // typeInputRef.value?.focus();  // BROKEN
      // Confirm we have user inputs for new account
      if (type.value && balance.value >= 0) {
        console.log(
          "PASSED:AddAccount:handleAddAccount:type.value && balance.value >= 0"
        );
        // ============== WORKING: member.accounts is ARRAY of MAPS approach
        // Package all the inputs into an object
        // Q: Does account need to be reactive? Don't think so...
        // A: Nope.
        // NOTE Adding defaults for latestTransaction to initialize.
        // NOTE Adding transactions empty array to hold transactions subcollection
        // document IDs
        // const account = {
        //   type: type.value,
        //   balance: balance.value,
        //   latestTransactionAmount: balance.value,
        //   latestTransactionDate: "1/1/2021",
        //   transactions: [],
        // };

        // console.log("handleAddAccount:account: ", account);
        // // Use our updateDoc(updatesObj) to update/add newSong
        // // NOTE Don't need to do some try/catch as that's already
        // // built into addDoc()!
        // await updateDoc({
        //   // Q: Does my member doc need a pre-defined 'accounts' property? Or will it be added automatically?
        //   // A: YES! My spread operation below throws an Error if no 'accounts' property exists.
        //   // Q: How to access current/existing songs list?
        //   // A: Use our props! Then just spread!
        //   accounts: [...props.member.accounts, account],
        // });

        // ============= BROKEN: member.accounts is MAP of MAPS approach
        // Q: How to make the first level equal to my type Ref? { savings: { balance, etc. }}
        // Q: Do I need a computed() that syncs with the form input 'type' field? (e.g. computed(() => type.value)
        // Well I can't simply use 'accountType' as it is literal string. And I can't use accountType.value...
        // const account = {
        //   accountType: {
        //     balance: balance.value,
        //     latestTransactionAmount: 0,
        //     latestTransactionDate: timestamp(),
        //     latestTransactionRef: "",
        //   },
        // };
        // const account = {
        //   type: type.value,
        //   balance: balance.value,
        //   latestTransactionAmount: 0,
        //   latestTransactionDate: timestamp(),
        //   latestTransactionRef: "",
        // };
        // // Q: Should I try to literally create a new Map<string, object>() here?
        // const accountMap = new Map<string, object>();
        // accountMap.set(type.value, account);
        // const accountMapGet = accountMap.get(type.value); // Must extract the object

        // Q: What about using var data = {}; then data['key'] = {key1:'val1', key2:'val2'} then data.key.key1 ?
        // const data = {};
        // data[type.value] = account;

        // Q: What about having the type be from a pre-defined dropdown selection? accounts.savings: {}, accounts.giving: {}
        // Q: In this case, do I need pre-defined 'savings' Maps inside FS, or will update() create the new field if not present?
        // const account = {
        //   balance: balance.value,
        //   latestTransactionAmount: 0,
        //   latestTransactionDate: timestamp(),
        //   latestTransactionRef: "",
        // };

        // console.log("handleAddAccount:account: ", account);
        // // console.log("handleAddAccount:accountMap: ", accountMap);
        // // console.log("handleAddAccount:data: ", data);

        // TODO Test this out perhyaps?
        // Q: What about getting an accounts.savings Ref? https://firebase.google.com/docs/reference/node/firebase.database.Reference#update
        // var adaNameRef = fb.db().ref('users/ada/name'). So, .ref('members/{member.id}/accounts/{type}/')
        // NOTE Gonna try to use 'db' without the composable

        // Q: What about trying WITHOUT composable to see if I can update accounts.savings
        // Q: Using the db.collection().doc('member.id/accounts/type') approach
        // const accountTypeRef = db
        //   .collection("members")
        //   .doc(`${props.member.id}/accounts/${type.value}`);

        // console.log("accountTypeRef:accounts/type ", accountTypeRef);

        // // Try to update at accountTypeRef.update({})
        // // await accountTypeRef.update(account); // ERROR Invalid Doc Ref
        // await accountTypeRef.set(account); // Creates accounts subcollection and savings document!

        // Q: What about trying WITHOUT composable to see if I can update accounts.savings
        // Q: Using the db.collection().doc() approach
        // const accountTypeRef = db
        //   .collection("members")
        //   .doc(`${props.member.id}/accounts/`);

        // console.log("accountTypeRef:accounts: ", accountTypeRef);

        // // Try to update at accountTypeRef.update({})
        // // await accountTypeRef.update(account); // ERROR Invalid Doc Ref

        // Q: What about using dot notation e.g. 'first.test': "12345"? https://stackoverflow.com/questions/49150917/update-fields-in-nested-objects-in-firestore-documents
        // Along with composable updateDoc() function?
        const account = {
          type: type.value, // Add type even if redundant.
          balance: balance.value,
          previousBalance: 10,
          latestTransactionAmount: balance.value,
          latestTransactionDate: timestamp(),
          latestTransactionRef: "",
        };

        await updateDoc({
          // accounts: { ...props.member.accounts, account }, // Just normal without top label
          // accounts: { ...props.member.accounts, account['type']: account }, // Syntax error
          // accounts: { ...props.member.accounts, accountMap } // FAILED. Must extract the object
          // accounts: { ...props.member.accounts, accountMapGet }, // Works but don't have top-level name (type.value string)
          // accounts: { ...props.member.accounts, accountMap[type.value]: accountMapGet },  // Syntax error
          // accounts: {...props.member.accounts, data[type.value] }  // Syntax error
          // Q: What about having the type be from a pre-defined dropdown selection? (i.e. accounts: { savings: {}, giving: {})
          // Q: In this case, do I need pre-defined 'savings' Maps inside FS, or will update() create the new field if not present?
          // accounts: { ...props.member.accounts.savings, account }, // Works but does accounts { account { balance... }}. savings doesn't pass over.
          // Q: What if accounts is Map of Maps? (i.e. accounts: {}) Will it create the account if not present?
          // accounts: { ...props.member.accounts.savings, account }, // Works but does accounts { account { balance... }}. savings doesn't pass over.
          // accounts: { ...props.member.accounts.savings, account }, // Works but does accounts { account { balance... }}. savings doesn't pass over.
          // Q: What about using relative path 'dot notation' with update() ("name/first" vs. "name")?
          // https://firebase.google.com/docs/reference/node/firebase.database.Reference#update
          [`accounts.${type.value}`]: account, // WORKS!
        });

        // Collapse/hide/toggle showForm value after adding a new account
        showForm.value = false;

        // Clear form inputs
        balance.value = 0;
        type.value = "";
      }
    }
    return { handleAddAccount, type, balance, showForm, error, isPending };
  },
});
</script>

<style>
</style>
