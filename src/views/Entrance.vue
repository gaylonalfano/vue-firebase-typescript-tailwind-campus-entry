<template>
  <Navbar @language="translateText" />
  <!-- <div v-if="user">Hello, {{ user.email }}</div> -->
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-4 px-4 sm:px-6 lg:px-8"
  >
    <!-- This example requires Tailwind CSS v2.0+ -->
    <ul class="space-y-5">
      <router-link :to="{ name: 'Student' }">
        <li
          class="my-6 px-6 py-4 text-center text-blue-900 bg-blue-50 border border-blue-900 shadow overflow-hidden rounded-md"
        >
          {{ showChinese ? "学生入口" : "Student Entrance" }}
        </li>
      </router-link>
      <router-link :to="{ name: 'Employee' }">
        <li
          class="my-6 px-6 py-4 overflow-hidden text-center text-blue-900 border border-blue-900 shadow bg-blue-50 rounded-md"
        >
          {{ showChinese ? "员工/亲属入口" : "Employee/Dependent Entrance" }}
        </li>
      </router-link>
      <router-link :to="{ name: 'Consultant' }">
        <li
          class="my-6 px-6 py-4 overflow-hidden text-center text-blue-900 border border-blue-900 shadow bg-blue-50 rounded-md"
        >
          {{ showChinese ? "顾问入口" : "Consultant Entrance" }}
        </li>
      </router-link>
      <router-link :to="{ name: 'Visitor' }">
        <li
          class="my-6 px-6 py-4 overflow-hidden text-center text-blue-900 border border-blue-900 shadow bg-blue-50 rounded-md"
        >
          {{ showChinese ? "访客入口" : "Visitor Entrance" }}
        </li>
      </router-link>
      <router-link :to="{ name: 'QrCode' }">
        <li
          class="my-6 px-6 py-4 overflow-hidden text-center text-blue-900 border border-blue-900 shadow bg-blue-50 rounded-md"
        >
          {{ showChinese ? "重新获取二维码" : "Retrieve QR Code" }}
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import getUser from "@/composables/getUser";
import Navbar from "@/components/Navbar.vue";

export default defineComponent({
  name: "Home",
  components: { Navbar },
  setup() {
    // Let's confirm we have the right user
    const { user } = getUser();

    // Translate text based on language
    const showChinese = ref<boolean>(false);
    function translateText(payload: boolean) {
      if (payload) {
        showChinese.value = true;
      } else {
        showChinese.value = false;
      }
    }

    return { user, translateText, showChinese };
  },
});
</script>

<style></style>
