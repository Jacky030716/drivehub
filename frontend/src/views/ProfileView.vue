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

  const linksSharedByMe = computed(() => {
    return linksQuery?.data.value.data.filter((link) => link.email === email).length;
  });

  const linksSharedWithMe = computed(() => {
    return linksQuery?.data.value.data.filter((link) => link.email !== email).length;
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
    <div class="w-full h-full grid lg:grid-cols-5 gap-4 auto-rows-auto overflow-y-auto">
      <div class="relative md:row-span-3 col-span-2 row-span-1 w-full h-full flex flex-col justify-center items-center bg-white gap-8 shadow-sm rounded-xl p-6">
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

      <!-- Links details -->
      <div class="w-full h-full flex flex-col justify-center items-center gap-3.5 bg-white shadow-sm rounded-xl px-2 py-4 md:row-span-2">
        <img src="../assets/google-drive.png" alt="Share Icon" class="w-16 h-auto">
        <p class="w-[200px] text-center">You had shared <span class="font-bold text-primary">{{ linksSharedByMe }}</span> link(s) using DriveHub</p>
      </div>

      <div class="w-full h-full flex flex-col justify-center items-center gap-3.5 bg-white shadow-sm rounded-xl px-2 py-4 md:row-span-2">
        <img src="../assets/google-drive.png" alt="Share Icon" class="w-16 h-auto">
        <p class="w-[200px] text-center">You had received <span class="font-bold text-primary">{{ linksSharedWithMe }}</span> link(s) from DriveHub</p>
      </div>

      <!-- Hubs details -->
      <div class="w-full h-full flex flex-col justify-center items-center gap-3.5 bg-white shadow-sm rounded-xl px-2 py-4 md:row-span-2">
        <img src="../assets/folder.png" alt="Share Icon" class="w-16 h-auto">
        <p class="w-[200px] text-center">You had <span class="font-bold text-primary">{{ hubs.data.length }}</span> group(s) in DriveHub</p>
      </div>

      <div class="w-full h-full col-span-3 flex flex-col  gap-3.5 bg-white shadow-sm rounded-xl py-4 px-6">
        <h4 class="text-xl font-semibold">Quick Links</h4>
        <div class="flex gap-3 flex-1 w-full justify-between">
          <RouterLink to="/share" class="flex flex-col items-center justify-center text-center h-auto border rounded-xl shadow-md p-4 flex-1 gap-2.5 hover:bg-slate-100 ease-in-out">
            <img src="../assets/share.png" alt="Share icon" class="w-14"/>
            <h3 class="font-semibold">Share a link</h3>
          </RouterLink>
          <RouterLink to="/shared" class="flex flex-col items-center justify-center text-center h-auto border rounded-xl shadow-md p-4 flex-1 gap-2.5 hover:bg-slate-100 ease-in-out">
            <img src="../assets/link.png" alt="Share icon" class="w-14"/>
            <h3 class="font-semibold">Views all links</h3>
          </RouterLink>
          <RouterLink to="/group" class="flex flex-col items-center justify-center text-center h-auto border rounded-xl shadow-md p-4 flex-1 gap-2.5 hover:bg-slate-100 ease-in-out">
            <img src="../assets/hubs.png" alt="Share icon" class="w-14"/>
            <h3 class="font-semibold">View all groups</h3>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>