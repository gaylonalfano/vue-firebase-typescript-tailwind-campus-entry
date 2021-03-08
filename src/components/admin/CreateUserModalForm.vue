<template>
  <div>
    <!-- <h3 class="text-3xl font-medium text-gray-700">Modal</h3> -->
    <button
      @click="open = true"
      class="px-6 py-3 mt-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
    >
      Create Student
    </button>
  </div>

  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    :class="
      `modal ${!open &&
        'opacity-0 pointer-events-none'} z-10 fixed inset-0 overflow-y-auto`
    "
  >
    <div
      class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
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
        class="inline-block overflow-hidden text-left align-bottom bg-white rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <form @submit.prevent="createStudent">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-6 bg-white space-y-6 sm:p-6">
              <!-- Title -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 leading-6">
                  Student Information
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  Enter the basic user information
                </p>
              </div>

              <!-- Body -->
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-700"
                    >First name</label
                  >
                  <input
                    v-model="firstName"
                    type="text"
                    name="first_name"
                    id="first_name"
                    autocomplete="given-name"
                    class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="last_name"
                    class="block text-sm font-medium text-gray-700"
                    >Last name</label
                  >
                  <input
                    v-model="lastName"
                    type="text"
                    name="last_name"
                    id="last_name"
                    autocomplete="last_name"
                    class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="email_address"
                    class="block text-sm font-medium text-gray-700"
                    >Email address</label
                  >
                  <input
                    v-model="email"
                    type="text"
                    name="email_address"
                    id="email_address"
                    autocomplete="email"
                    class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="phone_number"
                    class="block text-sm font-medium text-gray-700"
                    >Phone number</label
                  >
                  <input
                    v-model="phone"
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    autocomplete="phone_number"
                    class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="division"
                    class="block text-sm font-medium text-gray-700"
                    >Division</label
                  >
                  <select
                    v-model="division"
                    id="division"
                    name="divsion"
                    autocomplete="division"
                    class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option disabled selected>Please select</option>
                    <option>Early Childhood</option>
                    <option>Elementrary School</option>
                    <option>Middle School</option>
                    <option>High School</option>
                    <option>All School</option>
                  </select>
                </div>
              </div>
            </div>
            <!-- Footer -->
            <div class="flex justify-end px-4 py-3 bg-gray-50 sm:px-6">
              <button
                @click="open = false"
                class="px-4 py-2 mr-2 text-sm font-medium text-indigo-500 bg-transparent border-transparent rounded-md hover:bg-gray-100 hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
      <!-- <div v-if="error"> -->
      <!--   <h3 class="text-sm font-medium text-red-800">{{ error }}</h3> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "@/graphql/queries";
import * as mutations from "@/graphql/mutations";
import * as subscriptions from "@/graphql/subscriptions";
import { DataStore } from "@aws-amplify/datastore";
import {
  Person
  // Division,
  // ConsultantType,
  // FamilyMemberType,
  // SubmissionType
} from "@/models";

interface User {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default defineComponent({
  name: "CreateUserModalForm",
  setup() {
    const open = ref<boolean>(false);
    const error = ref<string | null>(null);

    // Default example for dashboard
    //const user = ref<User>({
    //  username: "",
    //  email: "",
    //  password: "",
    //  confirm: ""
    //});

    // const user = ref<User>({
    //   username: username.value,
    //   email: email.value,
    //   password: password.value,
    //   confirmPassword: confirmPassword.value
    // });

    // const register = () => {
    //   const data = JSON.parse(JSON.stringify(user.value));
    //   console.log("Registered: ", data);
    // };

    // ==== Create a student Person record
    const firstName = ref<string>("");
    const lastName = ref<string>("");
    const phone = ref<string>("");
    const email = ref<string>("");
    const division = ref<string>("");
    const submissionType = ref<string>("");
    const isAuthenticatedUser = ref<boolean>(false);
    const familyID = ref<string>("");
    //const familyMemberType = ref<string>("");
    const submissions: Record<string, any>[] = [];

    async function createStudent() {
      console.log("Clicked");
      // Q: How to add a Type to the ref?
      // const studentDetails = {
      //   firstName: firstName.value,
      //   lastName: lastName.value,
      //   phone: phone.value,
      //   email: email.value,
      //   division: division.value,
      //   submissionType: "STUDENT",
      //   isAuthenticatedUser: false,
      //   familyID: "testfamilyID",
      //   familyMemberType: "CHILD",
      //   submissions: submissions
      // };

      // console.log("studentDetails: ", studentDetails);
      // try {
      //   const response = await API.graphql(
      //     graphqlOperation(mutations.createPerson, {
      //       input: studentDetails
      //     })
      //   );
      //   console.log("createStudent:response: ", response);
      //   error.value = null;
      //   //return newStudent;
      // } catch (err) {
      //   console.log(err.message);
      //   error.value = err.message;
      //   console.log(error.value);
      // }

      await DataStore.save(
        new Person({
          firstName: "Lorem ipsum dolor sit amet",
          lastName: "Lorem ipsum dolor sit amet",
          phone: "Lorem ipsum dolor sit amet",
          email: "Lorem ipsum dolor sit amet",
          division: "EC", // Division.EC,
          fatherPhone: "Lorem ipsum dolor sit amet",
          motherPhone: "Lorem ipsum dolor sit amet",
          fatherEmail: "Lorem ipsum dolor sit amet",
          motherEmail: "Lorem ipsum dolor sit amet",
          createdAt: "Lorem ipsum dolor sit amet",
          updatedAt: "Lorem ipsum dolor sit amet",
          submissionType: "STUDENT", // SubmissionType.STUDENT,
          isAuthenticatedUser: true,
          familyMemberType: "CHILD", // FamilyMemberType.PARENT,
          familyID: "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d",
          consultantType: "", // ConsultantType.CONTRACTOR,
          governmentID: "Lorem ipsum dolor sit amet",
          submissions: []
        })
      );
    }

    return {
      open,
      firstName,
      lastName,
      phone,
      email,
      division,
      submissionType,
      isAuthenticatedUser,
      familyID,
      submissions,
      // studentDetails,
      createStudent
    };
  }
});
</script>

<style>
.modal {
  transition: opacity 0.25s ease;
}
</style>
