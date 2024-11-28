import { ref } from 'vue';

export const useHubForm = () => {
  const isOpen = ref(false);
  const selectedHub = ref(null);

  function open(hub = null) {
    selectedHub.value = hub;
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
    selectedHub.value = null;
  }

  return {
    isOpen,
    selectedHub,
    open,
    close,
  };
};
