<script setup>
import NotificationItem from '@/components/NotificationItem.vue';
import { Button } from '@/components/ui/button';
import { useBulkDeleteNotification } from '@/features/notifications/api/use-bulk-delete-notifications';
import { useBulkUpdateNotifications } from '@/features/notifications/api/use-bulk-update-notifications';
import { useGetNotifications } from '@/features/notifications/api/use-get-notifications';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const route = useRoute();
const router = useRouter();

const categories = ['All', 'Unread', 'Read'];
const currentCategory = ref(route.query.category || 'All');

const notificationsQuery = useGetNotifications();
const markAllMutation = useBulkUpdateNotifications();
const deleteAllMutation = useBulkDeleteNotification();

// Create a reactive reference for notifications based on query data
const notifications = computed(() => notificationsQuery.data?.value || []);

const isDisabled = computed(() => 
  notificationsQuery.isLoading.value || 
  markAllMutation.isPending.value || 
  deleteAllMutation.isPending.value
);

const handleFilter = (category) => {
  currentCategory.value = category;
  router.push({ query: { category } });
};

const isActiveFilter = (category) => {
  return currentCategory.value === category;
};

const markAllAsRead = async () => {
  await markAllMutation.mutateAsync();
};

const deleteAllNotifications = async () => {
  await deleteAllMutation.mutateAsync();
}

// Filter notifications based on current category
const filteredNotifications = computed(() => {
  if (currentCategory.value === 'All') {
    return notifications.value;
  } else if (currentCategory.value === 'Unread') {
    return notifications.value.filter((notification) => !notification.isRead);
  }
  return notifications.value.filter((notification) => notification.isRead);
});

// Watch for changes in the route query and update currentCategory
watch(() => route.query.category, (newCategory) => {
  currentCategory.value = newCategory || 'All';
}, { immediate: true });

onMounted(() => {
  if (!route.query.category) {
    router.push({ query: { category: 'All' } });
  }
});
</script>

<template>
  <div v-if="isDisabled" class="min-h-screen w-full flex justify-center items-center">
    <PulseLoader color="#882C4C" />
  </div>

  <div v-else-if="!notifications.length" class="sec-container h-full flex justify-center items-center">
    <div class="h-fit w-fit flex flex-col gap-2.5 justify-center items-center border-b-4 border-[1.5px] border-gray-200 p-8 rounded-md shadow-sm">
      <img 
        src="../assets/notification.png"
        width="50"
        height="50"
      />
      <p class="text-lg text-gray-500">There are no notifications available right now!</p>
    </div>
  </div>

  <div v-else class="bg-gray-50 h-full sec-container overflow-y-auto gap-2">
    <div class="flex justify-between items-center mb-6">
      <ul class="flex space-x-4 text-sm">
        <li 
          v-for="category in categories" 
          :key="category" 
          :class="['cursor-pointer', { 'text-blue-600 border-b-2 border-blue-600': isActiveFilter(category)}]"
        >
          <Button variant="ghost" @click="handleFilter(category)">
            {{ category }}
          </Button>
        </li>
      </ul>
      <div class="space-x-2">
        <Button 
          @click="markAllAsRead"
          :disabled="isDisabled"
        >
          Mark all as read
        </Button>
        <Button 
          @click="deleteAllNotifications"
          :disabled="isDisabled"
          variant="destructive"
        >
          Delete all
        </Button>
      </div>
    </div>

    <div class="space-y-4">
      <NotificationItem 
        v-for="notification in filteredNotifications"
        :key="notification.id"
        :notification="notification"
      />
    </div>
  </div>
</template>