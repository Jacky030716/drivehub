<script setup>
  import NotificationItem from '@/components/NotificationItem.vue';
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <ul class="flex space-x-4 text-sm">
        <li class="cursor-pointer text-blue-600 border-b-2 border-blue-600">
          All
        </li>
        <li class="cursor-pointer text-gray-500 hover:text-gray-800">Read</li>
      </ul>
    </div>

    <!-- This part use v-for de, maybe -->
    <div class="space-y-4">
      <NotificationItem title="Dr Abu has shared a file to SECJ3104-03 Discrete Structure" description="2m ago"
        fileName="Final_project_PDF" category="Course File" />
        <NotificationItem title="You have shared a file"
        description="8h ago" fileName="Balibaba_PDF" category="Project" />
      <NotificationItem title="Yu An has shared a file with you and 4 others to DSA Assignment" description="4h ago"
        fileName="My_idea_DOCS" category="Research" />
      <NotificationItem title="You have shared a file with Jacky, Bo Yuan and 2 others"
        description="8h ago" fileName="Balibaba_PDF" category="Project" />
      <NotificationItem title="Sabrina Yew has shared a file with you - Application Development Project Slide"
        description="14h ago" fileName="demo_file_PPT" category="Project" />
      <NotificationItem title="Dr Eliyah has shared a file to SECJ3088-01 PT1" description="20h ago"
        fileName="lab_exercise_DOCS" category="Assignment" />
    </div>
  </div>
</template>