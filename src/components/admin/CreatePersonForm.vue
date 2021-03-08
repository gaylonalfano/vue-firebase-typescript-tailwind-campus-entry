<template>
  <div class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
    <form action="#" method="POST">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-6 bg-white space-y-6 sm:p-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 leading-6">
              Personal Information
            </h3>
          </div>

          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label
                for="first_name"
                class="block text-sm font-medium text-gray-700"
                >First name</label
              >
              <input
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
                type="text"
                name="last_name"
                id="last_name"
                autocomplete="family-name"
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
                type="text"
                name="email_address"
                id="email_address"
                autocomplete="email"
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label
                for="last_name"
                class="block text-sm font-medium text-gray-700"
                >Phone number</label
              >
              <input
                type="text"
                name="last_name"
                id="last_name"
                autocomplete="family-name"
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label
                for="country"
                class="block text-sm font-medium text-gray-700"
                >Division</label
              >
              <select
                id="country"
                name="country"
                autocomplete="country"
                class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option disabled>Please select</option>
                <option>Early Childhood</option>
                <option>Elementrary School</option>
                <option>Middle School</option>
                <option>High School</option>
                <option>All School</option>
              </select>
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label
                for="country"
                class="block text-sm font-medium text-gray-700"
                >Submission type</label
              >
              <select
                id="country"
                name="country"
                autocomplete="country"
                class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option disabled>Please select</option>
                <option>Student</option>
                <option>Employee</option>
                <option>Consultant</option>
                <option>Visitor</option>
              </select>
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label
                for="email_address"
                class="block text-sm font-medium text-gray-700"
                >Father's email address</label
              >
              <input
                type="text"
                name="email_address"
                id="email_address"
                autocomplete="email"
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label
                for="last_name"
                class="block text-sm font-medium text-gray-700"
                >Father's phone number</label
              >
              <input
                type="text"
                name="last_name"
                id="last_name"
                autocomplete="family-name"
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label
                for="email_address"
                class="block text-sm font-medium text-gray-700"
                >Mother's email address</label
              >
              <input
                type="text"
                name="email_address"
                id="email_address"
                autocomplete="email"
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label
                for="last_name"
                class="block text-sm font-medium text-gray-700"
                >Mother's phone number</label
              >
              <input
                type="text"
                name="last_name"
                id="last_name"
                autocomplete="family-name"
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label
                for="country"
                class="block text-sm font-medium text-gray-700"
                >Family member type</label
              >
              <select
                id="country"
                name="country"
                autocomplete="country"
                class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option disabled>Please select</option>
                <option>Parent</option>
                <option>Child</option>
              </select>
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label
                for="country"
                class="block text-sm font-medium text-gray-700"
                >Consultant type</label
              >
              <select
                id="country"
                name="country"
                autocomplete="country"
                class="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option disabled>Please select</option>
                <option>Contractor</option>
                <option>School Bus Driver</option>
                <option>School Bus Monitor</option>
                <option>Substitute Teacher</option>
                <option>Consultant</option>
                <option>CCA Instructor</option>
              </select>
            </div>

            <!-- This example requires Tailwind CSS v2.0+ -->
            <div class="flex items-center justify-between">
              <span class="flex-grow flex flex-col" id="availability-label">
                <span class="text-sm font-medium text-gray-900"
                  >Available to hire</span
                >
                <span class="text-sm text-gray-500"
                  >Nulla amet tempus sit accumsan. Aliquet turpis sed sit
                  lacinia.</span
                >
              </span>
              <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
              <button
                type="button"
                class="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-pressed="false"
                aria-labelledby="availability-label"
              >
                <span class="sr-only">Use setting</span>
                <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                <span
                  aria-hidden="true"
                  class="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                ></span>
              </button>
            </div>

            <div class="col-span-6">
              <label
                for="street_address"
                class="block text-sm font-medium text-gray-700"
                >Street address</label
              >
              <input
                type="text"
                name="street_address"
                id="street_address"
                autocomplete="street-address"
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div class="col-span-6 sm:col-span-6 lg:col-span-2">
              <label for="city" class="block text-sm font-medium text-gray-700"
                >City</label
              >
              <input
                type="text"
                name="city"
                id="city"
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
              <label for="state" class="block text-sm font-medium text-gray-700"
                >State / Province</label
              >
              <input
                type="text"
                name="state"
                id="state"
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
              <label
                for="postal_code"
                class="block text-sm font-medium text-gray-700"
                >ZIP / Postal</label
              >
              <input
                type="text"
                name="postal_code"
                id="postal_code"
                autocomplete="postal-code"
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
          <button
            type="submit"
            class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CreatePersonForm"
});
</script>

<style></style>
