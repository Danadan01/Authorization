export const getAge = (dateString: string): number => {
  const today = new Date(),
    birthDay = new Date(dateString),
    month = today.getMonth() - birthDay.getMonth();
  let age = today.getFullYear() - birthDay.getFullYear();
  if (month < 0 || (month === 0 && today.getDate() < birthDay.getDate())) {
    age--;
  }
  return age;
};