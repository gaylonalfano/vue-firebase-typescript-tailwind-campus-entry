<template>
  <Navbar />
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <h1 class="text-lg leading-6 font-semibold text-gray-900">Dashboard</h1>
    </div>
  </header>
  <main class="bg-indigo-100">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Member cards -->
      <ul v-for="member in members" :key="member.id" class="space-y-3">
        <li
          class="bg-white shadow overflow-hidden px-4 py-4 m-6 sm:px-6 sm:rounded-md"
        >
          <!-- Membmer Accounts Table -->
          <MemberAccountsTable :member="member" />
          <!-- Divider & + Account Button -->
          <!-- <AddAccount :member="member" /> -->
        </li>
      </ul>
    </div>

    <!-- <div v-for="member in members" :key="member.id"> -->
    <!--   <MemberAccountsTable :member="member" /> -->
    <!--   <!-1- Divider + Button text -1-> -->
    <!--   <div class="relative mt-4"> -->
    <!--     <div class="absolute inset-0 flex items-center" aria-hidden="true"> -->
    <!--       <div class="w-full border-t border-gray-300"></div> -->
    <!--     </div> -->
    <!--     <div class="relative flex justify-center"> -->
    <!--       <button -->
    <!--         type="button" -->
    <!--         class="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" -->
    <!--       > -->
    <!--         <!-1- Heroicon name: plus-sm -1-> -->
    <!--         <svg -->
    <!--           class="-ml-1.5 mr-1 h-5 w-5 text-gray-400" -->
    <!--           xmlns="http://www.w3.org/2000/svg" -->
    <!--           viewBox="0 0 20 20" -->
    <!--           fill="currentColor" -->
    <!--           aria-hidden="true" -->
    <!--         > -->
    <!--           <path -->
    <!--             fill-rule="evenodd" -->
    <!--             d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" -->
    <!--             clip-rule="evenodd" -->
    <!--           /> -->
    <!--         </svg> -->
    <!--         <span>Button text</span> -->
    <!--       </button> -->
    <!--     </div> -->
    <!--   </div> -->
    <!-- </div> -->
    <!-- /End replace -->
    <!-- </div> -->
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Navbar from "@/components/Navbar.vue";
import MemberAccountsTable from "@/components/MemberAccountsTable.vue";
import getCollection from "@/composables/getCollection";

export default defineComponent({
  name: "Dashboard",
  components: { Navbar, MemberAccountsTable },
  setup() {
    const { error, documents: members } = getCollection("members");

    return { error, members };
  },
});
</script>

<style>
</style>
