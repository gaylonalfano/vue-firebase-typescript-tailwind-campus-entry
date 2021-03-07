<template>
  <Navbar />
  <!--
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
-->
  <div
    class="min-h-screen flex items-start justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <form @submit.prevent="handleAddMember" class="mt-8 space-y-6">
        <h4>Add New Member</h4>
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="member-name" class="sr-only">Member name</label>
            <input
              v-model="memberName"
              id="member-name"
              name="member-name"
              type="text"
              autocomplete="member-name"
              autofocus
              required
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Member name"
            />
          </div>
        </div>
        <div v-if="error">
          <h3 class="text-sm font-medium text-red-800">{{ error }}</h3>
        </div>
        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Member
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { timestamp } from "@/firebase/config";
import Navbar from "@/components/Navbar.vue";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";

export default defineComponent({
  name: "AddMember",
  components: { Navbar },
  setup() {
    // Get a collection reference and start adding documents to FS
    const { error, addDoc, isPending } = useCollection("members");
    const { user } = getUser();

    // Get our bounded data properties (v-model)
    const memberName = ref<string>("");

    // Get a router instance so we can reroute back to Dashboard
    const router = useRouter();

    // Form submit handler
    async function handleAddMember() {
      isPending.value = true;
      console.log(memberName.value);
      // Package up the member object so we can pass to addDoc()
      // Q: Does my member doc need a pre-defined 'accounts' property?
      // Or will it get added automatically when tryingto AddAccount?
      // A: YES! My spread operation in AddAccount.vue throws an Error if no 'accounts' property exists.
      const member = {
        name: memberName.value,
        createdAt: timestamp(),
        trackerOwner: user.value?.uid,
        // accounts: [],
        // Q: What about accounts as MAP of MAPS?
        // A: Works but now have accounts displayed on cards with no data.
        // accounts: {
        //   savings: {},
        //   spending: {},
        //   giving: {},
        // },
        // Q: What if I don't pre-define the accounts? When AddAccount will it add or fail?
        // A: Works! Need to use dot notation to update/add eg update({[`accounts.${type.value}`]: account})
        accounts: {},
      };

      const response = await addDoc(member);

      isPending.value = false;

      if (!error.value) {
        console.log("SUCCESS:handleAddMember");
        // NOTE No need to reset error.value since already null
        // Access response/DocumentReference and its id to reroute
        // to new /playlists/:id route
        router.push({
          name: "Dashboard",
        });
      }
    }
    return { handleAddMember, memberName, user, error, isPending };
  },
});
</script>

<style>
</style>
