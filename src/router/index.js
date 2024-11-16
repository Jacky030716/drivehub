import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import ProfileView from "@/views/ProfileView.vue";
import BookmarkView from "@/views/BookmarkView.vue";
import HubView from "@/views/HubView.vue";
import SharedResourcesView from "@/views/SharedResourcesView.vue";
import ShareView from "@/views/ShareView.vue";
import NotificationsView from "@/views/NotificationsView.vue";
import SignInView from "@/views/SignInView.vue";

export const routes = [
  {
    name: 'Dashboard',
    path: '/',
    component: HomeView
  },
  {
    name: 'Profile',
    path: '/profile',
    component: ProfileView
  },
  {
    name: 'Bookmark',
    path: '/bookmark',
    component: BookmarkView
  },
  {
    name: "Hub",
    path: "/hub",
    component: HubView,
  },
  {
    name: "Shared Resources",
    path: "/shared",
    component: SharedResourcesView,
  },
  {
    name: "Share",
    path: "/share",
    component: ShareView,
  },
  {
    name: "Notifications",
    path: "/notifications",
    component: NotificationsView,
  },
  {
    name: "Sign In",
    path: "/sign-in",
    component: SignInView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router