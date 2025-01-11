<script setup>
import { defineProps } from 'vue';
import { Circle, EllipsisVertical, File, SquareCheck, Trash } from 'lucide-vue-next';
import { useUpdateNotification } from '@/features/notifications/api/use-update-notification';
import { formatDateDistance } from '@/lib/utils';
import { useRouter } from 'vue-router';
import { Button } from './ui/button';
import DropdownMenu from './ui/dropdown-menu/DropdownMenu.vue';
import DropdownMenuTrigger from './ui/dropdown-menu/DropdownMenuTrigger.vue';
import DropdownMenuContent from './ui/dropdown-menu/DropdownMenuContent.vue';
import DropdownMenuItem from './ui/dropdown-menu/DropdownMenuItem.vue';
import { useDeleteNotification } from '@/features/notifications/api/use-delete-notification';

const props = defineProps({
  notification: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const markAsReadMutation = useUpdateNotification(props.notification.id);
const deleteNotificationMutation = useDeleteNotification(props.notification.id);

const handleClick = async () => {
  if (props.notification.hubId) {
    await router.push(`/group/${props.notification.hubId}`)
  } else {
    await router.push(`/shared?ref_name=${props.notification.ref_name}`)
  }

  if (!props.notification.isRead) {
    await markAsReadMutation.mutateAsync({
      isRead: true,
    });
  }
}

const toggleRead = async () => {
  markAsReadMutation.mutateAsync({
    isRead: !props.notification.isRead,
  });
}

const handleDelete = () => {
  const confirm = window.confirm("Do you really want to delete this notification?");
  if (confirm) {
    deleteNotificationMutation.mutate();
  }
}

// Show dropdown actions
const showActions = (e) => {
  e.stopPropagation();
}

</script>

<template>
  <div
    :class="['relative flex justify-between items-center bg-white shadow-sm rounded-md p-4 hover:bg-gray-100 transition cursor-pointer', { 'border border-primary': !notification.isRead }]"
    @click="handleClick">
    <div>
      <!-- noti.message -->
      <p class="text-sm text-gray-800 font-semibold">{{ notification.message }}</p>

      <!-- noti.updatedAt -->
      <p class="text-xs text-gray-500 mt-1">{{ formatDateDistance(notification.updatedAt) }}</p>

      <div class="flex items-center text-xs text-blue-600 mt-2">
        <span class="mr-2">
          <File :size="14" />
        </span>
        <!-- link.ref_name -->
        <span class="font-medium">{{ notification.ref_name }}</span>

        <!-- link.category -->
        <span class="ml-2 text-gray-400"> - {{ notification.category }}</span>
      </div>
    </div>

    <!-- Action to delete notification -->
    <div class="flex flex-col justify-center items-center space-y-2">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button class="text-gray-400 hover:text-gray-600 focus:outline-none" @click="showActions" variant="ghost">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="mr-2">
          <DropdownMenuItem @click="toggleRead">
            <SquareCheck />
            <span>
              {{ notification.isRead ? 'Mark as Unread' : 'Mark as Read' }}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem @click="handleDelete" class="text-red-500 focus:text-red-500">
            <Trash />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
    <Circle :size="10" :class="['absolute fill-primary stroke-none right-2 top-2', { 'hidden': notification.isRead }]" />
  </div>
</template>