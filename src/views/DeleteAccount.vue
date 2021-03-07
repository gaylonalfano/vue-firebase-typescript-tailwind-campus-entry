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
        <div class="sm:flex sm:items-start">
          <div
            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
          >
            <!-- Heroicon name: exclamation -->
            <svg
              class="h-6 w-6 text-red-600"
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              class="text-lg leading-6 font-medium text-gray-900"
              id="modal-headline"
            >
              Delete account type: {{ account.type }} -- member: {{ member.id }}
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                Are you sure you want to delete this account? All data will be
                permanently removed from our servers forever. This action cannot
                be undone.
              </p>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            @click="handleDeleteAccount"
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Delete
          </button>
          <button
            @click="$emit('close')"
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import firebase from "firebase/app";
import useDocument from "@/composables/useDocument";

export default defineComponent({
  name: "DeleteAccount",
  props: ["member", "account"], // Originally, ["id", "type"] from route.params
  emits: ["close"],
  setup(props, context) {
    // UPDATE This component is testing pass PROPS instead of route.params "id" and "type"
    // We already have the member object via props. Let's pull in useDocument()
    // so we can update member doc
    const { updateDoc, error, isPending } = useDocument(
      "members",
      props.member.id
    ); // Or, props.id if using router-link instead of passing props

    // Handler for deleting member.accounts[account] property
    async function handleDeleteAccount() {
      console.log("CLICKED:handleDeleteMember");
      isPending.value = true;
      // We already have selected our document via useDocument('members', props.member.id)
      // Just need to delete it.

      // FIXME
      // Q: What will the updatesObj look like to completely remove the account?
      // Q: How to delete nested properties in objects?
      // A: Use delete parent.child.prop OR set to undefined
      // A: Can use [`accounts.${type}`]: firebase.firestore.FieldValue.delete()
      // Q: CAN I PASS BOTH account.type AND props.member as props from parent StatsCard?
      // I need the member.id AND the account type to make this work. Otherwise I need to use route.param
      //const account = {
      // [`accounts.${props.member.accounts[]}`]: undefined,
      // };
      // A: Yes, you can pass multiple props. However, I had to use a router-link to
      // correctly retrieve the account type. My v-for in StatsCard only gets the LAST account
      // UPDATE I fixed my v-for in StatsCard so now passing PROPS instead of route.params
      // Now my props are "member" and "account"
      await updateDoc({
        // [`accounts.${props.type}`]: firebase.firestore.FieldValue.delete(),
        // [`accounts.${props.account}`]: firebase.firestore.FieldValue.delete(), // FS Failed
        [`accounts.${props.account.type}`]: firebase.firestore.FieldValue.delete(), // Works! Needed .type
      });

      isPending.value = false;

      // Q: Need to reroute or anything? Let's test...
      // A: Need to context.emit('close') event back to parent.
      // This is because we're NOT using a route! I guess I could use the
      // router to go back but this may be better.
      // NOTE: Need to catch this event with @close in parent where
      // I embed <DeleteMember @close="showDeleteMemberModal = false" />
      if (!error.value) {
        console.log("PASSED:handleDeleteAccount:!error.value");
        console.log("DELETED account. EMITTING 'close' to parent");
        context.emit("close");
      }
    }

    return { error, isPending, handleDeleteAccount };
  },
});
</script>

<style>
</style>


