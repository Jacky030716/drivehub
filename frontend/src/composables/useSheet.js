import { inject } from 'vue'

export const useSheet = () => {
  return inject('sheet')
}