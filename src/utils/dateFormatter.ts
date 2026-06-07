export const dateFormatter = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};