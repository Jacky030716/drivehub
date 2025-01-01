<script setup>
import { useGetHubs } from '@/features/hubs/api/use-get-hubs';
import { useGetLinks } from '@/features/links/api/use-get-links';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  const matricNumber = localStorage.getItem('matric_number');
  const role = localStorage.getItem('role');

  const linksQuery = useGetLinks();
  const hubsQuery = useGetHubs();

  const links = computed(() => {
    return linksQuery?.data.value;
  });

  const hubs = computed(() => {
    return hubsQuery?.data.value;
  });

  const isDisabled = computed(() => {
    return linksQuery?.isLoading.value || hubsQuery?.isLoading.value;
  });
</script>

<template>
  <div v-if="isDisabled" class="min-h-screen w-full flex justify-center items-center">
    <PulseLoader color="#882c4c"/>
  </div>

  <section v-else class="sec-container">
    <div class="w-full h-full overflow-y-auto">
      <div class="relative md:row-span-2 col-span-2 row-span-1 w-full h-full flex flex-col justify-center items-center bg-white gap-8 shadow-sm rounded-xl p-6">
        <img v-if="role === 'Pelajar FC'" src="../assets/student.png" alt="Student Icon" class="w-40 h-auto object-cover border rounded-full"/>

        <img v-else src="../assets/lecturer.png" alt="Lecturer Icon" class="w-40 h-auto object-cover border rounded-full"/>

        <!-- User details table -->
        <div class="flex w-[450px] justify-between px-12">
          <table class="w-full">
            <tbody>
              <tr>
                <th class="text-left w-1/2 py-1.5">Name</th>
                <td>{{ name }}</td>
              </tr>
              <tr>
                <th class="text-left py-1.5">Matric Number</th>
                <td>{{ matricNumber }}</td>
              </tr>
              <tr>
                <th class="text-left py-1.5">Email</th>
                <td>{{ email }}</td>
              </tr>
              <tr>
                <th class="text-left py-1.5">Role</th>
                <td>{{ role }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>