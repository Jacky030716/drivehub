import { ref, watch } from "vue";
import axios from "axios";

export const useFetchData = (url) => {
  const data = ref([]);
  const isLoading = ref(true);
  const error = ref(null);

  const fetchData = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get(url);
      data.value = response.data;
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  // Initial fetch
  fetchData();

  // Watch URL changes and refetch
  watch(() => url, (newUrl) => {
    if (newUrl) {
      fetchData();
    }
  });

  return { data, isLoading, error };
};