<template>
  <Navbar />
  <div class="p-6 mx-auto md:flex md:justify-start">
    <BaseHealthFormLayout>
      <template v-slot:temperature>
        <div>
          <label
            for="temperature"
            class="block text-sm text-lg font-medium text-gray-700"
            >1. Student's temperature at home this morning
            <span class="text-red-500">*</span></label
          >
          <div class="w-1/2 mt-1">
            <input
              v-model="temperature"
              type="text"
              name="temperature"
              id="temperature"
              class="block w-full border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              placeholder=""
            />
          </div>
        </div>
      </template>

      <template v-slot:conditions>
        <fieldset>
          <div class="mb-2">
            <label
              for="conditions"
              class="block text-sm text-lg font-medium text-gray-700"
              >2. Are all of the following true?
              <span class="text-red-500">*</span></label
            >
            <ul>
              <li class="mt-1 text-sm text-gray-500">
                a) Student has not travelled out of Shanghai, and cohabitants
                have not travelled to or through medium or high-risk areas in
                the last 14 days
              </li>
              <li class="mt-1 text-sm text-gray-500">
                b) No family member (including student) in the same house has
                had contact with someone returning from a Medium/High Risk area
                within 14 days <span class="text-red-500">*</span>Find the
                current list of Medium/High Risk areas on the
                <a
                  href="https://www.concordiashanghai.org/posts/~board/mobile-app/post/current-mediumhigh-risk-areas-in-china"
                  class="font-medium text-blue-500"
                  >Concordia website COVID-19 page
                </a>
              </li>
              <li class="mt-1 text-sm text-gray-500">
                c) Student and cohabitants have not had contact with inbound
                international passengers
              </li>
              <li class="mt-1 text-sm text-gray-500">
                d) No student or cohabitant is diagnosed as a confirmed case of
                COVID-19, suspected case, or has had close contact in the last
                30 days
              </li>
              <li class="mt-1 text-sm text-gray-500">
                e) Student is healthy and has no COVID-19 related symptoms, such
                as fever, cough, vomiting, fatigue, chills, chest tightness,
                shortness of breath, diarrhea, runny nose, expectoration,
                conjunctival congestion etc.
              </li>
              <li class="mt-1 text-sm text-gray-500">
                f) Student and cohabitants have
                <span class="font-medium text-green-600">GREEN</span> Shanghai
                Health Code for today - Sui Shen Ma
              </li>
            </ul>
          </div>
          <div id="conditions-radiobutton" class="flex flex-row">
            <div class="flex mr-4">
              <input
                v-model="conditionsMet"
                id="conditions_met"
                name="conditions_met"
                value="true"
                type="radio"
                class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label
                for="conditions_met"
                class="block ml-3 text-sm font-medium text-gray-700"
              >
                Yes
              </label>
            </div>
            <div class="flex">
              <input
                v-model="conditionsMet"
                id="conditions_not_met"
                name="conditions_not_met"
                value="false"
                type="radio"
                class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label
                for="conditions_not_met"
                class="block ml-3 text-sm font-medium text-gray-700"
              >
                No
              </label>
            </div>
          </div>
        </fieldset>
      </template>

      <template v-slot:student>
        <div>
          <label
            for="student"
            class="block text-sm text-lg font-medium text-gray-700"
            >3. Please select your student
            <span class="text-red-500">*</span></label
          >
          <select
            v-model="student"
            id="student"
            name="student"
            class="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option selected disabled value="">Please select one</option>
            <option>Adrian Alfano</option>
            <option>12345 - Aaron Alfano</option>
            <option>FirstName LastName StudentNumber</option>
          </select>
          <span>Selected: {{ student }}</span>
        </div>
      </template>

      <template v-slot:parent_name>
        <div>
          <label
            for="parent_name"
            class="block text-sm text-lg font-medium text-gray-700"
            >4. Parent Name <span class="text-red-500">*</span></label
          >
          <div class="w-1/2 mt-1">
            <input
              v-model="parentName"
              type="text"
              name="parent_name"
              id="parent_name"
              class="block w-full border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              placeholder=""
            />
          </div>
        </div>
      </template>

      <template v-slot:parent_phone>
        <div>
          <label
            for="parent_phone"
            class="block text-sm text-lg font-medium text-gray-700"
            >5. Parent Phone Number <span class="text-red-500">*</span></label
          >
          <div class="w-1/2 mt-1">
            <input
              v-model="parentPhone"
              type="text"
              name="parent_phone"
              id="parent_phone"
              class="block w-full border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              placeholder=""
            />
          </div>
        </div>
      </template>

      <template v-slot:kindly_reminder>
        <div>
          <label
            for="kindly_reminder"
            class="block text-sm text-lg font-medium text-gray-700"
            >6. Kindly Reminder <span class="text-red-500">*</span></label
          >
          <p class="mt-1 text-sm text-gray-500">
            For the health of your child and other children, please have your
            child’s temperature checked every morning before going to school.
            Complete the form truthfully and submit online (including weekends).
            If your child has a phone, please send them the Concordia Health QR
            Code you will receive to your child. If your child does not have a
            phone, print a hard copy for your child to submit upon arrival at
            the school gate/getting on the school bus in the morning. If the
            morning temperature reading is higher than or equal to 37.3℃, or
            with symptoms such as fever, dry cough, diarrhea etc., please stay
            at home, go to hospital if necessary, and immediately inform the
            school.
            <br />
            <br />
            Please ensure your child wears a face mask on the way to and from
            school. Keep a proper social distance from others. Pay attention to
            traffic safety. Thank you for your cooperation.
            <br />
            <br />
            I hereby certify that all the above information is true and correct.
            I take all responsibility in the case of any false statements.
          </p>
          <!-- Add signature box -->
          <div class="mt-2">
            <label
              for="cover_photo"
              class="block text-sm font-medium text-gray-700"
            >
              Parent Signature
            </label>
            <div
              class="h-20 mt-1 border-2 border-gray-300 border-dashed rounded-md"
            ></div>
          </div>
        </div>
      </template>
    </BaseHealthFormLayout>
  </div>
  <!-- <h1>conditionsMet: {{ typeof conditionsMet }}</h1> -->
  <!-- <h1>conditionsMetComputed: {{ typeof conditionsMetComputed }}</h1> -->
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import Navbar from "@/components/Navbar.vue";
import BaseHealthFormLayout from "@/components/forms/BaseHealthFormLayout.vue";

export default defineComponent({
  name: "StudentForm",
  components: { Navbar, BaseHealthFormLayout },
  setup() {
    // Computed props for my form inputs
    const temperature = ref<string>("");
    // Q: How to capture fieldset radio button selections?
    // A: In Vue we you v-model="picked" for ALL button options and
    // it will be updated with corresponding value= value (eg value="true")
    // NOTE The model has 'meetsCriteria' and type BOOLEAN
    const conditionsMet = ref<string>("");
    // Q: How to return boolean from radio selection?
    // A: You can't. Have to compute it separately
    const conditionsMetComputed = computed(() => {
      return conditionsMet.value == "true" ? true : false;
    }); // {{ typeof conditionsMetComputed }} is BOOLEAN
    // NOTE for <select> elements we add <select v-model="student">
    const student = ref<string>("");
    const parentName = ref<string>("");
    const parentPhone = ref<string>(""); // In AWS this is string but E.164 format I believe

    return {
      temperature,
      conditionsMet,
      conditionsMetComputed,
      student,
      parentName,
      parentPhone
    };
  }
});
</script>

<style></style>
