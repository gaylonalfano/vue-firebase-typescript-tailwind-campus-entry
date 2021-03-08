<template>
  <div>
    <h3 class="text-3xl font-semibold text-gray-700">User Management</h3>
    <div>
      <CreateUserModalForm />
    </div>

    <!-- List Users Table -->
    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
        >
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 leading-4"
                >
                  Name
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 leading-4"
                >
                  Title
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 leading-4"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 leading-4"
                >
                  Role
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
              </tr>
            </thead>

            <tbody class="bg-white">
              <tr v-for="(u, index) in users" :key="index">
                <td
                  class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                >
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                      <img
                        class="w-10 h-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>

                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900 leading-5">
                        {{ u.name }}
                      </div>
                      <div class="text-sm text-gray-500 leading-5">
                        {{ u.email }}
                      </div>
                    </div>
                  </div>
                </td>

                <td
                  class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                >
                  <div class="text-sm text-gray-900 leading-5">
                    {{ u.title }}
                  </div>
                  <div class="text-sm text-gray-500 leading-5">
                    {{ u.title2 }}
                  </div>
                </td>

                <td
                  class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                >
                  <span
                    class="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full leading-5"
                    >{{ u.status }}</span
                  >
                </td>

                <td
                  class="px-6 py-4 text-sm text-gray-500 border-b border-gray-200 whitespace-nowrap leading-5"
                >
                  {{ u.role }}
                </td>

                <td
                  class="px-6 py-4 text-sm font-medium text-right border-b border-gray-200 whitespace-nowrap leading-5"
                >
                  <a href="#" class="text-indigo-600 hover:text-indigo-900"
                    >Edit</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import CreateUserModalForm from "@/components/admin/CreateUserModalForm.vue";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "@/graphql/queries";
import * as mutations from "@/graphql/mutations";
import * as subscriptions from "@/graphql/subscriptions";

interface User {
  name: string;
  email: string;
  title: string;
  title2: string;
  status: string;
  role: string;
}

export default defineComponent({
  name: "UserManagement",
  components: { CreateUserModalForm },
  setup() {
    const testUser: User = {
      name: "John Doe",
      email: "john@example.com",
      title: "Software Engineer",
      title2: "Web dev",
      status: "Active",
      role: "Owner"
    };

    const users = ref<User[]>([...Array(10).keys()].map(() => testUser));

    // Q: How to get refs working with API Types?
    // const allFamilies = ref<null | GraphQLResult<object> | Observable<object>>(null)
    //const allFamilies = ref<GraphQLResult<object> | null>(null);
    // const allFamilies = ref<GraphQLResult<API.Family> | null>(null);
    async function queryListFamilies() {
      // const families = await API.graphql({ query: queries.listFamilys });
      // allFamilies.value = (await API.graphql({
      //   query: queries.listFamilys
      // })) as Promise<ListFamilysQuery>;
      // console.log(allFamilies.value);

      // Using the more verbose approach
      // const families = await API.graphql({ query: queries.listFamilys })

      // Use helper instead
      const families = await API.graphql(graphqlOperation(queries.listFamilys));
      // const families = (await API.graphql(graphqlOperation(queries.listFamilys)) as GraphQLResult<>);
      // allFamilies.value = families;
      console.log(families);
    }

    watchEffect(async () => {
      await queryListFamilies();
    });

    return {
      users,
      queryListFamilies
    };
  }
});
</script>

<style></style>
