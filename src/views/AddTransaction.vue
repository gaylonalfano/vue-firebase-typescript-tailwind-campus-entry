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
          <div class="mt-3 text-center sm:mt-5">
            <h3
              class="text-lg leading-6 font-medium text-gray-900"
              id="modal-headline"
            >
              Add transaction id:{{ id }} -- type:{{ type }}
            </h3>
            <div class="mt-2 flex justify-center">
              <form @submit.prevent="handleAddTransaction" class="space-y-6">
                <input type="hidden" name="remember" value="true" />
                <div class="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label for="transaction-amount" class="sr-only"
                      >Transaction Amount</label
                    >
                    <input
                      v-model.number="transactionAmount"
                      id="transaction-amount"
                      name="transaction-amount"
                      type="number"
                      autocomplete="current-transaction-amount"
                      required
                      class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label for="notes" class="sr-only">Notes</label>
                    <input
                      v-model="notes"
                      id="notes"
                      name="notes"
                      type="text"
                      autocomplete="notes"
                      required
                      class="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="E.g. Fortnite, etc."
                    />
                  </div>
                </div>
                <div v-if="errorAddDoc">
                  {{ errorAddDoc }}
                </div>
                <div v-if="errorUpdateDoc">
                  {{ errorUpdateDoc }}
                </div>
                <div
                  class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
                >
                  <button
                    type="submit"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  >
                    Update
                  </button>
                  <button
                    @click="handleCancel"
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { timestamp, db } from "@/firebase/config";
import useCollection from "@/composables/useCollection";
import useDocument from "@/composables/useDocument";
import getDocument from "@/composables/getDocument";

export default defineComponent({
  name: "AddTransaction",
  props: ["id", "type"],
  setup(props) {
    // Q: Do I need the full member (via passing :member="member" props)?
    // Q: Or, just member.account as a props via route.params?
    // A1: If I just pass route.params then I need to still retrieve member document
    // because I need to get its current account values before updating.
    // A2: If I pass 'member' prop, then I already have access to current member,
    // BUT, how would I know the account type without route.params? Guess I could
    // import useRoute() to grab params? Yes, this an option.

    // Let's try just making a second request using getDocument() composable
    const { document: member, error: errorGetDocument } = getDocument(
      "members",
      props.id
    );
    // Q: How to get a actual value for member?
    // Let's now simplify and get a current accountRef object
    // const accountRef = member.value?.accounts[`${props.type}`];
    // console.log("accountRef", accountRef); // undefined
    // console.log("member.value: ", member.value); // null
    // console.log("member.value.data(): ", member.value); // null
    // onMounted(() => {
    //   console.log("ONMOUNTED:member.value: ", member.value); // null
    // });
    // Q: What if I just use db directly?
    // const memberRef = db.collection("members").doc(props.id).get("accounts"); // Error with 'accounts'
    // const memberRef = db.collection("members").doc(props.id); // e {_:t, firestore: e, Hf: e}
    // const memberRef = db.collection("members").doc(props.id).get();  // Promise
    // console.log("memberRef ", memberRef);
    // console.log(memberRef);
    // const request = async (): Promise<void> => {
    //   const memberDocumentRef = await db
    //     .collection("members")
    //     .doc(props.id)
    //     .get();
    //   console.log("request:memberDocumentRef: ", memberDocumentRef);
    //   // Works! e {_:e, zf: e}
    //   const memberAccountRef = memberDocumentRef.data()?.accounts;
    //   console.log("request:memberAccountRef: ", memberAccountRef);
    //   // Works! {savings:{}, giving:{}}
    // };
    // request();

    // Let's get the useCollection addDoc() functionality to add new transaction doc
    const { addDoc, error: errorAddDoc } = useCollection(
      `members/${props.id}/transactions`
    );

    // Get updateDoc() composable functionality to add transaction.id to account type transactions Array
    // Q: Should I use a FS watcher/listener with onSnapshot()?
    // Q: Or, do I just first add new transaction doc THEN update member doc
    // with the returned response values?
    const { error: errorUpdateDoc, updateDoc } = useDocument(
      "members",
      props.id
    );

    const transactionAmount = ref<number>(0);
    const notes = ref<string>("");

    // Create new useRouter() instance to reroute to /dashboard
    // or if 'Cancel' button is clicked to go back to /dashboard
    const router = useRouter();
    // What info do I have available on just useRoute()?
    // const route = useRoute();
    // console.log({ route }); // Proxy {path, name, params, query}
    // console.log(route.params); // {id, type}

    function handleCancel() {
      // Go back by one record in the history (ie. to /dashboard)
      // NOTE I believe this is a full reload of dashboard which may
      // not be best UI.
      router.go(-1);
    }

    async function handleAddTransaction() {
      // Q: What is a Transaction doc going to look like? Do I have everything?
      // id, timestamp, member.id, account.type, transactionAmount, notes
      const transaction = {
        memberId: props.id,
        accountType: props.type,
        transactionAmount: transactionAmount.value,
        // transactionDate: timestamp(),
        createdAt: timestamp(), // using createdAt since getCollection.ts has it for orderBy
        notes: notes.value,
        currentBalance:
          member.value?.accounts[`${props.type}`].currentBalance +
          transactionAmount.value,
        previousBalance: member.value?.accounts[`${props.type}`].currentBalance,
      };
      // console.log(transaction);
      // Let's create the new doc in Transactions subcollection
      const response = await addDoc(transaction); // works!
      // console.log(response?.id); // works!
      // console.log({ response }); // Doesn't have the full data I don't believe

      // Confirm success, add response.id to account.transactions Array,
      // and reroute back to dashboard
      if (!errorAddDoc.value) {
        console.log("PASSED:!errorAddDoc.value");
        // Q: How can I retrieve the new document Id? On response?
        // A: Yep! It's on the response object! Now I can use this
        // response.id to update my account transactions Array.
        // NOTE I need to loop through member.accounts and match on type
        // Then I can simply append to its transactions Array.
        // Q: Could also update all the account properties while I'm at it?
        // Q: This is the KEY connection between accounts and transactions
        // using this data model structure.
        // A: UPDATE. I've changed accounts to MAP of MAPS instead of Array of Maps
        // A: This way I don't have to do fancy looping through an Array to match on type
        // A: Learned about dot notation to update fields inside nested objects
        // E.g., updateDoc({[`accounts.${type.value}`]: account,})
        // Need to getDocument('members', props.id) so I can get current account values
        if (member.value) {
          await updateDoc({
            [`accounts.${props.type}`]: {
              // NOTE MUST add 'type' prop or it's removed. Odd.
              type: props.type,
              currentBalance:
                member.value.accounts[`${props.type}`].currentBalance +
                transaction.transactionAmount,
              latestTransactionAmount: transaction.transactionAmount,
              latestTransactionDate: transaction.createdAt,
              latestTransactionRef: response?.id,
              previousBalance:
                member.value.accounts[`${props.type}`].currentBalance,
            },
          });

          if (!errorUpdateDoc.value) {
            console.log("PASSED:!errorUpdateDoc.value");
            console.log(`UPDATED:member.accounts.${props.type}`);
            router.push({ name: "Dashboard" });
          }
        } else {
          console.log("FAILED:member.value: ", member.value);
        }
      }
    }

    return {
      handleAddTransaction,
      handleCancel,
      transactionAmount,
      notes,
      errorAddDoc,
      errorUpdateDoc,
    };
  },
});
</script>

<style>
</style>
