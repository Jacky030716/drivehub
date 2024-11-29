import { ref } from "vue";

export default function useEditHubForm(){
  let id = ref(undefined);
  let isOpen = ref(false);

  return {
    id,
    isOpen,
  }
}