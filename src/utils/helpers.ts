

export const isStringValidTime = (time: string): boolean => {
  const regex = /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/;
  return regex.test(time);
}
