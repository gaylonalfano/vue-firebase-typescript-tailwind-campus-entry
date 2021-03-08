import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouteLocationNormalized,
  NavigationGuardNext,
} from "vue-router";

import { auth } from "@/firebase/config";
import Home from "@/views/Home.vue";
import Entrance from "@/views/Entrance.vue";
import StudentForm from "@/views/forms/StudentForm.vue";
import EmployeeForm from "@/views/forms/EmployeeForm.vue";
import ConsultantForm from "@/views/forms/ConsultantForm.vue";
import VisitorForm from "@/views/forms/ConsultantForm.vue";
import QrCode from "@/views/forms/QrCode.vue";
// import AdminDashboard from "@/views/admin/AdminDashboard.vue";
// import Blank from "@/views/admin/Blank.vue";
// import SubmissionManagement from "@/views/admin/SubmissionManagement.vue";
// import UserManagement from "@/views/admin/UserManagement.vue";
// import FormManagement from "@/views/admin/FormManagement.vue";

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
    next({ name: "Entrance" });
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

// // === AMPLIFY Create a Route Guard for ADMIN Cognito User Group
// async function requireAdmin(
//   to: RouteLocationNormalized,
//   from: RouteLocationNormalized,
//   next: NavigationGuardNext
// ) {
//   // Grab current authenticated user's session accessToken info for groups
//   const currentUser = await Auth.currentUserInfo();
//   console.log("RouterGuard:requireAdmin:currentUser: ", currentUser);

//   // Unauthenticated
//   if (!currentUser) {
//     // Unauthenticated (user is null) so send back to Login page
//     next({ name: "Login" });
//   }

//   // Authenticated but not sure if Authorized for /admin
//   if (currentUser) {
//     const currentAuthUser = await Auth.currentAuthenticatedUser();
//     const userGroups =
//       currentAuthUser.signInUserSession.accessToken.payload["cognito:groups"];
//     // console.log("userGroups", userGroups);
//     // console.log(userGroups[0]);
//     // console.log(userGroups.includes("admin")); // true
//     if (userGroups && userGroups.includes("admin")) {
//       // Authenticated + Authorized (admin)
//       next();
//     } else {
//       // Authenticated only (not admin)
//       next({ name: "Home" });
//     }
//   }
// }

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: requireNoAuth,
    // meta: { layout: "empty" },
  },
  {
    path: "/entrance",
    name: "Entrance",
    component: Entrance,
    beforeEnter: requireAuth,
    // meta: { layout: "empty" },
  },
  {
    path: "/entrance/student",
    name: "Student",
    component: StudentForm,
    beforeEnter: requireAuth,
    // meta: { layout: "empty" },
  },
  {
    path: "/entrance/employee",
    name: "Employee",
    component: EmployeeForm,
    beforeEnter: requireAuth,
    // meta: { layout: "empty" },
  },
  {
    path: "/entrance/consultant",
    name: "Consultant",
    component: ConsultantForm,
    beforeEnter: requireAuth,
    // meta: { layout: "empty" },
  },
  {
    path: "/entrance/visitor",
    name: "Visitor",
    component: VisitorForm,
    beforeEnter: requireAuth,
    // meta: { layout: "empty" },
  },
  {
    path: "/entrance/qrcode",
    name: "QrCode",
    component: QrCode,
    beforeEnter: requireAuth,
    // meta: { layout: "empty" },
  },
  // {
  //   path: "/admin",
  //   name: "AdminDashboard",
  //   component: AdminDashboard,
  //   // beforeEnter: requireAdmin,
  // },
  // {
  //   path: "/admin/submission-management",
  //   name: "SubmissionManagement",
  //   component: SubmissionManagement,
  //   // beforeEnter: requireAdmin,
  // },
  // {
  //   path: "/admin/user-management",
  //   name: "UserManagement",
  //   component: UserManagement,
  //   // beforeEnter: requireAdmin,
  // },
  // {
  //   path: "/admin/form-management",
  //   name: "FormManagement",
  //   component: FormManagement,
  //   // beforeEnter: requireAdmin,
  // },
  // {
  //   path: "/admin/blank",
  //   name: "Blank",
  //   component: Blank,
  //   beforeEnter: requireNoAuth,
  // },
  //{
  //  path: "*",
  //  name: "404",
  //  component: FourZeroFour
  //}
];

// const routes: Array<RouteRecordRaw> = [
//   {
//     path: "/",
//     name: "Home",
//     component: Home,
//     beforeEnter: requireNoAuth,
//   },
//   {
//     path: "/dashboard",
//     name: "Dashboard",
//     component: Dashboard,
//     beforeEnter: requireAuth,
//   },
//   {
//     path: "/members/add",
//     name: "AddMember",
//     component: AddMember,
//     beforeEnter: requireAuth,
//   },
//   {
//     path: "/members/:id/accounts/:type/delete",
//     name: "DeleteAccount",
//     component: DeleteAccountModal,
//     beforeEnter: requireAuth,
//     props: true,
//   },
//   {
//     path: "/members/:id/accounts/:type/transactions/add",
//     name: "AddTransaction",
//     component: AddTransaction,
//     beforeEnter: requireAuth,
//     props: true,
//   },
//   {
//     path: "/members/:id/accounts/:type/transactions",
//     name: "MemberAccountsTransactionsDetails",
//     component: MemberAccountsTransactionsDetails,
//     beforeEnter: requireAuth,
//     props: true,
//   },
// ];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
