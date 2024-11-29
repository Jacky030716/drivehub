<script setup>
import { ref, computed } from "vue";
import { useDeleteLink } from "@/features/links/api/use-delete-link";
import { CalendarDays, Link2, Mail, FileText, Trash2, Edit, Bookmark, Folder } from "lucide-vue-next";
import { RouterLink } from 'vue-router';


const links = ref([
  {
    id: "1",
    title: "Course Materials for Advanced Algorithms",
    description: "Access comprehensive course materials including lecture notes, assignments, and past year exams for Advanced Algorithms.",
    category: "Course Files",
    session: "2024/2025",
    semester: 1,
    hubName: "Computer Science Department",
    url: "https://drive.google.com/drive/folders/CS101",
    email: "professorSmith@university.edu",
    isBookmarked: true
  },
  {
    id: 2,
    title: "Lecture Slides: Introduction to Data Structures",
    description: "Lecture slides for the Introduction to Data Structures course, including key concepts and examples.",
    category: "Course Files",
    session: "2023/2024",
    semester: 2,
    hubName: "Computer Science Department",
    url: "https://drive.google.com/drive/folders/DS102",
    email: "drJones@university.edu",
    isBookmarked: true
  },
  {
    id: 3,
    title: "Research Proposal Guidelines",
    description: "Guidelines for submitting research proposals, including template, structure, and submission tips.",
    category: "Research Resources",
    session: "2024/2025",
    semester: 1,
    hubName: "Research Office",
    url: "https://drive.google.com/drive/folders/PROPOSAL123",
    email: "researchCoordinator@university.edu",
    isBookmarked: true
  },
  {
    id: 4,
    title: "DSA Lecture Notes",
    description: "Lecture notes for Data Structures and Algorithms, with detailed explanations and examples.",
    category: "Course Files",
    session: "2023/2024",
    semester: 1,
    hubName: "Computer Science Department",
    url: "https://drive.google.com/drive/folders/DSA2023",
    email: "drLee@university.edu",
    isBookmarked: true
  },
  {
    id: 5,
    title: "Spring 2024 Seminar: Advanced AI Techniques",
    description: "Slides and recordings from the seminar on Advanced AI Techniques.",
    category: "Training",
    session: "2023/2024",
    semester: 2,
    hubName: "AI Research Center",
    url: "https://drive.google.com/drive/folders/AI2024",
    email: "aiExpert@university.edu",
    isBookmarked: true
  },
  {
    id: 6,
    title: "Postgrad Thesis Formatting Guide",
    description: "A comprehensive guide to formatting and structuring postgraduate theses.",
    category: "Research Resources",
    session: "2022/2023",
    semester: 1,
    hubName: "Graduate School",
    url: "https://drive.google.com/drive/folders/THESISGUIDE",
    email: "gradSchool@university.edu",
    isBookmarked: true
  },
  {
    id: 7,
    title: "Programming Language Principles",
    description: "Course materials for Programming Language Principles, including examples and exercises.",
    category: "Course Files",
    session: "2024/2025",
    semester: 2,
    hubName: "Computer Science Department",
    url: "https://drive.google.com/drive/folders/PLP2024",
    email: "professorWilliams@university.edu",
    isBookmarked: true
  },
  {
    id: 8,
    title: "Summer 2024 Workshop on Web Development",
    description: "Materials and resources from the Web Development workshop, including code snippets and project guidelines.",
    category: "Training",
    session: "2024/2025",
    semester: 1,
    hubName: "Web Tech Hub",
    url: "https://drive.google.com/drive/folders/WEBWORKSHOP",
    email: "webTrainer@university.edu",
    isBookmarked: true
  },
  {
    id: 9,
    title: "Research Ethics Handbook",
    description: "Handbook outlining the principles and practices for ethical research.",
    category: "Research Resources",
    session: "2023/2024",
    semester: 2,
    hubName: "Ethics Committee",
    url: "https://drive.google.com/drive/folders/RESEARCHETHICS",
    email: "ethicsChair@university.edu",
    isBookmarked: true
  },
  {
    id: 10,
    title: "Lecture Notes on Machine Learning",
    description: "Comprehensive notes for Machine Learning, covering algorithms and practical implementations.",
    category: "Course Files",
    session: "2022/2023",
    semester: 1,
    hubName: "AI & ML Department",
    url: "https://drive.google.com/drive/folders/ML2022",
    email: "mlProf@university.edu",
    isBookmarked: true
  },
  {
    id: 11,
    title: "Spring 2025 Seminar: Blockchain Applications",
    description: "Seminar material covering real-world applications of blockchain technology.",
    category: "Training",
    session: "2024/2025",
    semester: 2,
    hubName: "Blockchain Research Group",
    url: "https://drive.google.com/drive/folders/BLOCKCHAIN2025",
    email: "blockchainLead@university.edu",
    isBookmarked: true
  },
  {
    id: 12,
    title: "Weekly Team Meeting Minutes",
    description: "Minutes from the department's weekly team meetings, including action items and updates.",
    category: "Meeting",
    session: "2024/2025",
    semester: 1,
    hubName: "Dept. Admin Office",
    url: "https://drive.google.com/drive/folders/MEETING2024",
    email: "adminOffice@university.edu",
    isBookmarked: true
  },
  {
    id: 13,
    title: "Workshop: Data Visualization Techniques",
    description: "Workshop resources including slides and practice datasets for data visualization.",
    category: "Training",
    session: "2023/2024",
    semester: 1,
    hubName: "Data Science Hub",
    url: "https://drive.google.com/drive/folders/DATAVISUAL",
    email: "dataTrainer@university.edu",
    isBookmarked: true
  },
  {
    id: 14,
    title: "Semester Timetable for 2024/2025",
    description: "Full timetable for courses, including lecture and lab schedules for the semester.",
    category: "Timetable",
    session: "2024/2025",
    semester: 2,
    hubName: "University Scheduling Office",
    url: "https://bit.ly/Timetable2025",
    email: "schedule@university.edu",
    isBookmarked: true
  },
  {
    id: 15,
    title: "PhD Research Presentations Archive",
    description: "Archive of presentations given by PhD students, showcasing their research progress.",
    category: "Research Resources",
    session: "2021/2022",
    semester: 2,
    hubName: "PhD Research Committee",
    url: "https://drive.google.com/drive/folders/PHDPRESENTATIONS",
    email: "phdResearch@university.edu",
    isBookmarked: true
  }
]);


const confirmDeleteId = ref(null);
const hoveredLinkId = ref(null);
const confirmUnbookmarkId = ref(null);

const openConfirmBox = (id) => {
  confirmDeleteId.value = id;
};

const closeConfirmBox = () => {
  confirmDeleteId.value = null;
};

const handleDelete = (id) => {
  links.value = links.value.filter(link => link.id !== id);
  closeConfirmBox();
};

const handleBookmarkToggle = (link) => {
  if (link.isBookmarked) {
    confirmUnbookmarkId.value = link.id;
  }
};

const confirmUnbookmark = () => {
  links.value = links.value.filter(link => link.id !== confirmUnbookmarkId.value);
  confirmUnbookmarkId.value = null;
};

const truncateDescription = (description, limit = 130) => {
  return description.length > limit
    ? description.slice(0, limit) + '...'
    : description;
};
</script>

<template>
  <div class="w-full p-4 max-h-[90vh] overflow-y-scroll bg-gray-100">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="link in links" :key="link.id"
        class="bg-white p-4 mb-2 rounded-lg shadow hover:shadow-md transition-all duration-200 relative"
        :class="{ 'z-10': hoveredLinkId === link.id }">
        <!-- Bookmark Icon -->
        <div class="absolute top-2 right-2 cursor-pointer group" @click="handleBookmarkToggle(link)">
          <Bookmark :class="[
            'w-5 h-5',
            link.isBookmarked
              ? 'text-red-800 fill-red-800 group-hover:text-gray-500 group-hover:fill-gray-400'
              : 'text-gray-300 group-hover:text-gray-500'
          ]" />
        </div>

        <!-- Link URL -->
        <a :href="link.url" target="_blank" class="block mb-2 hover:underline text-blue-500">
          <div class="flex items-center">
            <Link2 class="text-blue-500 w-4 h-4 mr-2" />
            <span class="text-sm font-semibold">
              {{ link.url }}
            </span>
          </div>
        </a>

        <!-- Details -->
        <div class="space-y-2" @mouseenter="hoveredLinkId = link.id" @mouseleave="hoveredLinkId = null">
          <!-- Description -->
          <div class="flex items-start text-xs text-gray-600">
            <FileText class="w-3 h-3 mr-2 mt-1 flex-shrink-0" />
            <span class="flex-grow">
              {{ hoveredLinkId === link.id ? link.description : truncateDescription(link.description) }}
            </span>
          </div>

          <!-- Session and Semester -->
          <div class="flex items-center text-xs text-gray-600">
            <CalendarDays class="w-3 h-3 mr-2" />
            <span>{{ link.session }} - {{ link.semester }}</span>
          </div>

          <!-- Email -->
          <div class="flex items-center text-xs text-gray-600">
            <Mail class="w-3 h-3 mr-2" />
            <span>{{ link.email }}</span>
          </div>

          <!-- Additional Info -->
          <div class="flex items-center text-xs text-gray-600">
            <Folder class="w-3 h-3 mr-2" />
            <span>{{ link.category }}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="absolute bottom-2 right-2 flex space-x-2">
          <RouterLink :to="`/share/edit/${link.id}`"
            class="p-2 text-xs text-white bg-blue-500 rounded-full hover:bg-blue-600 flex items-center">
            <Edit class="w-3 h-3" />
          </RouterLink>
          <button class="p-2 text-xs text-white bg-red-500 rounded-full hover:bg-red-600 flex items-center"
            @click="openConfirmBox(link.id)">
            <Trash2 class="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="confirmDeleteId" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl w-96 text-center">
        <h2 class="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p class="text-gray-600 mb-6">Are you sure you want to delete this link?</p>
        <div class="flex justify-center space-x-4">
          <button class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300" @click="closeConfirmBox">
            Cancel
          </button>
          <button class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            @click="handleDelete(confirmDeleteId)">
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Unbookmark Confirmation Modal -->
    <div v-if="confirmUnbookmarkId" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl w-96 text-center">
        <h2 class="text-xl font-semibold mb-4">Confirm Unbookmark</h2>
        <p class="text-gray-600 mb-6">Are you sure you want to remove this bookmark?</p>
        <div class="flex justify-center space-x-4">
          <button class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            @click="confirmUnbookmarkId = null">
            Cancel
          </button>
          <button class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" @click="confirmUnbookmark">
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>