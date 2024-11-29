<script setup>
import { ref, computed } from "vue";
import { useDeleteLink } from "@/features/links/api/use-delete-link";
import { CalendarDays, Link2, Mail, FileText, Trash2, Edit, Bookmark } from "lucide-vue-next";
import { RouterLink } from 'vue-router';


const links = ref([
  {
    id: 1,
    title: "Lupakan Lorem Ipsum, Tulis Konten Produkmu Sejak Awal",
    description: "Mari belajar menulis konten produk dengan pendekatan yang lebih personal, kreatif, dan relevan dengan audiens Anda. Memahami kebutuhan pelanggan adalah kunci utama dalam menciptakan konten yang bermakna dan membangun hubungan yang kuat dengan target pasar Anda. Proses ini melibatkan penelitian mendalam, ri belajar menulis konten produk dengan pendekatan yang lebih personal, kreatif, dan relevan dengan audiens Anda. Memahami kebutuhan pelanggan adalah kunci utama dalam menciptakan konten yang bermakna dan membangun hubungan yang kuat dengan target pasar Anda. Proses ini melibatkan penelitian mendalaempati, dan kreativitas dalam menyampaikan pesan.",
    category: "Writing Techniques",
    session: "Content Strategy Workshop",
    semester: "Fall 2024",
    hubName: "Creative Content Hub",
    url: "https://example.com",
    email: "creative@example.com",
    isBookmarked: true
  },
  {
    id: 2,
    title: "How a Password Changed My Life",
    description: "Mengubah password komputer bisa menjadi awal dari transformasi yang tidak pernah Anda duga sebelumnya. Seringkali, hal kecil dapat menjadi titik balik dalam perjalanan hidup seseorang. Dalam konteks digital, keamanan dan kesadaran akan pentingnya privasi dapat membuka pintu menuju pengembangan diri yang lebih mendalam.",
    category: "Personal Development",
    session: "Digital Wellness Seminar",
    semester: "Spring 2024",
    hubName: "Motivation Hub",
    url: "https://example2.com",
    email: "motivation@example.com",
    isBookmarked: true
  },
  {
    id: 3,
    title: "Sustainable Design in Modern Architecture",
    description: "Explore the innovative approaches to sustainable architecture that are reshaping our urban landscapes. From green building materials to energy-efficient designs, this comprehensive guide delves into the principles of eco-friendly construction and its impact on our environment and future.",
    category: "Architecture",
    session: "Sustainable Design Forum",
    semester: "Summer 2024",
    hubName: "Urban Innovation Center",
    url: "https://example3.com",
    email: "urban@example.com",
    isBookmarked: true
  },
  {
    id: 4,
    title: "The Psychology of Color in Marketing",
    description: "Uncover the profound influence of color psychology in marketing strategies. This in-depth exploration reveals how different colors evoke emotions, impact consumer behavior, and create powerful brand identities. Learn the art of using color to communicate your brand's message effectively.",
    category: "Marketing",
    session: "Brand Communication Workshop",
    semester: "Fall 2024",
    hubName: "Marketing Insights Lab",
    url: "https://example4.com",
    email: "marketing@example.com",
    isBookmarked: true
  },
  {
    id: 5,
    title: "AI and Ethical Innovation",
    description: "A critical examination of artificial intelligence's role in shaping ethical technological innovations. Dive deep into the challenges and opportunities presented by AI, exploring its potential to solve complex global problems while maintaining human-centric values and responsibilities.",
    category: "Technology Ethics",
    session: "AI Futures Conference",
    semester: "Spring 2024",
    hubName: "Tech Ethics Institute",
    url: "https://example5.com",
    email: "tech@example.com",
    isBookmarked: true
  },
  {
    id: 6,
    title: "Mindfulness in the Digital Age",
    description: "Navigate the challenges of maintaining mental health and presence in an increasingly connected world. This comprehensive guide offers practical strategies for incorporating mindfulness techniques into daily life, helping individuals find balance amidst technological overload and constant stimulation.",
    category: "Mental Wellness",
    session: "Digital Wellness Retreat",
    semester: "Summer 2024",
    hubName: "Wellness Center",
    url: "https://example6.com",
    email: "wellness@example.com",
    isBookmarked: true
  },
  {
    id: 7,
    title: "Global Climate Change Strategies",
    description: "A comprehensive analysis of international approaches to combating climate change. Explore innovative policies, technological solutions, and collaborative efforts that are shaping our global response to environmental challenges. Understand the complex interplay of science, policy, and social action.",
    category: "Environmental Science",
    session: "Climate Action Summit",
    semester: "Fall 2024",
    hubName: "Global Sustainability Center",
    url: "https://example7.com",
    email: "climate@example.com",
    isBookmarked: true
  },
  {
    id: 8,
    title: "The Future of Remote Work",
    description: "Examine the transformative impact of remote work on corporate culture, productivity, and employee well-being. This in-depth study explores emerging trends, technological enablers, and the psychological aspects of distributed workforce models in the post-pandemic era.",
    category: "Workplace Innovation",
    session: "Future of Work Conference",
    semester: "Spring 2024",
    hubName: "Work Transformation Institute",
    url: "https://example8.com",
    email: "work@example.com",
    isBookmarked: true
  },
  {
    id: 9,
    title: "Blockchain Beyond Cryptocurrency",
    description: "Discover the transformative potential of blockchain technology across various industries. From supply chain management to healthcare, explore how decentralized systems are revolutionizing traditional approaches to data security, transparency, and trust.",
    category: "Technology Innovation",
    session: "Blockchain Innovations Forum",
    semester: "Summer 2024",
    hubName: "Digital Innovation Network",
    url: "https://example9.com",
    email: "blockchain@example.com",
    isBookmarked: true
  },
  {
    id: 10,
    title: "Course Coordination: SECJ2013 Moderation Report",
    description: "Comprehensive moderation report for SECJ2013 course, detailing assessment feedback, course performance analysis, and recommendations for curriculum improvement. This document provides insights into student learning outcomes, assessment strategies, and potential areas of enhancement for future academic sessions.",
    category: "Course Coordination",
    session: "2022/2023",
    semester: "2",
    hubName: "Academic Review Department",
    url: "https://drive.google.com/drive/folders/MOD001",
    email: "admin@utm.edu.my",
    isBookmarked: true
  },
  {
    id: 10,
    title: "Course Coordination: SECJ2013 Moderation Report",
    description: "Comprehensive moderation report for SECJ2013 course, detailing assessment feedback, course performance analysis, and recommendations for curriculum improvement. This document provides insights into student learning outcomes, assessment strategies, and potential areas of enhancement for future academic sessions.",
    category: "Course Coordination",
    session: "2022/2023",
    semester: "2",
    hubName: "Academic Review Department",
    url: "https://drive.google.com/drive/folders/MOD001",
    email: "admin@utm.edu.my",
    isBookmarked: true
  },
  {
    id: 10,
    title: "Course Coordination: SECJ2013 Moderation Report",
    description: "Comprehensive moderation report for SECJ2013 course, detailing assessment feedback, course performance analysis, and recommendations for curriculum improvement. This document provides insights into student learning outcomes, assessment strategies, and potential areas of enhancement for future academic sessions.",
    category: "Course Coordination",
    session: "2022/2023",
    semester: "2",
    hubName: "Academic Review Department",
    url: "https://drive.google.com/drive/folders/MOD001",
    email: "admin@utm.edu.my",
    isBookmarked: true
  },
  {
    id: 10,
    title: "Course Coordination: SECJ2013 Moderation Report",
    description: "Comprehensive moderation report for SECJ2013 course, detailing assessment feedback, course performance analysis, and recommendations for curriculum improvement. This document provides insights into student learning outcomes, assessment strategies, and potential areas of enhancement for future academic sessions.",
    category: "Course Coordination",
    session: "2022/2023",
    semester: "2",
    hubName: "Academic Review Department",
    url: "https://drive.google.com/drive/folders/MOD001",
    email: "admin@utm.edu.my",
    isBookmarked: true
  },
  {
    id: 10,
    title: "Course Coordination: SECJ2013 Moderation Report",
    description: "Comprehensive moderation report for SECJ2013 course, detailing assessment feedback, course performance analysis, and recommendations for curriculum improvement. This document provides insights into student learning outcomes, assessment strategies, and potential areas of enhancement for future academic sessions.",
    category: "Course Coordination",
    session: "2022/2023",
    semester: "2",
    hubName: "Academic Review Department",
    url: "https://drive.google.com/drive/folders/MOD001",
    email: "admin@utm.edu.my",
    isBookmarked: true
  },
  {
    id: 10,
    title: "Course Coordination: SECJ2013 Moderation Report",
    description: "Comprehensive moderation report for SECJ2013 course, detailing assessment feedback, course performance analysis, and recommendations for curriculum improvement. This document provides insights into student learning outcomes, assessment strategies, and potential areas of enhancement for future academic sessions.",
    category: "Course Coordination",
    session: "2022/2023",
    semester: "2",
    hubName: "Academic Review Department",
    url: "https://drive.google.com/drive/folders/MOD001",
    email: "admin@utm.edu.my",
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

const truncateDescription = (description, limit = 80) => {
  return description.length > limit 
    ? description.slice(0, limit) + '...'
    : description;
};
</script>

<template>
  <div class="container px-auto p-4 max-h-[90vh] overflow-y-scroll">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="link in links" 
        :key="link.id"
        class="bg-white p-4 mb-2 rounded-lg shadow hover:shadow-md transition-all duration-200 relative"
        :class="{ 'z-10': hoveredLinkId === link.id }"
      >
        <!-- Bookmark Icon -->
        <div 
          class="absolute top-2 right-2 cursor-pointer group"
          @click="handleBookmarkToggle(link)"
        >
          <Bookmark 
            :class="[
              'w-5 h-5', 
              link.isBookmarked 
                ? 'text-red-800 fill-red-800 group-hover:text-gray-700 group-hover:fill-gray-500' 
                : 'text-gray-300 group-hover:text-gray-500'
            ]" 
          />
        </div>

        <!-- Link URL -->
        <a 
          :href="link.url" 
          target="_blank" 
          class="block mb-2 underline hover:text-blue-700 text-blue-500"
        >
          <div class="flex items-center">
            <Link2 class="text-blue-500 w-4 h-4 mr-2" />
            <span class="text-sm font-semibold">
              {{ link.url }}
            </span>
          </div>
        </a>

        <!-- Details -->
        <div 
          class="space-y-2" 
          @mouseenter="hoveredLinkId = link.id"
          @mouseleave="hoveredLinkId = null"
        >
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
            <span class="mr-2">Category:</span>
            <span>{{ link.category }}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="absolute bottom-2 right-2 flex space-x-2">
          <RouterLink 
            :to="`/share/edit/${link.id}`" 
            class="p-2 text-xs text-white bg-blue-500 rounded-full hover:bg-blue-600 flex items-center"
          >
            <Edit class="w-3 h-3" />
          </RouterLink>
          <button 
            class="p-2 text-xs text-white bg-red-500 rounded-full hover:bg-red-600 flex items-center" 
            @click="openConfirmBox(link.id)"
          >
            <Trash2 class="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="confirmDeleteId"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-xl w-96 text-center">
        <h2 class="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p class="text-gray-600 mb-6">Are you sure you want to delete this link?</p>
        <div class="flex justify-center space-x-4">
          <button
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            @click="closeConfirmBox"
          >
            Cancel
          </button>
          <button
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            @click="handleDelete(confirmDeleteId)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Unbookmark Confirmation Modal -->
    <div
      v-if="confirmUnbookmarkId"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-xl w-96 text-center">
        <h2 class="text-xl font-semibold mb-4">Remove Bookmark</h2>
        <p class="text-gray-600 mb-6">Are you sure you want to remove this bookmark?</p>
        <div class="flex justify-center space-x-4">
          <button
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            @click="confirmUnbookmarkId = null"
          >
            Cancel
          </button>
          <button
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            @click="confirmUnbookmark"
          >
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