<template>
  <div class="container">
    <form @submit.prevent="login">
      <h2>Login</h2>
      <!-- <input type="text" v-model="email" placeholder="Email address..." /> -->
      <input type="text" v-model="username" placeholder="username..." />
      <input type="password" v-model="password" placeholder="password..." />
      <button class="w-10 bg-gray-200">Login</button>
    </form>
    <div class="flex space-x-2">
      <button @click="getCurrentUserInfo" class="w-20 bg-blue-200">
        Get user info
      </button>
      <button @click="getCurrentAuthenticatedUser" class="w-20 bg-blue-200">
        Get authenticated user
      </button>
      <button @click="logout" class="w-20 bg-blue-200">logout</button>
    </div>
  </div>
  <div>
    <div class="mb-10 text-7xl">{{ store.state.user }}</div>
    <div class="mb-10 text-3xl">User details go here</div>
    <div>
      <button @click="store.methods.capitalize" class="bg-gray-200">
        Capitalize
      </button>
      <button @click="store.methods.lowercase" class="ml-5 bg-gray-200">
        Lowercase
      </button>
    </div>
  </div>
  <div class="flex-col mx-auto mt-10 text-center">
    <div class="mb-10 text-7xl" :style="{ color: store.state.counterColor }">
      {{ store.state.counter }}
    </div>
    <div class="mb-10 text-3xl">
      {{ store.state.counter }} <sup>2</sup> =
      {{ store.getters.counterSquared() }}
    </div>
    <div>
      <button @click="store.methods.decreaseCounter" class="w-10 bg-gray-200">
        -
      </button>
      <button
        @click="store.methods.increaseCounter"
        class="w-10 ml-5 bg-gray-200"
      >
        +
      </button>
    </div>
    <div class="mt-4">
      <input
        v-model="counterColor"
        type="text"
        placeholder="Enter color code"
        class="border"
        :style="{ bordercolor: store.state.counterColor }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { Auth, Logger } from "aws-amplify";

export default defineComponent({
  name: "Store",
  setup() {
    // Add a logger for debugging
    const logger = new Logger("store");

    // Inject our store
    const store = inject("store") as Record<string, any>;

    // For Login user form
    const username = ref<string>("");
    const email = ref<string>("");
    const password = ref<string>("");
    const router = useRouter();

    // Q: How to change protected readonly(state) values?
    // A: To change our protected readonly(state), we create a
    // computed() property with get() and set() methods. We get()
    // initial state value, then use set() to take new counterColor value
    // from input and pass the value to a store.methods, which then updates
    // the state.counterColor with the updated value.
    const counterColor = computed({
      get() {
        // Get current state value
        return store.state.counterColor;
      },
      set(value) {
        // set() fires every time the bound input field value changes
        // and returns the latest value. We want to send this value
        // to a method inside our store
        console.log("value: ", value);
        store.methods.setCounterColor(value);
      }
    });

    // Let's login a user
    async function login() {
      try {
        const user = await Auth.signIn(username.value, password.value); // works! CognitoUser {}
        console.log("Successfully logged in");
        // See if I can set the state.user value
        store.methods.setUser(user); // works!
        // const userInfo = await Auth.currentUserInfo(); // null. Never seems to work...
        const authUser = await Auth.currentAuthenticatedUser();
        // const currentSession = await Auth.currentSession();
        // console.log("user: ", user); // works! CognitoUser {}
        // console.log("userInfo: ", userInfo); // null
        console.log("authUser: ", authUser); //
        // console.log("currentSession: ", currentSession); //
        console.log("store.state.user: ", store.state.user); // works! Proxy {username,pool}
        // Try rerouting to /entrance to see if state persists...
        // NOTE If I manually type in /entrance then it resets my state.user again
        router.push({ name: "Entrance" }); // WORKS! By using the router it didn't reset my state.user!
      } catch (error) {
        // Add my debug logger to help
        logger.debug(error);
        console.log(error.message);
      }
    }

    async function logout() {
      try {
        await Auth.signOut();
      } catch (error) {
        logger.debug(error);
      }
    }

    // Let's get our user from store.
    async function getCurrentUserInfo() {
      console.log("store.state.user: ", store.state.user); // works! Proxy { username, pool}
      console.log("store.getters.getUser(): ", store.getters.getUser()); // works! Proxy {username, pool}
      return store.getters.getUser();
    }

    async function getCurrentAuthenticatedUser() {
      console.log("store.state.user: ", store.state.user); // works! Proxy { username, pool}
      console.log("store.getters.getUser(): ", store.getters.getUser()); // works! Proxy {username, pool}
      try {
        const currentAuthenticatedUser = await Auth.currentAuthenticatedUser();
        console.log("currentAuthenticatedUser: ", currentAuthenticatedUser);
      } catch (err) {
        console.log(err);
        logger.debug(err);
      }
    }

    // Don't need local user anymore now we have store
    // const user = ref<string>("Gaylon");

    // Can move these methods into our store/index.ts
    // function capitalize() {
    //   console.log("capitalize triggered");
    //   user.value = user.value.toUpperCase();
    // }

    // function lowercase() {
    //   console.log("lowercase triggered");
    //   user.value = user.value.toLowerCase();
    // }

    return {
      store,
      counterColor,
      login,
      logout,
      username,
      email,
      password,
      getCurrentUserInfo,
      getCurrentAuthenticatedUser
    };
  }
});
</script>

<style></style>
