import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import ProfileView from "@/views/ProfileView.vue";
import BookmarkView from "@/views/BookmarkView.vue";
import HubsView from "@/views/HubsView.vue";
import HubView from "@/views/HubView.vue";
import SharedResourcesView from "@/views/SharedResourcesView.vue";
import ShareView from "@/views/ShareView.vue";
import EditShareView from "@/views/EditShareView.vue"
import NotificationsView from "@/views/NotificationsView.vue";
import SignInView from "@/views/SignInView.vue";
import NotFoundView from '@/views/NotFoundView.vue'
import AdminPanelView from "@/views/AdminPanelView.vue";
import axios from "axios";

export const routes = [
  {
    name: 'Dashboard',
    path: '/',
    component: HomeView,
    meta: { title: 'Dashboard' },
  },
  {
    name: 'Profile',
    path: '/profile',
    component: ProfileView,
    meta: { title: 'Profile' },
  },
  {
    name: 'Bookmark',
    path: '/bookmark',
    component: BookmarkView,
    meta: { title: 'Bookmark' },
  },
  {
    name: "Groups",
    path: "/group",
    component: HubsView,
    meta: { title: 'Groups' },
  },
  {
    name: "Group",
    path: "/group/:groupId",
    component: HubView,
    meta: { title: 'Group' },
  },
  {
    name: "Shared Links",
    path: "/shared",
    component: SharedResourcesView,
    meta: { title: 'Shared Links' },
  },
  {
    name: "Upload Link",
    path: "/share",
    component: ShareView,
    meta: { title: 'Upload Link' },
  },
  {
    name: "Edit Link",
    path: "/share/edit/:linkId",
    component: EditShareView,
    meta: { title: 'Edit Upload Link' },
  },
  {
    name: "Notifications",
    path: "/notifications",
    component: NotificationsView,
    meta: { title: 'Notifications' },
  },
  {
    name: "Sign In",
    path: "/sign-in",
    component: SignInView,
    meta: { title: 'Sign In' },
  },
  {
    name: "Admin Panel",
    path: "/admin",
    component: AdminPanelView,
    meta: { title: 'Admin Panel', requiresAdmin: true },
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found-view',
    component: NotFoundView,
    meta: { title: 'Not Found' },
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async(to, from, next) => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  if (!token && to.path !== '/sign-in') {
    next('/sign-in');
  } else if (to.meta.requiresAdmin) {
    try {
      const res = await axios.get(`/api/users/${email}`)
      const data = await res.data

      if (data.data.user.role.toLowerCase() !== 'admin') {
        next('/')
      } else {
        next();
      }
    } catch (error) {
      next('/')
    }
  } else {
    next();
  }
});

export default router