export const decamelize = (str) =>
  str.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
