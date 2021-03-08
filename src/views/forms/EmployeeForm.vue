<template>
  <Navbar />
  <h1>EmployeeForm</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "@/components/Navbar.vue";

export default defineComponent({
  name: "EmployeeForm",
  components: { Navbar }
});
</script>

<style></style>
