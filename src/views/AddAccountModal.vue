<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
      <div
        class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div>
          <div
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
          >
            <!-- Heroicon name: check -->
            <svg
              class="h-6 w-6 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-5">
            <h3
              class="text-lg leading-6 font-medium text-gray-900"
              id="modal-headline"
            >
              Add new account for member.id {{ member.id }}
            </h3>
            <div class="mt-2">
              <form
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
                      autofocus
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
                <!-- Place buttons inside form otherwise Enter key won't submit -->
                <div
                  class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
                >
                  <button
                    @click="handleAddAccount"
                    type="submit"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  >
                    Add Account
                  </button>
                  <button
                    @click="$emit('close')"
                    type="button"
                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div v-if="error">
          <h3 class="text-sm font-medium text-red-800">{{ error }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { db, timestamp } from "@/firebase/config";
import useDocument from "@/composables/useDocument";

export default defineComponent({
  name: "AddAccountModal",
  props: ["member"],
  emits: ["close"],
  setup(props, context) {
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
          currentBalance: balance.value,
          latestTransactionAmount: balance.value,
          latestTransactionDate: timestamp(),
          latestTransactionRef: "",
          previousBalance: 0,
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

        // Q: Need to reroute or anything? Let's test...
        // A: Need to context.emit('close') event back to parent.
        // This is because we're NOT using a route! I guess I could use the
        // router to go back but this may be better.
        // NOTE: Need to catch this event with @close in parent where
        // I embed <AddAccountModal @close="showAddAccountModal = false" />
        if (!error.value) {
          console.log("ADDED Account. EMITTING to parent");
          context.emit("close");
        }
      }
    }
    return { handleAddAccount, type, balance, error, isPending };
  },
});
</script>

<style>
</style>
