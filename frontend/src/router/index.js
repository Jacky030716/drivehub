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
    name: "Hubs",
    path: "/hub",
    component: HubsView,
    meta: { title: 'Hubs' },
  },
  {
    name: "Hub",
    path: "/hub/:hubId",
    component: HubView,
    meta: { title: 'Hub' },
  },
  {
    name: "Shared Resources",
    path: "/shared",
    component: SharedResourcesView,
    meta: { title: 'Shared Resources' },
  },
  {
    name: "Upload Link",
    path: "/share",
    component: ShareView,
    meta: { title: 'Upload Link' },
  },
  {
    name: "Upload Link",
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

export default router