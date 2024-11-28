export const colorPalette = [
  'text-blue-500',
  'text-purple-500',
  'text-green-500',
  'text-red-500',
  'text-yellow-500',
  'text-indigo-500',
  'text-pink-500',
  'text-teal-500',
  'text-orange-500',
  'text-cyan-500'
];

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const generateCategoryColorMap = (categories) => {
  const shuffledColors = shuffleArray([...colorPalette]);
  const categoryColorMap = new Map();

  categories.forEach((category, index) => {
    categoryColorMap.set(category.id, shuffledColors[index % shuffledColors.length]);
  });

  return categoryColorMap;
};
