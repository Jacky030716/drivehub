<script setup>
import { RouterLink } from "vue-router";
import { User, Folder, CalendarDays, FileText, Mail, Trash } from "lucide-vue-next";
import { useDeleteHub } from "@/features/hubs/api/use-delete-hub";
import EditHubForm from "@/features/hubs/components/EditHubForm.vue";
import Button from "./ui/button/Button.vue";

const props = defineProps({
  hub: {
    type: Object,
    required: true,
  },
  categoryColor: {
    type: String,
    default: "text-gray-500",
  },
});

const name = localStorage.getItem("name");

const deleteMutation = useDeleteHub(props.hub.id)

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this hub?')) {
    deleteMutation.mutate();
  }
};
</script>

<template>
  <RouterLink :to="`/group/${hub.id}`" class="block">
    <div class="h-full py-8 px-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer hover:bg-gray-300">
      <!-- Content -->
      <div>
        <div class="flex items-center mb-2">
          <Folder :class="[categoryColor, 'w-4 h-4 mr-2']" />
          <p class="text-sm font-semibold">{{ hub.name }}</p>
        </div>

        <div class="w-full flex xl:flex-row flex-col gap-6 justify-between">
          <div class="space-y-1">
            <div class="flex items-center text-xs text-gray-500">
              <User class="w-3 h-3 mr-1" />
              <span>{{ hub.username }}</span>
            </div>
            <div class="flex items-center text-xs text-gray-500">
              <CalendarDays class="w-3 h-3 mr-1" />
              <span>{{ hub.session }}-{{ hub.semester }}</span>
            </div>
            <div class="flex items-center text-xs text-gray-500">
              <FileText class="w-3 h-3 mr-1" />
              <span>{{ hub.description }}</span>
            </div>
            <div class="flex items-center text-xs text-gray-500">
              <Mail class="w-3 h-3 mr-1" />
              <span>{{ hub.email }}</span>
            </div>
          </div>

            <!-- Edit and Delete Buttons -->
            <div v-if="hub.username === name" class="flex items-end space-x-2">
              <EditHubForm 
                :hub="hub"
              />
              <Button
                size="sm"
                variant="destructive"
                @click.prevent="handleDelete"
                :disabled="deleteMutation.isLoading"
              >
                <Trash />
                {{ deleteMutation.isLoading ? "Deleting..." : "Delete Group" }}
              </Button>
            </div>
        </div>
      </div>

    </div>
  </RouterLink>
</template>

<style scoped>
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>