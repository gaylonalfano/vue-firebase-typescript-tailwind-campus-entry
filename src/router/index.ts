import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouteLocationNormalized,
  NavigationGuardNext,
} from "vue-router";

import { auth } from "@/firebase/config";
import Home from "@/views/Home.vue";
import Dashboard from "@/views/Dashboard.vue";
import AddMember from "@/views/AddMember.vue";
import AddTransaction from "@/views/AddTransaction.vue";
import DeleteAccountModal from "@/views/DeleteAccountModal.vue";
import MemberAccountsTransactionsDetails from "@/views/MemberAccountsTransactionsDetails.vue";

// Creating another Route Guard for Home page for logged-in users
// They should be redirected to Dashboard if logged in already
function requireNoAuth(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  // Grab current user if logged in
  let user = auth.currentUser;
  console.log("RouterGuard:requireNoAuth:user ", user);

  if (user) {
    // Redirect to Dashboard route
    next({ name: "Dashboard" });
  } else {
    // Let them through/continue to Home page
    next();
  }
}

// Create a Route Guard (Auth Guard) function
// NOTE Going to use FB auth to grab currentUser (if available)
// NOTE Need to register this Auth Guard to Dashboard
// NOTE We add to, from, next because it aligns with beforeEnter method
// Q: How to add vue-router types so I don't have to use ts-ignore?
// A: Import from vue-router. Note difference btw expression vs. declaration syntax
function requireAuth(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  // NOTE We don't use our getUser composable because we don't need to
  // listen to AuthState changes, etc.
  let user = auth.currentUser;
  // console.log(`RouterGuard:requireAuth:user: ${user}`); // [Object object]
  console.log("RouterGuard:requireAuth:user: ", user); // Works!

  if (!user) {
    // Unauthorized (user is null) so send back to Home page
    next({ name: "Home" });
  } else {
    // Need to invoke next() to move forward
    next();
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: requireNoAuth,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: requireAuth,
  },
  {
    path: "/members/add",
    name: "AddMember",
    component: AddMember,
    beforeEnter: requireAuth,
  },
  {
    path: "/members/:id/accounts/:type/delete",
    name: "DeleteAccount",
    component: DeleteAccountModal,
    beforeEnter: requireAuth,
    props: true,
  },
  {
    path: "/members/:id/accounts/:type/transactions/add",
    name: "AddTransaction",
    component: AddTransaction,
    beforeEnter: requireAuth,
    props: true,
  },
  {
    path: "/members/:id/accounts/:type/transactions",
    name: "MemberAccountsTransactionsDetails",
    component: MemberAccountsTransactionsDetails,
    beforeEnter: requireAuth,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
