import { ref, reactive } from 'vue';

export const useHubForm = () => {
  const state = reactive({
    id: undefined,
    isOpen: false,
  });

  function onOpen(id) {
    state.isOpen = true;
    state.id = id;
  }

  function onClose() {
    state.isOpen = false;
    state.id = undefined;
  }

  return {
    state,
    onOpen,
    onClose,
  };
};