import { ref } from 'vue';

// Create a shared state using a singleton pattern
const isOpen = ref(false);

export function useMobileNav() {
  const openNav = () => {
    isOpen.value = true;
  };

  const closeNav = () => {
    isOpen.value = false;
  };

  const toggleNav = () => {
    isOpen.value = !isOpen.value;
  };

  return {
    isOpen,
    openNav,
    closeNav,
    toggleNav,
  };
}