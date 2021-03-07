<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex-shrink-0 flex items-center">
          <router-link :to="{ name: 'Dashboard' }">
            <img
              class="block h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Workflow"
            />
          </router-link>
        </div>
        <div class="hidden md:ml-6 md:flex md:items-center md:space-x-4">
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          <h1 class="text-white px-3 py-2 rounded-md text-2xl font-medium">
            <router-link :to="{ name: 'Dashboard' }">
              Balance Tracker</router-link
            >
          </h1>
        </div>
        <div class="flex items-center space-x-4">
          <div class="flex-shrink-0">
            <router-link
              :to="{ name: 'AddMember' }"
              class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-500 border border-transparent shadow-sm rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
            >
              <!-- Heroicon name: plus -->
              <svg
                class="w-5 h-5 mr-2 -ml-1"
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
              <span>New Member</span>
            </router-link>
          </div>
          <div v-if="user" class="flex-shrink-0">
            <button
              @click="handleLogout"
              type="button"
              class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-500 border border-transparent shadow-sm rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
          <div v-else class="flex-shrink-0">
            <router-link
              :to="{ name: 'Home' }"
              class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-500 border border-transparent shadow-sm rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
            >
              Login
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import useLogout from "@/composables/useLogout";
import getUser from "@/composables/getUser";

export default defineComponent({
  name: "Navbar",
  setup() {
    // Use composables
    const { error, logout } = useLogout();
    const { user } = getUser();

    const router = useRouter();

    // Handle the logout and
    async function handleLogout() {
      await logout();
      // redirect to '/' Home page
      if (!error.value) {
        console.log("SUCCESS:handleLogout");
        router.push({ name: "Home" });
      }
    }

    return { error, handleLogout, user };
  },
});
</script>

<style>
</style>

