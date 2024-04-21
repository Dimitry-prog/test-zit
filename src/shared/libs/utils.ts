export const formattedDate = (date: Date): string => {
  const newDate = new Date(date);
  const option: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  return newDate.toLocaleString('ru-Ru', option).split('.').reverse().join('-');
};