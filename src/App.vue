<template>
  <!-- <Navbar /> -->
  <router-view />
</template>


<!-- IF YOU WANT TO ADD THE ADMIN DASHBOARD -->
<!-- <template> -->
<!--   <component :is="layout"> -->
<!--     <router-view /> -->
<!--   </component> -->
<!-- </template> -->

<!-- <script lang="ts"> -->
<!-- import { defineComponent, computed } from "vue"; -->
<!-- import { useRouter } from "vue-router"; -->

<!-- const defaultLayout = "default"; -->

<!-- export default defineComponent({ -->
<!--   name: "App", -->
<!--   setup() { -->
<!--     const { currentRoute } = useRouter(); -->

<!--     const layout = computed( -->
<!--       () => `${currentRoute.value.meta.layout || defaultLayout}-layout` -->
<!--     ); -->

<!--     return { layout }; -->
<!--   } -->
<!-- }); -->
<!-- </script> -->

