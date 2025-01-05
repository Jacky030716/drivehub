import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { course_files, internship, meeting, timetable, psm, training, research, coordinator, defaultImage } from "@/assets/category";
import { formatDistanceToNow } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function valueUpdater(updaterOrValue, ref) {
  ref.value = typeof updaterOrValue === 'function'
    ? updaterOrValue(ref.value)
    : updaterOrValue
}

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const getCategoryImage = (categoryName) => {
  if (!categoryName) {
    return '../assets/category/default.png';
  }  

  // Map images with category names
  const images = {
    "course files": course_files,
    "internship": internship,
    "meeting": meeting,
    "research": research,
    "timetable": timetable,
    "training/workshop": training,
    "psm 1": psm,
    "course coordination": coordinator
  };

  return images[categoryName.toLowerCase()] || defaultImage;
}

export const formatDateDistance = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}